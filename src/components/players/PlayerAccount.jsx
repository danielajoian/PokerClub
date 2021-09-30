import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            username: this.props.match.params.name,
            email: '',
            password: '',
            confirmPassword: '',
            errors: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateUsername = this.validateUsername.bind(this)
        this.validateEmail= this.validateEmail.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        // this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
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
        if (this.state.errors.username === '' &&
            this.state.errors.email === '' &&
            this.state.errors.password === '') {
                let player = {
                    email: this.state.email,
                    password: this.state.password
                }
                PlayersDataService.updatePlayer(this.state.username, this.state.id, player)
                    .then(response => {
                        console.log(response)
                        this.props.history.push(`/playerDetailsPage`)
                    })
        }else return
    }

    validateUsername= () => {
        let error = this.state.errors
        if (!this.state.username) {
            error.username = 'Required'
        } else if(this.state.username.length < 3) {
            error.username = 'Username has to have at least 3 characters'
        }else {
            error.username = ''
        }
    }

    validateEmail= () => {
        let error = this.state.errors
        if (!this.state.email) {
            error.email = 'Required'
        } else if(!(this.state.email
            .match(/[A-Za-z]+[0-9.]*@[A-Za-z]{3,}\.[A-Za-z]{2,}/))) {
            error.email = 'Email is not valid'
        }else {
            error.email = ''
        }
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

    // validateConfirmPassword= () => {
    //     let error = this.state.errors
    //     if (!this.state.confirmPassword) {
    //         error.confirmPassword = 'Required'
    //     } else if(!(this.state.confirmPassword === this.state.password)) {
    //         error.confirmPassword = 'Passwords have to match'
    //     }else {
    //         error.confirmPassword = ''
    //     }
    // }


    render() {
        let {username, email, password, confirmPassword} = this.state
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
                           required={this.validateUsername()}
                    />
                    {this.state.errors.username &&
                    <p style={{color: "red", display: "inline"}}>{this.state.errors.username}</p>}
                    <br/>
                    <br/>
                    <label>Email: </label>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                           required={this.validateEmail()}
                    />
                    {this.state.errors.email &&
                    <p style={{color: "red", display: "inline"}}>{this.state.errors.email}</p>}
                    <br/>
                    <br/>

                    <label>Password: </label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={this.handleChange}
                           required={this.validatePassword()}
                    />
                    {this.state.errors.password &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.password}</p>}
                    <br/>
                    <br/>

                    {/*{(this.state.errors.password === 'Required' || this.state.errors.password === ' ')*/}
                    {/*&& <label>Confirm Password:</label>}*/}
                    {/*{(this.state.errors.password === 'Required' || this.state.errors.password === ' ')*/}
                    {/*&&*/}
                    {/*<input type="password"*/}
                    {/*       name="confirmPassword"*/}
                    {/*       value={confirmPassword}*/}
                    {/*       onChange={this.handleChange}*/}
                    {/*       required={this.validateConfirmPassword()}*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*{this.state.errors.confirmPassword &&*/}
                    {/*<p style={{color: "red", display: "inline"}}>*/}
                    {/*    {this.state.errors.confirmPassword}</p>}*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
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