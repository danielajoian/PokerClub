import React, {Component} from "react";
// import {Link} from "react-router-dom";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubUsername: '',
            password: '',
            city: '',
            country: '',
            address: '',
            email: '',
            site: '',
            phoneNumber: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let club = {
            password: this.state.password,
            city: this.state.city,
            country: this.state.country,
            address: this.state.address,
            email: this.state.email,
            site: this.state.site,
            phoneNumber: this.state.phoneNumber
        }

        ClubsDataService.createClub(this.state.clubUsername, club)
            .then(response => {
                console.log(response)
                this.props.history.push(`/clubRegisterSuccessful`)
            })
    }

    render() {
        let {clubUsername,
            password,
            city,
            country,
            address,
            email,
            site,
            phoneNumber} = this.state

        return (
            <div className="container content-box">
                <h3>Club Register Form</h3>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                    <label>Club Name: </label>
                    <input type="text"
                           name="clubUsername"
                           value={clubUsername}
                           onChange={this.handleChange}
                    />

                    <label>City: </label>
                    <input type="text"
                           name="city"
                           value={city}
                           onChange={this.handleChange}
                    />
                    <label>Country: </label>
                    <input type="text"
                           name="country"
                           value={country}
                           onChange={this.handleChange}
                    />

                    <label>Site Address: </label>
                    <input type="text"
                           name="site"
                           value={site}
                           onChange={this.handleChange}
                    />

                    <label>Address: </label>
                    <input type="text"
                           name="address"
                           value={address}
                           onChange={this.handleChange}
                    />

                    <label>Phone Number: </label>
                    <input type="number"
                           name="phoneNumber"
                           value={phoneNumber}
                           onChange={this.handleChange}
                    />

                    <label>Email: </label>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                    />

                    <label>Password: </label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={this.handleChange}
                    />
                    <button className="btn btn-success"
                            type="submit"
                    >
                        {/*<Link to="/clubRegisterSuccessful" className="link">*/}
                            Register
                        {/*</Link>*/}
                    </button>
                </form>
            </div>
        )
    }
}

export default ClubRegister