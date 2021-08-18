import React, {Component} from "react";
import {Link} from "react-router-dom";

class ClubDetailsPage extends Component {
    render() {
        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedClub')}!</h4>
                <button className="btn btn-success">
                    <Link to="/games" className="link">
                        Click to Add Games
                    </Link>
                </button>
                <button className="btn btn-success">
                    <Link to="/clubAccount" className="link">
                        Change Account Details
                    </Link>
                </button>
            </div>
        )
    }
}

export default ClubDetailsPage