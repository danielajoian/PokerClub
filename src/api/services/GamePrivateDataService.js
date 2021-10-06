import axios from "axios";
import {API_URL} from "../../Constants";

class GamePrivateDataService {
    retrieveAllPlayers(clubUsername, id) {
        return axios.get(`${API_URL}/${clubUsername}/privateGames/${id}/players`)
    }

    retrieveAllPrivateGames(clubUsername) {
        return axios.get(`${API_URL}/${clubUsername}/privateGames`)
    }

    retrievePrivateGame(clubUsername, id) {
        return axios.get(`${API_URL}/${clubUsername}/privateGames/${id}`)
    }

    retrievePrivateGameBySecretCode(secretCode) {
        return axios.get(`${API_URL}/private/${secretCode}`)
    }

    deletePrivateGame(clubUsername, id) {
        return axios.delete(`${API_URL}/${clubUsername}/privateGames/${id}`)
    }

    updatePrivateGame(clubUsername, id, game) {
        return axios.put(`${API_URL}/${clubUsername}/privateGames/${id}`, game);
    }

    createPrivateGame(clubUsername, game) {
        return axios.post(`${API_URL}/${clubUsername}/privateGames`, game);
    }
}

export default new GamePrivateDataService()