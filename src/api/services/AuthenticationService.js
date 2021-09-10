import axios from "axios";

class AuthenticationService {
    registerSuccessfulLogin(username) {
        console.log('registerSuccessfulLogin')
        if (!sessionStorage.getItem(null)) {
            this.logout();
        }
        sessionStorage.setItem('authenticatedUser', username);
        // this.setupAxiosInterceptors()
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
        // this.setupAxiosInterceptors()
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

    setupAxiosInterceptors() {
        let username = 'Luna'
        let password = '1234'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        axios.interceptors.request.use(
    (config) => {
                if (this.isUserLoggedIn() || this.isClubLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()