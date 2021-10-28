import React, {Component} from "react";
import GameDataService from "../../api/services/GameDataService";
import moment from "moment";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerPrivateGameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            privateGames:
                {
                secretCode: this.props.match.params.id,
                id: '',
                title: '',
                details: '',
                beginDate: moment(new Date()).format('YYYY-MM-DD'),
                clubUsername: '',
                hasEnded: '',
                notPrivate: '',
                username: ''
            },
            players: [],
            playerDetails:
                {
                email: '',
                city: '',
                id: '',
                password: '',
                privateGameId: '',
                imageLink: '',
            }
        }

        this.refreshGame = this.refreshGame.bind(this)
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.refreshPlayerDetails = this.refreshPlayerDetails.bind(this)
        this.addPlayerClicked = this.addPlayerClicked.bind(this)
        this.infoPrivateGameClicked = this.infoPrivateGameClicked.bind(this)
    }

    componentDidMount() {
        this.refreshGame();
        this.refreshPlayers()
        this.refreshPlayerDetails()
    }

    componentDidUpdate(){
        this.refreshPlayers()
    }

    // componentWillUnmount() {
    //     this.refreshGame();
    //     this.refreshPlayers()
    //     this.refreshPlayerDetails()
    // }


    refreshGame() {
        GamePrivateDataService.retrievePrivateGameBySecretCode(this.state.privateGames.secretCode)
            .then(
                response => {
                    console.log("private game response: " + response)
                    this.setState(
                        {
                            privateGames: {
                                secretCode: response.data.secretCode,
                                id: response.data.id,
                                title: response.data.title,
                                details: response.data.details,
                                beginDate: response.data.beginDate,
                                clubUsername: response.data.clubUsername,
                                hasEnded: response.data.hasEnded,
                                notPrivate: response.data.notPrivate,
                                username: response.data.username
                            }
                        })
                }
            )
    }

    refreshPlayers() {
        PlayersDataService.retrievePlayersByGame(this.state.privateGames.id)
            .then(response => {
                console.log("retrieveAllPlayers: " + response)
                this.setState({
                    players: response.data
                })
            })
    }

    refreshPlayerDetails() {
        let username = AuthenticationServiceJwt.getLoggedInUserName()
        PlayersDataService.retrievePlayer(username)
            .then(response => {
                console.log("retrievePlayer: " + response.data)
                this.setState({
                    playerDetails: {
                        email: response.data.email,
                        city: response.data.city,
                        id: response.data.id,
                        password: response.data.password,
                        privateGameId: response.data.privateGameId,
                        imageLink: response.data.imageLink
                    }
                })
            })
    }

    infoPrivateGameClicked(id) {
        console.log("This is the id: " + id)
        this.props.history.push(`/privateGames/${id}/details`)
    }

    addPlayerClicked() {
        let username = AuthenticationServiceJwt.getLoggedInUserName()
        let player = {
            email: this.state.playerDetails.email,
            city: this.state.playerDetails.city,
            id: this.state.playerDetails.id,
            password: this.state.playerDetails.password,
            imageLink: this.state.playerDetails.imageLink
        }

        PlayersDataService.addPlayer(this.state.privateGames.id, username, player)
            .then(response => {
                console.log(response)
            })

        window.location.reload(true);
    }

    // handleDelete = (id) => {
    //     this.props.history.push(`/gameDeleteModal/${id}`)
    // }
    //
    // handlePrivateDelete = (id) => {
    //     this.props.history.push(`/gamePrivateDeleteModal/${id}`)
    // }

    render() {
        return (
            <div>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Club Name</th>
                        <th>Begin Date</th>
                        <th>Has Ended?</th>
                        <th>Is Public?</th>
                    </tr>
                    </thead>
                    <tbody>

                        <tr key={this.state.privateGames.id}>
                            <td>{this.state.privateGames.title}</td>
                            <td>
                                <button className="btn btn-success btn-primary"
                                        onClick={() => this.infoPrivateGameClicked(this.state.privateGames.id)}
                                >
                                    Details
                                </button>
                            </td>
                            <td>{this.state.privateGames.clubUsername}</td>
                            <td>{moment(this.state.privateGames.beginDate).format('YYYY-MM-DD')}</td>
                            <td>{this.state.privateGames.hasEnded.toString()}</td>
                            <td>{(this.state.privateGames.notPrivate) ? 'true': 'false'}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 className="card-header">
                    List Of Players for {this.state.privateGames.title}
                </h3>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Name of Player</th>
                        <th>City</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.players.map(
                        player =>
                    <tr key={player.id}>
                        <td>{player.username}</td>
                        <td>{player.city}</td>
                    </tr>
                    )}
                    </tbody>
                </table>

                <div className="row">

                    <button className="btn btn-success"
                            style={{width: "230px"}}
                            onClick={this.addPlayerClicked}
                    >
                        Join Game
                    </button>
                </div>
            </div>
        )
    }
}

export default PlayerPrivateGameList