import React, {Component} from "react";
import {Link} from "react-router-dom";

class ClubOwnersPage extends Component {
    render() {
        return (
            <div>
                <h3> Welcome to Club Owners Page! </h3>
                <h4> If you already have an account then you should
                    <button className="btn btn-success">
                        <Link to="/clubLogin" className="link">
                            Login
                        </Link>
                    </button>
                </h4>
                <h4>If you don't then you should
                    <button className="btn btn-success">
                        <Link to="/clubRegister" className="link">
                            Register
                        </Link>
                    </button>
                </h4>
            </div>
        )
    }
}

export default ClubOwnersPage