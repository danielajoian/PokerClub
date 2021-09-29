import React, {Component} from "react";
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
       event.preventDefault()
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

    handleChange(event) {
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
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
                            onClick={this.handleSubmit}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default ClubLogin