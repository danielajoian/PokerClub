import React, {Component} from "react";
import GameDataService from "../../api/services/GameDataService";
import moment from "moment";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";

class GamesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            club: this.props.match.params.name,
            games : [],
            privateGames : [],
            message: null
        }

        this.updateGameClicked = this.updateGameClicked.bind(this)
        this.updatePrivateGameClicked = this.updatePrivateGameClicked.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handlePrivateDelete = this.handlePrivateDelete.bind(this)
        this.refreshGames = this.refreshGames.bind(this)
        this.addGameClicked = this.addGameClicked.bind(this)
        this.addPrivateGameClicked = this.addPrivateGameClicked.bind(this)
        this.infoGameClicked = this.infoGameClicked.bind(this)
        this.infoPrivateGameClicked = this.infoPrivateGameClicked.bind(this)
    }

    componentDidMount() {
       this.refreshGames();
    }

    componentDidUpdate(){
        this.refreshGames()
    }

    refreshGames() {
        let clubname = AuthenticationServiceJwt.getLoggedInClubName()
        GameDataService.retrieveAllGames(clubname)
            .then(
                response => {
                    console.log(response)
                    this.setState({games: response.data})
                }
            )

        GamePrivateDataService.retrieveAllPrivateGames(clubname)
            .then(
                response => {
                    console.log(response)
                    this.setState({privateGames: response.data})
                }
            )
    }

    updateGameClicked(id) {
        this.props.history.push(`/games/${id}`)
    }

    updatePrivateGameClicked(id) {
        this.props.history.push(`/privateGames/${id}`)
    }

    addGameClicked() {
        this.props.history.push(`/games/-1`)
    }

    addPrivateGameClicked() {
        this.props.history.push(`/privateGames/-1`)
    }

    infoGameClicked(id) {
        console.log("This is the id: " + id)
        this.props.history.push(`/games/${id}/details`)
    }

    infoPrivateGameClicked(id) {
        console.log("This is the id: " + id)
        this.props.history.push(`/privateGames/${id}/details`)
    }

    handleDelete = (id) => {
        this.props.history.push(`/gameDeleteModal/${id}`)
    }

    handlePrivateDelete = (id) => {
        this.props.history.push(`/gamePrivateDeleteModal/${id}`)
    }

    render() {
        return (
            <div>
                <h3 className="card-header">List Of Games for {AuthenticationServiceJwt.getLoggedInClubName()}  Poker Club</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                &nbsp;
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Begin Date</th>
                                <th>Has Ended?</th>
                                <th>Is Public?</th>
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
                                        <td>{!(game.notPublic) ? 'true': 'false'}</td>
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

                            {this.state.privateGames.map(
                                privateGame =>
                                    <tr key={privateGame.id}>
                                        <td>{privateGame.title}</td>
                                        <td>
                                            <button className="btn btn-success btn-primary"
                                                    onClick={() => this.infoPrivateGameClicked(privateGame.id)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                        <td>{moment(privateGame.beginDate).format('YYYY-MM-DD')}</td>
                                        <td>{privateGame.hasEnded.toString()}</td>
                                        <td>{(privateGame.notPrivate) ? 'true': 'false'}</td>
                                        <td>
                                            <button className="btn btn-success btn-primary update"
                                                    onClick={() => this.updatePrivateGameClicked(privateGame.id)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning btn-primary delete"
                                                    onClick={() => this.handlePrivateDelete(privateGame.id)}
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
                            style={{width: "230px"}}
                            onClick={this.addGameClicked}
                    >
                        Add Public Game
                    </button>

                    <button className="btn btn-success"
                            style={{width: "230px"}}
                            onClick={this.addPrivateGameClicked}
                    >
                        Add Private Game
                    </button>
                </div>
            </div>
        )
    }
}

export default GamesList