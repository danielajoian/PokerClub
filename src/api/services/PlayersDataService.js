import axios from "axios";
import {API_URL} from "../../Constants";

class PlayersDataService {
    // retrieveAllClubs() {
    //     return axios.get(`${API_URL}/clubs`)
    // }
    //
    retrievePlayer(username) {
        return axios.get(`${API_URL}/players/${username}`
            // ,
            // {
            //     headers: {
            //         "Authorization": `Bearer ` `$(sessionStorage.getItem("token"))`,
            //         'Access-Control-Allow-Origin': 'http://localhost:4000/'
            //     }
            // }
        );
    }

    deletePlayer(username, id) {
        return axios.delete(`${API_URL}/players/${username}/${id}`)
    }

    updatePlayer(username, id, player) {
        return axios.put(`${API_URL}/players/${username}/${id}`, player);
    }

    createPlayer(username, player) {
        return axios.post(`${API_URL}/players/${username}`, player);
    }
}

export default new PlayersDataService()

