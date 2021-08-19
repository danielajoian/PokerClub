import axios from "axios";


class WelcomeDataService {
    executeHelloWorldService() {
        console.log('executed service')
        return axios.get(`http://localhost:8081/welcome`);
    }

    executeHelloBeanService() {
        console.log('executed bean service')
        // let username = 'Luna'
        // let password = '1234'
        //
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        return axios.get(`http://localhost:8081/welcome-bean`
        //     ,
        // {
        //     headers: {
        //         authorization: basicAuthHeader
        //     }
        //     }
            );
    }

    // executeHelloWorldPathVariableService(user) {
    //     console.log('executed path variable')
    //     let username = 'Dani'
    //     let password = '1234'
    //
    //     let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
    //
    //     return axios.get(`http://localhost:8081/welcome/${user}`,
    //         {
    //             headers: {
    //                 authorization: basicAuthHeader
    //             }
    //         });
    // }
}

export default new WelcomeDataService();