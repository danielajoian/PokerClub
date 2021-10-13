import React, {Component} from "react";
import "../../modalStyle.css"
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";
import {Link} from "react-router-dom";

class PlayerDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: ''
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
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
        // if(window.confirm('Are you sure you want to delete this account?')) {
            PlayersDataService.deletePlayer(playerName, id)
                .then(response => {
                    console.log(response)
                })
        // }
    }

    handleCancel = () => {
        this.props.history.push(`/playerDetailsPage`)
    }

    render() {

        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button className="btn btn-success"
                                style={{backgroundColor: "white"}}
                            onClick={this.handleCancel}>
                            X
                        </button>
                    </div>
                    <div className="title">
                        <p>Delete Account</p>
                    </div>
                    <div className="body">
                        <p className="card-header">Are you sure you want to delete this account?</p>
                    </div>
                    <div className="footer">
                        <button className="btn btn-success"
                                onClick={this.handleCancel}>
                            No
                        </button>
                        <button className="btn btn-warning" id="cancelBtn"
                                onClick={() => this.deleteAccount(this.state.id)}
                        >
                            <Link to="/deletedSuccessful" className="link">
                            Yes
                            </Link>
                            </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerDeleteModal