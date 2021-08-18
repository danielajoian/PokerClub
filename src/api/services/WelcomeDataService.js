import axios from "axios";


class WelcomeDataService {
    executeHelloWorldService() {
        console.log('executed service')
        return axios.get(`http://localhost:8081/welcome`);
    }

    executeHelloBeanService() {
        console.log('executed bean service')
        return axios.get(`http://localhost:8081/welcome-bean`);
    }

    executeHelloWorldPathVariableService(username) {
        console.log('executed path variable')
        return axios.get(`http://localhost:8081/welcome/${username}`);
    }
}

export default new WelcomeDataService();