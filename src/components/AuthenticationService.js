class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        // sessionStorage.setItem('authenticatedUserPassword', password);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
        // sessionStorage.removeItem('authenticatedUserPassword')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        return user !== null;
    }
}

export default new AuthenticationService()