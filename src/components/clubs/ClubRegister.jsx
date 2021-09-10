import React, {Component} from "react";
import {Link} from "react-router-dom";

class ClubRegister extends Component {
    render() {
        return (
            <div className="container content-box">
                <h3>Club Register Form</h3>
                &nbsp;
                <form>
                    <label>Club Name: </label><input type="text" name="clubname"/>
                    <label>City: </label><input type="text" name="city"/>
                    <label>Country: </label><input type="text" name="country"/>
                    <label>Site Address: </label><input type="text" name="site"/>
                    <label>Address: </label><input type="text" name="site"/>
                    <label>Phone Number: </label><input type="text" name="site"/>
                    <label>Email: </label><input type="email" name="email"/>
                    <label>Password: </label><input type="password" name="password"/>
                    <button className="btn btn-success">
                        <Link to="/clubRegisterSuccessful" className="link">
                            Register
                        </Link>
                    </button>
                </form>
            </div>
        )
    }
}

export default ClubRegister