import React, {Component} from "react";
import GameDataService from "../../api/services/GameDataService";
import moment from "moment";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

class GamesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            club: this.props.match.params.name,
            games : [],
            message: null
        }

        this.updateGameClicked = this.updateGameClicked.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.refreshGames = this.refreshGames.bind(this)
        this.addGameClicked = this.addGameClicked.bind(this)
    }

    componentDidMount() {
       this.refreshGames();
    }

    refreshGames() {
        let clubname = AuthenticationServiceJwt.getLoggedInClubName()
        GameDataService.retrieveAllGames(clubname)
            .then(
                response => {
                    console.log(response)
                    this.setState({games : response.data})
                }
            )
    }

    // deleteGameClicked(id) {
    //     let club = AuthenticationServiceJwt.getLoggedInClubName()
    //     console.log(id + " " + club);
    //     if(window.confirm('Are you sure you want to delete this game?')) {
    //         GameDataService.deleteGame(club, id)
    //             .then(response => {
    //                 this.setState({message: `Delete of game ${id} successful`})
    //             })
    //     }
    // }

    updateGameClicked(id) {
        this.props.history.push(`/games/${id}`)
    }

    addGameClicked() {
        this.props.history.push(`/games/-1`)
    }

    infoGameClicked(id) {
        console.log("This is the id: " + id)
        this.props.history.push(`/games/${id}/details`)
    }

    handleDelete = (id) => {
        this.props.history.push(`/gameDeleteModal/${id}`)
    }

    render() {
        return (
            <div>
                <h3>List Of Games for {AuthenticationServiceJwt.getLoggedInClubName()}  Poker Club</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                &nbsp;
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Details</th>
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
                                        <td>{game.title}</td>
                                        <td>
                                            <button className="btn btn-success btn-primary"
                                                    onClick={() => this.infoGameClicked(game.id)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                        <td>{moment(game.beginDate).format('YYYY-MM-DD')}</td>
                                        <td>{game.hasEnded.toString()}</td>
                                        <td>
                                            <button className="btn btn-success btn-primary update"
                                                    onClick={() => this.updateGameClicked(game.id)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning btn-primary delete"
                                                    onClick={() => this.handleDelete(game.id)}
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
                            style={{width: "200px"}}
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