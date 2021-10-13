import React, {Component} from "react";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        AuthenticationServiceJwt
            .executeUserJwtAuthenticationService(this.state.username, this.state.password)
            .then(response => {
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
                <h3 className="card-header">Player Login</h3>
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
                    <br/>
                    <label>Password: </label>
                        <input type="password"
                                name="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />
                    <br/>
                    <br/>
                    <button className="btn btn-success"
                        onClick={this.handleSubmit}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerLogin