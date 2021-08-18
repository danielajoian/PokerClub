import axios from "axios";

class GameDataService {
    retrieveAllGames(clubName) {
        return axios.get(`http://localhost:8081/${clubName}/games`)
    }

    retrieveGame(clubName, id) {
        return axios.get(`http://localhost:8081/${clubName}/games/${id}`)
    }

    deleteGame(clubName, id) {
        return axios.delete(`http://localhost:8081/${clubName}/games/${id}`)
    }

    updateGame(clubName, id, game) {
        return axios.put(`http://localhost:8081/${clubName}/games/${id}`, game);
    }

    createGame(clubName, game) {
        return axios.post(`http://localhost:8081/${clubName}/games`, game);
    }
}

export default new GameDataService()