import axios from "axios";
import {API_URL} from "../../Constants";

class ClubsDataService {
    retrieveAllClubs() {
        return axios.get(`${API_URL}/clubs`)
    }

    retrieveClub(clubUsername) {
        return axios.get(`${API_URL}/clubs/${clubUsername}`)
    }

    deleteClub(clubUsername, id) {
        return axios.delete(`${API_URL}/${clubUsername}/${id}`)
    }

    updateClub(clubUsername, id, club) {
        return axios.put(`${API_URL}/${clubUsername}/${id}`, club);
    }

    createClub(clubUsername, club) {
        return axios.post(`${API_URL}/${clubUsername}`, club);
    }
}

export default new ClubsDataService()