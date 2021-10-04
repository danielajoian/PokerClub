import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            city: '',
            password: '',
            confirmPassword: '',
            errors: {
                username: '',
                email: '',
                city: '',
                password: '',
                confirmPassword: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateUsername = this.validateUsername.bind(this)
        this.validateEmail= this.validateEmail.bind(this)
        this.validateCity= this.validateCity.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
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

    validateCity = () => {
        let error = this.state.errors
        if (!this.state.city) {
            error.city = 'Required'
        } else if(this.state.city.length < 3) {
            error.city = 'Username has to have at least 3 characters'
        }else {
            error.city = ''
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
        if (this.state.errors.username === '' &&
            this.state.errors.email === '' &&
            this.state.errors.city === '' &&
            this.state.errors.password === '' &&
            this.state.errors.confirmPassword === '') {
                let player = {
                    email: this.state.email,
                    city: this.state.city,
                    password: this.state.password
                }
                PlayersDataService
                    .createPlayer(this.state.username, player)
                    .then(response => {
                        console.log(response)
                        this.props.history.push(`/registerSuccessful`)
                    })
        }else return
    }

    render() {
        let {username, email, city, password, confirmPassword} = this.state

        return (
            <div className="container content-box">
                <h3>Player Register Form</h3>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                    <label>UserName:</label>
                    <input type="text"
                           name="username"
                           value={username}
                           onChange={this.handleChange}
                           required={this.validateUsername()}
                    />
                    {this.state.errors.username &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.username}</p>}
                    <br/>
                    <br/>

                    <label>Email:</label>
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

                    <label>City:</label>
                    <input type="text"
                           name="city"
                           value={city}
                           onChange={this.handleChange}
                           required={this.validateCity()}
                    />
                    {this.state.errors.city &&
                    <p style={{color: "red", display: "inline"}}>{this.state.errors.city}</p>}
                    <br/>
                    <br/>

                    <label>Password:</label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={this.handleChange}
                           required={this.validatePassword()}
                    />
                    {this.state.errors.password &&
                    <p style={{color: "red", display: "inline"}}>{this.state.errors.password}</p>}
                    <br/>
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
                        Register
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerRegister
