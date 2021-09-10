import axios from "axios";
import {API_JPA_URL} from "../../Constants";

class GameDataService {
    retrieveAllGames(clubName) {
        return axios.get(`${API_JPA_URL}/${clubName}/games`)
    }

    retrieveGame(clubName, id) {
        return axios.get(`${API_JPA_URL}/${clubName}/games/${id}`)
    }

    deleteGame(clubName, id) {
        return axios.delete(`${API_JPA_URL}/${clubName}/games/${id}`)
    }

    updateGame(clubName, id, game) {
        return axios.put(`${API_JPA_URL}/${clubName}/games/${id}`, game);
    }

    createGame(clubName, game) {
        return axios.post(`${API_JPA_URL}/${clubName}/games`, game);
    }
}

export default new GameDataService()