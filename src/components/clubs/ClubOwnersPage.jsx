import React, {Component} from "react";
import {Link} from "react-router-dom";

class ClubOwnersPage extends Component {
    render() {
        return (
            <div>
                <h3> Welcome to Club Owners Page! </h3>
               &nbsp;
                <h6> If you already have an account then you should
                    <button className="btn btn-success">
                        <Link to="/clubLogin" className="link">
                            Login
                        </Link>
                    </button>
                </h6>
                &nbsp;
                <h6>If you don't then you should
                    <button className="btn btn-success">
                        <Link to="/clubRegister" className="link">
                            Register
                        </Link>
                    </button>
                </h6>
            </div>
        )
    }
}

export default ClubOwnersPage