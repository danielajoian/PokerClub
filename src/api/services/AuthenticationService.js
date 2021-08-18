class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        // sessionStorage.setItem('authenticatedUserPassword', password);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
        sessionStorage.removeItem('authenticatedClub')
        // sessionStorage.removeItem('authenticatedUserPassword')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        return user !== null;
    }

    registerClubSuccessfulLogin(clubname, password) {
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedClub', clubname);
        // sessionStorage.setItem('authenticatedUserPassword', password);
    }

    isClubLoggedIn() {
        let club = sessionStorage.getItem('authenticatedClub')
        return club !== null;
    }

    getLoggedInClubName() {
        let club = sessionStorage.getItem('authenticatedClub')
        if (club===null) return ''
        return club;
    }
}

export default new AuthenticationService()