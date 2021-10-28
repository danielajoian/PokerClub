import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";
import PlayersDataService from "../../api/services/PlayersDataService";

class GamePrivateDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.id,
            club: [],
            privateGame: [],
            players: []
        }

        this.refreshGames = this.refreshGames.bind(this)
        this.refreshClub = this.refreshClub.bind(this)
        this.refreshPlayers = this.refreshPlayers.bind(this)
    }

    componentDidMount() {
        this.refreshClub();
        this.refreshGames();
        this.refreshPlayers()
    }

    refreshClub() {
        ClubsDataService
            .retrieveClub(this.state.club.clubUsername)
            .then(response => {
                    this.setState({club: response.data})
                }
            )
    }

    refreshGames() {
        GamePrivateDataService
            .retrievePrivateGame(this.state.club.clubUsername, this.state.gameId)
            .then(
                response => {
                    console.log(response)
                    this.setState({privateGame : response.data})
                }
            )
    }

    refreshPlayers() {
        PlayersDataService.retrievePlayersByGame(this.state.gameId)
            .then(response => {
                console.log("retrieveAllPlayers: " + response)
                this.setState({
                    players: response.data
                })
            })
    }

    render() {
        return (
            <div>
                <h3 className="card-header">List Of Players for {this.state.privateGame.title} </h3>

                <table className="table">
                    <thead>
                    <tr>Total number of players that are registered for this game is {this.state.players.length}</tr>
                    <tr>
                        <th>ID of Player</th>
                        <th>City</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.players.map(
                        player =>
                            <tr key={player.id}>
                                <td>{player.id}</td>
                                <td>{player.city}</td>
                            </tr>
                    )}
                    </tbody>
                </table>
                <br/>
                <br/>
                <h4 className="card-header">{this.state.privateGame.title} Game details</h4>
                <p className="card-text">{this.state.privateGame.details}</p>
            </div>
        )
    }
}

export default GamePrivateDetails