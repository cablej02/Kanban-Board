import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // function is not used?
//   getProfile() {
//     // return the decoded token if it exists
//     const token = this.getToken();
//     if(token){
//       return jwtDecode<JwtPayload>(token);
//     }
//     return null;
//   }

  // return a bool that indicates if the user is logged in
  loggedIn() {
    // get the token
    const token = this.getToken();

    if(token){
      // check if the token is expired
      return !this.isTokenExpired(token);
    }else{
        return false;
    }
  }
  
  // return a bool that indicates if the token is expired
  isTokenExpired(token: string) {
    // decode the token
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) {
        // if there is no expiration date, return false
        console.log('Token has no expiration date');
        return false;
    }

    // get the expiration date
    const expirationDate = new Date(decodedToken.exp * 1000);
    // get the current date
    const now = new Date();
    // return if the token is expired
    return expirationDate < now;
  }

  getToken(): string {
    // return the token from local storage
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // redirect to the home page
    window.location.assign('/');
  }

  logout(navigate: (path:string) => void) {
    // remove the token from localStorage
    localStorage.removeItem('id_token');
    // redirect to the login page
    navigate('/login');
  }
}

export default new AuthService();
