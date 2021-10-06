import React, {Component} from "react";
import GameDataService from "../../api/services/GameDataService";
import moment from "moment";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";

class PlayerPrivateGameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secretCode: this.props.match.params.id,
            id: '',
            title: '',
            details: '',
            beginDate: moment(new Date()).format('YYYY-MM-DD'),
            clubUsername: '',
            hasEnded: '',
            notPrivate: ''
        }

        this.updateGameClicked = this.updateGameClicked.bind(this)
        this.updatePrivateGameClicked = this.updatePrivateGameClicked.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handlePrivateDelete = this.handlePrivateDelete.bind(this)
        this.refreshGame = this.refreshGame.bind(this)
        this.addGameClicked = this.addGameClicked.bind(this)
        this.addPrivateGameClicked = this.addPrivateGameClicked.bind(this)
        this.infoGameClicked = this.infoGameClicked.bind(this)
        this.infoPrivateGameClicked = this.infoPrivateGameClicked.bind(this)
    }

    componentDidMount() {
        this.refreshGame();
    }
    //
    // componentDidUpdate(){
    //     this.refreshGames()
    // }

    refreshGame() {
        GamePrivateDataService.retrievePrivateGameBySecretCode(this.state.secretCode)
            .then(
                response => {
                    console.log(response)
                    this.setState(
                        {
                            secretCode: response.data.secretCode,
                            id: response.data.id,
                            title: response.data.title,
                            details: response.data.details,
                            beginDate: response.data.beginDate,
                            clubUsername: response.data.clubUsername,
                            hasEnded: response.data.hasEnded,
                            notPrivate: response.data.notPrivate
                        })
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

                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                &nbsp;
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

                        <tr key={this.state.id}>
                            <td>{this.state.title}</td>
                            <td>
                                <button className="btn btn-success btn-primary"
                                        onClick={() => this.infoPrivateGameClicked(this.state.id)}
                                >
                                    Details
                                </button>
                            </td>
                            <td>{this.state.clubUsername}</td>
                            <td>{moment(this.state.beginDate).format('YYYY-MM-DD')}</td>
                            <td>{this.state.hasEnded.toString()}</td>
                            <td>{(this.state.notPrivate) ? 'true': 'false'}</td>
                        </tr>
                    </tbody>
                </table>

                <h3>List Of Players for {this.state.title} </h3>
                <div className="row">

                    <button className="btn btn-success"
                            style={{width: "230px"}}
                            onClick={this.addPrivateGameClicked}
                    >
                        Join Game
                    </button>
                </div>
            </div>
        )
    }
}

export default PlayerPrivateGameList