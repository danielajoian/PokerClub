import React, {Component} from "react";
import {Link} from "react-router-dom";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            clubUsername: this.props.match.params.name,
            email: '',
            password: '',
            city: '',
            country: '',
            address: '',
            site: '',
            phoneNumber: '',
            imageLink: '',
            confirmPassword: '',
            errors: {
                password: '',
                confirmPassword: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validatePassword = this.validatePassword.bind(this)
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
        this.refreshClub = this.refreshClub.bind(this)
    }

    componentDidMount() {
        this.refreshClub()
    }

    refreshClub() {
        let clubUsername = this.state.clubUsername
        ClubsDataService.retrieveClub(clubUsername)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id: response.data.id,
                        clubUsername: response.data.clubUsername,
                        email: response.data.email,
                        // password: response.data.password,
                        city: response.data.city,
                        country: response.data.country,
                        address: response.data.address,
                        site: response.data.site,
                        phoneNumber: response.data.phoneNumber,
                        imageLink: response.data.imageLink
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
            let club = {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                city: this.state.city,
                country: this.state.country,
                address: this.state.address,
                site: this.state.site,
                phoneNumber: this.state.phoneNumber,
                imageLink: this.state.imageLink
            }
            ClubsDataService
                .changePassword(this.state.clubUsername, club)
                .then(response => {
                    console.log(response)
                    this.props.history.push(`/clubLogin`)
                })
        }else return
    }


    render() {
        let {password, confirmPassword} = this.state

        return (
            <div className="container content-box">
                <h3 className="card-header">Change Password for Clubs</h3>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                <label>New Password: </label>
                <input type="password"
                       name="password"
                       value={password}
                       onChange={this.handleChange}
                       required={this.validatePassword()}
                />
                <br/>
                {this.state.errors.password &&
                <p style={{color: "red", display: "inline"}}>
                    {this.state.errors.password}</p>}
                <br/>

                <label>Confirm Password: </label>
                <input type="password"
                       name="confirmPassword"
                       value={confirmPassword}
                       onChange={this.handleChange}
                       required={this.validateConfirmPassword()}
                />
                {/*<br/>*/}
                {this.state.errors.confirmPassword &&
                <p style={{color: "red", display: "inline"}}>
                    {this.state.errors.confirmPassword}</p>}
                <br/>
                <br/>

                <button className="btn btn-success"
                        type="submit"
                >
                    {/*<Link to="/clubLogin" className="link">*/}
                        Submit
                    {/*</Link>*/}
                </button>
                </form>
            </div>
        )
    }
}

export default ClubForgotPassword