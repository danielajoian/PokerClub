import axios from "axios";
import {API_JPA_URL} from "../../Constants";

class GameDataService {
    retrieveAllGames(clubUsername) {
        return axios.get(`${API_JPA_URL}/${clubUsername}/games`)
    }

    retrieveGame(clubUsername, id) {
        return axios.get(`${API_JPA_URL}/${clubUsername}/games/${id}`)
    }

    deleteGame(clubUsername, id) {
        return axios.delete(`${API_JPA_URL}/${clubUsername}/games/${id}`)
    }

    updateGame(clubUsername, id, game) {
        return axios.put(`${API_JPA_URL}/${clubUsername}/games/${id}`, game);
    }

    createGame(clubUsername, game) {
        return axios.post(`${API_JPA_URL}/${clubUsername}/games`, game);
    }
}

export default new GameDataService()