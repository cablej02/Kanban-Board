import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    // If the user is not found, return an error
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    // If the password is not correct, return an error
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a JWT token
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // Return the token
    return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
