import React, {Component} from "react";
import "../../modalStyle.css"
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";
import {Link} from "react-router-dom";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";

class PlayerPrivateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
                id: '',
                title: '',
                description: '',
                secretCode: ''
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.refreshGame = this.refreshGame.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    // componentDidMount() {
    //     this.refreshGame()
    // }

    refreshGame() {
        GamePrivateDataService.retrievePrivateGameBySecretCode(this.state.secretCode)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        secretCode: response.data.secretCode
                    })
                }
            )
    }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleCancel = () => {
        this.props.history.push(`/playerDetailsPage`)
    }

    handleClick = () => {
        this.refreshGame()
        this.props.history.push(`/playerPrivateGameList/${this.state.secretCode}`)
    }

    render() {
        let {secretCode} = this.state

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
                        {/*<p>Private Game Code</p>*/}
                        <h3>Do you have a secret code?</h3>
                    </div>
                    <div className="body">
                        {/*<label>Do you have a secret code?</label>*/}
                        {/*<br />*/}
                        {/*<br />*/}
                        <input placeholder="Enter secret code here"
                               type="text"
                               name="secretCode"
                               value={secretCode}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className="footer">
                        <button className="btn btn-success"
                                id="cancelBtn"
                                onClick={this.handleCancel}>
                            Go Back
                        </button>
                        <button className="btn btn-warning"
                                onClick={this.handleClick}
                        >
                            {/*<Link to="/playerPrivateGameList" className="link">*/}
                                Confirm
                            {/*</Link>*/}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayerPrivateGame