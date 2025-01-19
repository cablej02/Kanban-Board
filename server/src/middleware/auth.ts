import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the auth header
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Get the token from the auth header
        const token = authHeader.split(' ')[1];

        // get the secret key from the environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' }); // Unauthorized if the token is invalid
            }

            // Add the user data to the request object
            req.user = user as JwtPayload;
            return next(); // Call the next middleware
        });
    }else{
        res.status(401).json({ message: 'Authorization header is required' });
    }
};
