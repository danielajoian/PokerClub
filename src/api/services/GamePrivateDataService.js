import axios from "axios";
import {API_URL} from "../../Constants";

class GamePrivateDataService {

    retrieveAllPrivateGames(clubUsername) {
        return axios.get(`${API_URL}/${clubUsername}/getPrivateGames`)
    }

    retrievePrivateGame(clubUsername, id) {
        return axios.get(`${API_URL}/${clubUsername}/getPrivateGame/${id}`)
    }

    retrievePrivateGameBySecretCode(secretCode) {
        return axios.get(`${API_URL}/private/${secretCode}`)
    }

    deletePrivateGame(clubUsername, id) {
        return axios.delete(`${API_URL}/${clubUsername}/deletePrivateGame/${id}`)
    }

    updatePrivateGame(clubUsername, id, game) {
        return axios.put(`${API_URL}/${clubUsername}/changePrivateGame/${id}`, game);
    }

    createPrivateGame(clubUsername, game) {
        return axios.post(`${API_URL}/${clubUsername}/createPrivateGame`, game);
    }
}

export default new GamePrivateDataService()