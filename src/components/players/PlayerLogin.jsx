import React, {Component} from "react";
import AuthenticationService from "../../api/services/AuthenticationService.js";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.loginClicked = this.loginClicked.bind(this);
    }

    // componentDidMount() {
    //     this.props.history.push(`/welcome/${this.state.username}`)
    // }

    handleChange(event) {
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    // loginClicked() {
    //     AuthenticationServiceJwt
    //         .executeUserJwtAuthenticationService(this.state.username, this.state.password)
    //         .then((response) => {
    //             console.log(response.data.token)
    //             console.log(response.data)
    //             AuthenticationServiceJwt
    //                 .registerSuccessfulLoginForJwt(this.state.username, response.data.token);
    //             this.props.history.push(`/welcome/${this.state.username}`)
    //         }).catch(() => {
    //             console.log('Failed');
    //             this.setState({showSuccessMessage: false})
    //             this.setState({hasLoginFailed: true})
    //     })
    //     console.log(this.state);
    // }

    handleSubmit = (event) => {
        event.preventDefault()
        AuthenticationServiceJwt
            .executeUserJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(response.data.token)
                console.log(response.data)
                AuthenticationServiceJwt
                    .registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)
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
                <h3>Player Login</h3>
                &nbsp;
                {this.state.hasLoginFailed && <div className="alert alert-warning">
                                Invalid Credentials</div>}
                {/*{this.state.showSuccessMessage && <div className="alert alert-success">Login Successful</div>}*/}
                <form>
                   <label>UserName: </label>
                       <input type="text"
                              name="username"
                              value={this.state.username}
                              onChange={this.handleChange}
                        />
                        <br/>
                    <label>Password: </label>
                        <input type="password"
                                name="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />

                    <button className="btn btn-success"
                        // onClick={this.loginClicked}>
                        onClick={this.handleSubmit}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerLogin