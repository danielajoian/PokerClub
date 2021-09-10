import axios from "axios";
import {API_URL} from "../../Constants";

class PlayersDataService {
    // retrieveAllClubs() {
    //     return axios.get(`${API_URL}/clubs`)
    // }
    //
    retrievePlayer(username) {
        return axios.get(`${API_URL}/players/${username}`);
    }
    //
    // deleteGame(clubName, id) {
    //     return axios.delete(`${API_JPA_URL}/${clubName}/games/${id}`)
    // }
    //
    // updateGame(clubName, id, game) {
    //     return axios.put(`${API_JPA_URL}/${clubName}/games/${id}`, game);
    // }

    createPlayer(username) {
        return axios.post(`${API_URL}/players/${username}`);
    }
}

export default new PlayersDataService()

