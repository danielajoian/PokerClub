import axios from "axios";
import {API_URL} from "../../Constants";


class AuthenticationServiceJwt {
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

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationServiceJwt()