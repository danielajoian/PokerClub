import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

class PlayerRegister extends Component {
    render() {
        return (
            <div className="container content-box">
                <h3>Player Register Form</h3>
                <form>
                    <label>Name: </label><input type="text" name="username"/>
                    <label>Email: </label><input type="email" name="email"/>
                    <label>Password: </label><input type="password" name="password"/>
                    <button className="btn btn-success">
                        <Link to="/registerSuccessful" className="link">
                            Register
                        </Link>
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerRegister