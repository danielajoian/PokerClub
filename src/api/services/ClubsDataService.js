import axios from "axios";
import {API_JPA_URL, API_URL} from "../../Constants";

class ClubsDataService {
    retrieveAllClubs() {
        return axios.get(`${API_URL}/clubs`)
    }

    retrieveClub(clubUsername) {
        return axios.get(`${API_URL}/clubs/${clubUsername}`)
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

export default new ClubsDataService()