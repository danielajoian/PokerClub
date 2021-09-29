import axios from "axios";
import {API_URL} from "../../Constants";


class WelcomeDataService {
    executeHelloWorldService() {
        console.log('executed service')
        return axios.get(`${API_URL}/welcome`);
    }

    executeHelloBeanService() {
        console.log('executed bean service')
        // let username = 'Luna'
        // let password = '1234'
        //
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        return axios.get(`${API_URL}/welcome-bean`
        //     ,
        // {
        //     headers: {
        //         "Authorization": `Bearer $(sessionStorage.getItem("token"))`,
        //         'Access-Control-Allow-Origin': 'http://localhost:4000'
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