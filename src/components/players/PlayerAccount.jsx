import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            username: this.props.match.params.name,
            email: '',
            password: ''
        }
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.refreshPlayers()
    }

    refreshPlayers() {
        let playerName = this.state.username
        PlayersDataService.retrievePlayer(playerName)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id : response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        password: response.data.password
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
        let player = {
            email: this.state.email,
            password: this.state.password
        }
        PlayersDataService.updatePlayer(this.state.username, this.state.id, player)
            .then(response => {
                console.log(response)
                this.props.history.push(`/playerDetailsPage`)
            })
    }


    render() {
        let {username, email, password} = this.state
        return (
            <div>
                <h2>Player Account Details</h2>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                    <label>UserName: </label>
                    <input type="text"
                           name="username"
                           value={username}
                           onChange={this.handleChange}
                    />
                    <label>Email: </label>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                    />
                    <br/>
                    <label>Password: </label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={this.handleChange}
                    />
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "220px"}}
                    >
                        Submit Changes
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerAccount