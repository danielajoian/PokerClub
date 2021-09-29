import axios from "axios";
import {API_URL} from "../../Constants";

class AuthenticationServiceJwt {

    registerSuccessfulLoginForJwt(username, token) {
        if (!sessionStorage.getItem(null)) {
            this.logout();
        }

        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('token', token);
        this.setupUserAxiosInterceptors(this.createJWTToken(token))
    }

    registerClubSuccessfulLoginForJwt(clubUsername, token) {
        if (!sessionStorage.getItem(null)) {
            this.logout();
        }

        sessionStorage.setItem('authenticatedClub', clubUsername);
        sessionStorage.setItem('token', token);
        this.setupClubAxiosInterceptors(this.createJWTToken(token))
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
        sessionStorage.removeItem('authenticatedClub')
        sessionStorage.removeItem('token')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        return user !== null;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        let token = sessionStorage.getItem('token')
        if (user === null && token === null) return ''
        return user;
    }

    isClubLoggedIn() {
        let club = sessionStorage.getItem('authenticatedClub')
        return club !== null;
    }

    getLoggedInClubName() {
        let club = sessionStorage.getItem('authenticatedClub')
        let token = sessionStorage.getItem('token')
        if (club === null && token === null) return ''
        return club;
    }

    executeUserJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticatePlayer`, {
            username,
            password
        })
    }

    executeClubJwtAuthenticationService(clubUsername, password) {
        return axios.post(`${API_URL}/authenticateClub`, {
            clubUsername,
            password
        })
    }

    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    setupUserAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    setupClubAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isClubLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}

export default new AuthenticationServiceJwt()