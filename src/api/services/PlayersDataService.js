import axios from "axios";
import {API_URL} from "../../Constants";

class PlayersDataService {

    retrievePlayer(username) {
        return axios.get(`${API_URL}/players/${username}`);
    }

    retrieveAllPlayers() {
        return axios.get(`${API_URL}/getAllPlayers`);
    }

    retrievePlayersByGame(privateGameId) {
        return axios.get(`${API_URL}/playersByGame/${privateGameId}`);
    }

    deletePlayer(username, id, imageLink) {
        return axios.delete(`${API_URL}/players/${username}/${id}/${imageLink}`)
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

    changePassword(username, player) {
        return axios.put(`${API_URL}/player/${username}/changePassword`, player)
    }

    addPlayerImage(id, file) {
        return axios.post(`${API_URL}/${id}/playerImage/upload`, file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    retrievePlayerImage(id, imgName) {
        return axios.get(`${API_URL}/${id}/playerImage/download/${imgName}`)
    }
}

export default new PlayersDataService()

