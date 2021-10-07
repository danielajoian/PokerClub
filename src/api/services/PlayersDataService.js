import axios from "axios";
import {API_URL} from "../../Constants";

class PlayersDataService {

    retrievePlayer(username) {
        return axios.get(`${API_URL}/players/${username}`);
    }

    retrieveAllPlayers(privateGameId) {
        return axios.get(`${API_URL}/playersByGame/${privateGameId}`);
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

    addPlayer(privateGameId, username, player) {
        return axios.put(`${API_URL}/playersAddGame/${privateGameId}/${username}`, player)
    }
}

export default new PlayersDataService()

