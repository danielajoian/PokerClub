import React, {Component} from "react";
import "../../modalStyle.css"
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import {Link} from "react-router-dom";
import moment from "moment";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";

class GamePrivateDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            title: '',
            details: '',
            beginDate: ''
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.deleteGameClicked = this.deleteGameClicked.bind(this);
        this.refreshGames = this.refreshGames.bind(this)
    }

    componentDidMount() {
        this.refreshGames();
    }

    // componentDidUpdate(){
    //     this.refreshGames();
    // }

    refreshGames() {
        let clubName = AuthenticationServiceJwt.getLoggedInClubName()
        GamePrivateDataService.retrievePrivateGame(clubName, this.state.id)
            .then(response =>
                this.setState({
                    title: response.data.title,
                    details: response.data.details,
                    beginDate: moment(response.data.beginDate).format('YYYY-MM-DD')
                }))
    }

    deleteGameClicked(gameId) {
        let club = AuthenticationServiceJwt.getLoggedInClubName()
        console.log(gameId + " " + club);
        // if(window.confirm('Are you sure you want to delete this game?')) {
        GamePrivateDataService.deletePrivateGame(club, gameId)
            .then(response => {
                // this.setState({message: `Delete of game ${id} successful`})
                console.log(gameId)
            })
        // }
    }

    handleCancel = () => {
        this.props.history.push(`/games`)
    }

    render() {

        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button className="btn btn-success"
                                onClick={this.handleCancel}>
                            X
                        </button>
                    </div>
                    <div className="title">
                        <p>Delete Game</p>
                    </div>
                    <div className="body">
                        <p>Are you sure you want to delete this game?</p>
                    </div>
                    <div className="footer">
                        <button className="btn btn-success"
                                onClick={this.handleCancel}>
                            No
                        </button>
                        <button className="btn btn-warning" id="cancelBtn"
                                onClick={() => this.deleteGameClicked(this.state.id)}
                        >
                            <Link to="/games" className="link">
                                Yes
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default GamePrivateDeleteModal