import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerForgotPasswordUsername extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            players: [],
            hasUsernameFailed: false
        }

        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.refreshPlayers()
    }

    refreshPlayers() {
        PlayersDataService.retrieveAllPlayers()
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        players: response.data
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

    handleSubmit = (event) => {
        event.preventDefault()
        let name = this.state.username;
        console.log("Name: " + name)
        this.state.players.map(
            player => {
            if (name === player.username) {
                return this.props.history.push(`/playerForgotPassword/${this.state.username}`)
            }else {
                this.setState({
                    hasUsernameFailed: true
                })

            }
        })
            // this.props.history.push(`/playerWrongUsername`)
    }

    render() {
        return (
            <div className="container content-box">
                <h3 className="card-header">Enter your Username</h3>
                    {this.state.hasUsernameFailed && <div className="alert alert-warning">
                        Invalid Username</div>}
                &nbsp;
                <form
                    onSubmit={this.handleSubmit}
                >

                <label>Username: </label>
                <input type="text"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange}
                />
                <br/><br/>
                <button className="btn btn-success"
                        type="submit"
                        style={{width: "200px"}}
                >
                        Next Step
                </button>
                </form>
            </div>
        );
    }
}

export default PlayerForgotPasswordUsername