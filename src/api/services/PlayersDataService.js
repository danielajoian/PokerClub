import axios from "axios";
import {API_URL} from "../../Constants";

class PlayersDataService {

    retrievePlayer(username) {
        return axios.get(`${API_URL}/players/${username}`);
    }

    deletePlayer(username, id) {
        return axios.delete(`${API_URL}/${username}/${id}`)
    }

    updatePlayer(username, id, player) {
        return axios.put(`${API_URL}/${username}/${id}`, player);
    }

    createPlayer(username, player) {
        return axios.post(`${API_URL}/players/${username}`, player);
    }
}

export default new PlayersDataService()

