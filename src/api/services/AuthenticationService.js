class AuthenticationService {
    registerSuccessfulLogin(username) {
        console.log('registerSuccessfulLogin')
        if (!sessionStorage.getItem(null)) {
            this.logout();
        }
        sessionStorage.setItem('authenticatedUser', username);
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

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null) return ''
        return user;
    }

    registerClubSuccessfulLogin(clubname) {
        console.log('registerSuccessfulLogin')
        if (!sessionStorage.getItem(null)) {
            this.logout();
        }
        sessionStorage.setItem('authenticatedClub', clubname);
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