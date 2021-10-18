import axios from "axios";
import {API_URL} from "../../Constants";

class ClubsDataService {
    retrieveAllClubs() {
        return axios.get(`${API_URL}/clubs`)
    }

    retrieveClub(clubUsername) {
        return axios.get(`${API_URL}/clubs/${clubUsername}`)
    }

    retrieveClubByCity(city) {
        return axios.get(`${API_URL}/allClubs/${city}`)
    }

    deleteClub(clubUsername, id, imageLink) {
        return axios.delete(`${API_URL}/clubs/${clubUsername}/${id}/${imageLink}`)
    }

    updateClub(clubUsername, id, club) {
        return axios.put(`${API_URL}/clubs/${clubUsername}/${id}`, club);
    }

    createClub(clubUsername, club) {
        return axios.post(`${API_URL}/clubs/${clubUsername}`, club);
    }

    addClubImage(id, file) {
        return axios.post(`${API_URL}/${id}/clubImage/upload`, file, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    retrieveClubImage(id, imgName) {
        return axios.get(`${API_URL}/${id}/clubImage/download/${imgName}`)
    }
}

export default new ClubsDataService()