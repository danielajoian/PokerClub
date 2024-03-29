import React, {Component} from "react";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import {Link} from "react-router-dom";

class PlayerDeletedSuccessful extends Component {
    render() {
        return (
            <div className="container content-box">
                <h4 className="card-header">Player was deleted!</h4>
                <button className="btn btn-success"
                        style={{width: "190px", height: "35px"}}
                    onClick={() => AuthenticationServiceJwt.logout()}
                        >
                    <Link className="nav-link link" to="/" >
                        Go Home
                    </Link>
                </button>
                &nbsp;
                <img
                    style={{maxWidth: "300px"}}
                    src="/bye.gif"
                    alt="Deleted"/>
            </div>
        )
    }
}

export default PlayerDeletedSuccessful