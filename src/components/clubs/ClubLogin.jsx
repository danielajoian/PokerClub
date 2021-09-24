import React, {Component} from "react";
// import AuthenticationService from "../../api/services/AuthenticationService";
// import ClubsDataService from "../../api/services/ClubsDataService";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

class ClubLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubUsername: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        // this.refreshClubs = this.refreshClubs.bind(this);
    }

    // componentDidMount() {
    //     this.refreshClubs()
    // }
    //
    // refreshClubs() {
    //     let clubName = this.state.clubUsername
    //     ClubsDataService.retrieveClub(clubName)
    //         .then(
    //             response => {
    //                 console.log(response)
    //                 this.setState({
    //                     id : response.data.id,
    //                     clubUsername: response.data.clubUsername,
    //                     password: response.data.password,
    //                     city: response.data.city,
    //                     country: response.data.country,
    //                     address: response.data.address,
    //                     email: response.data.email,
    //                     site: response.data.site,
    //                     phoneNumber: response.data.phoneNumber
    //                 })
    //             }
    //         )
    // }

    handleChange(event) {
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationServiceJwt
            .executeClubJwtAuthenticationService(this.state.clubUsername, this.state.password)
            .then((response) => {
                console.log(response.data.token)
                console.log(response.data)
                AuthenticationServiceJwt
                    .registerClubSuccessfulLoginForJwt(this.state.clubUsername, response.data.token);
                this.props.history.push(`/welcome/${this.state.clubUsername}`)
            }).catch(() => {
            console.log('Failed');
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })
        console.log(this.state);
        }

    render() {
        return (
            <div className="container content-box">
                <h3>Club Login</h3>
                {this.state.hasLoginFailed && <div className="alert alert-warning">
                    Invalid Credentials</div>}
                &nbsp;
                <form>
                    <label>Club Name: </label>
                        <input type="text"
                               name="clubUsername"
                               value={this.state.clubUsername}
                               onChange={this.handleChange}
                        />
                    <label>Password: </label>
                        <input type="password"
                               name="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                    <button className="btn btn-success"
                            onClick={this.loginClicked}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default ClubLogin