import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";

class ClubLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubname: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked() {
        //All In, 1234
        if (this.state.clubname==='All In' && this.state.password==='1234') {
            console.log('Successful')
            AuthenticationService.registerSuccessfulLogin(this.state.clubname, this.state.password);
            this.props.history.push(`/welcome/${this.state.clubname}`)
        }else{
            console.log('Failed');
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        }
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
                <form>
                    <label>Club Name: </label>
                        <input type="text"
                               name="clubname"
                               value={this.state.clubname}
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