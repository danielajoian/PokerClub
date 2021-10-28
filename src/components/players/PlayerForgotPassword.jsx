import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            username: this.props.match.params.name,
            password: '',
            email: '',
            city: '',
            imageLink: '',
            confirmPassword: '',
            privateGameId: '',
            errors: {
                password: '',
                confirmPassword: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
        this.refreshPlayer = this.refreshPlayer.bind(this)
    }

    componentDidMount() {
        this.refreshPlayer()
    }

    refreshPlayer() {
        let playerName = this.state.username
        PlayersDataService.retrievePlayer(playerName)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id : response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        // password: response.data.password,
                        city: response.data.city,
                        imageLink: response.data.imageLink,
                        privateGameId: response.data.privateGameId,
                    })
                }
            )
    }

    validatePassword= () => {
        let error = this.state.errors
        if (!this.state.password) {
            error.password = 'Required'
        } else if(this.state.password.length < 4) {
            error.password = 'Password has to have at least 4 characters'
        }else {
            error.password = ''
        }
    }

    validateConfirmPassword= () => {
        let error = this.state.errors
        if (!this.state.confirmPassword) {
            error.confirmPassword = 'Required'
        } else if(!(this.state.confirmPassword === this.state.password)) {
            error.confirmPassword = 'Passwords have to match'
        }else {
            error.confirmPassword = ''
        }
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
        if (this.state.errors.password === '' &&
            this.state.errors.confirmPassword === '') {
            let player = {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                city: this.state.city,
                imageLink: this.state.imageLink,
                privateGameId: this.state.privateGameId,
            }
            PlayersDataService
                .changePassword(this.state.username, player)
                .then(response => {
                    console.log(response)
                    this.props.history.push(`/playerLogin`)
                })
        }else return
    }

    render() {
        let {password, confirmPassword} = this.state

        return (
            <div className="container content-box">
                <h3 className="card-header">Change Password for Players</h3>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                <label>New Password:</label>
                <input type="password"
                       name="password"
                       value={password}
                       onChange={this.handleChange}
                       required={this.validatePassword()}
                />
                <br/>
                {this.state.errors.password &&
                <p style={{color: "red", display: "inline"}}>{this.state.errors.password}</p>}
                <br/>


                <label>Confirm Password:</label>
                <input type="password"
                       name="confirmPassword"
                       value={confirmPassword}
                       onChange={this.handleChange}
                       required={this.validateConfirmPassword()}
                />
                {this.state.errors.confirmPassword &&
                <p style={{color: "red", display: "inline"}}>{this.state.errors.confirmPassword}</p>}
                <br/>
                <br/>

                <button className="btn btn-success"
                        type="submit"
                >
                    {/*<Link to="/playerLogin" className="link">*/}
                        Submit
                    {/*</Link>*/}
                </button>
                </form>
            </div>
        );
    }
}

export default PlayerForgotPassword