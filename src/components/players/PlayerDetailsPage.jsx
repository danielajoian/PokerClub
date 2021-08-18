import React, {Component} from "react";
import {Link} from "react-router-dom";

class PlayerDetailsPage extends Component {
    render() {
        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedUser')}!</h4>
                <button className="btn btn-success">
                    <Link to="/playerAccount" className="link">
                        Change Account Details
                    </Link>
                </button>
            </div>
        )
    }
}

export default PlayerDetailsPage