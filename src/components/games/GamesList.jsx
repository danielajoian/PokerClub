import React, {Component} from "react";
import GameDataService from "../../api/services/GameDataService";
import AuthenticationService from "../../api/services/AuthenticationService";
import moment from "moment";

class GamesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games : [],
            message: null
        }
        this.deleteGameClicked = this.deleteGameClicked.bind(this);
        this.updateGameClicked = this.updateGameClicked.bind(this)
        this.refreshGames = this.refreshGames.bind(this)
        this.addGameClicked = this.addGameClicked.bind(this)
    }

    componentDidMount() {
       this.refreshGames();
    }

    refreshGames() {
        let clubname = AuthenticationService.getLoggedInClubName()
        GameDataService.retrieveAllGames(clubname)
            .then(
                response => {
                    console.log(response)
                    this.setState({games : response.data})
                }
            )
    }

    deleteGameClicked(id) {
        let club = AuthenticationService.getLoggedInClubName()
        console.log(id + " " + club);
        GameDataService.deleteGame(club, id)
            .then(response => {
                this.setState({message: `Delete of game ${id} successful`})
                this.refreshGames();
            })
    }

    updateGameClicked(id) {
        this.props.history.push(`/games/${id}`)
    }

    addGameClicked() {
        this.props.history.push(`/games/-1`)
    }

    render() {
        return (
            <div>
                <h3>List Of Games for {AuthenticationService.getLoggedInClubName()}  Poker Club</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Begin Date</th>
                                <th>Has Ended?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.games.map(
                                game =>
                                    <tr key={game.id}>
                                        <td>{game.description}</td>
                                        <td>{moment(game.beginDate).format('YYYY-MM-DD')}</td>
                                        <td>{game.hasEnded.toString()}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateGameClicked(game.id)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.deleteGameClicked(game.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                            )}
                        </tbody>
                    </table>
                <div className="row">
                    <button className="btn btn-success"
                            onClick={this.addGameClicked}
                    >
                        Add New Game
                    </button>
                </div>
            </div>
        )
    }
}

export default GamesList