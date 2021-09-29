import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            clubUsername: this.props.match.params.name,
            email: '',
            password: '',
            city: '',
            country: '',
            address: '',
            site: '',
            phoneNumber: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshClubs = this.refreshClubs.bind(this)
    }

    componentDidMount() {
        this.refreshClubs()
    }

    refreshClubs() {
        let clubUsername = this.state.clubUsername
        ClubsDataService.retrieveClub(clubUsername)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id: response.data.id,
                        clubUsername: response.data.clubUsername,
                        email: response.data.email,
                        password: response.data.password,
                        city: response.data.city,
                        country: response.data.country,
                        address: response.data.address,
                        site: response.data.site,
                        phoneNumber: response.data.phoneNumber
                    })
                }
            )
    }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let club = {
            email: this.state.email,
            password: this.state.password,
            city: this.state.city,
            country: this.state.country,
            address: this.state.address,
            site: this.state.site,
            phoneNumber: this.state.phoneNumber
        }
        ClubsDataService
            .updateClub(this.state.clubUsername, this.state.id, club)
            .then(response => {
                console.log(response)
                this.props.history.push(`/`)
            })
    }

    render() {
        let {
            clubUsername,
            password,
            city,
            country,
            address,
            email,
            site,
            phoneNumber
        } = this.state;

        return (
            <div>
                <h2>Club Account Details</h2>
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
                    <input type="text"
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
                            style={{width: "220px"}}
                            >
                        Submit Changes
                    </button>
                </form>
            </div>
        )
    }
}

export default ClubAccount