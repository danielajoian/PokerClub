import React, {Component} from "react";
import AuthenticationService from "../../api/services/AuthenticationService.js";

class PlayerLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked() {
        //Dani, 1234
        if ((this.state.username==='Dani' && this.state.password==='1234')
            || (this.state.username === 'Luna' && this.state.password === '1234')) {
            console.log('Successful')
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`)
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
                <h3>Player Login</h3>
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
                        onClick={this.loginClicked}>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerLogin