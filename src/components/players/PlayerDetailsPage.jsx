import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            username: ''
        }
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.refreshPlayers()
    }

    refreshPlayers() {
        let playerName = AuthenticationServiceJwt.getLoggedInUserName()
        PlayersDataService.retrievePlayer(playerName)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id : response.data.id,
                        username: response.data.username
                    })
                }
            )
    }

    deleteAccount(id) {
        let playerName = this.state.username
        console.log(id + " " + playerName);
        if(window.confirm('Are you sure you want to delete this account?')) {
            PlayersDataService.deletePlayer(playerName, id)
                .then(response => {
                    console.log(response)
                })
            AuthenticationServiceJwt.logout();
        }
    }

    handleClick = () => {
        this.props.history.push(`/playerAccount/${this.state.username}/${this.state.id}`)
    }

    render() {
        let {id} = this.state

        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedUser')}!</h4>
                &nbsp;
                <button className="btn btn-success"
                        onClick={this.handleClick}
                        style={{width: "300px"}}>
                    Change Account Details
                </button>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "300px"}}>
                    <a href="https://www.pokerstars.ro/poker/games/rules/"
                       target="_blank"
                       rel="noreferrer"
                       className="link">
                        Check the Rules
                    </a>
                </button>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "300px"}}>
                    <Link to="/" className="link">
                        Go to Private Games
                    </Link>
                </button>
                &nbsp;
                <button className="btn btn-warning"
                        type="submit"
                        style={{width: "300px"}}
                        onClick={() => this.deleteAccount(id)}
                >
                    <Link to="/" className="link">
                        Delete Account
                    </Link>
                </button>
            </div>
        )
    }
}

export default PlayerDetailsPage