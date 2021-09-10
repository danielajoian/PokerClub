import React, {Component} from "react";
import {Link} from "react-router-dom";

class ClubDetailsPage extends Component {
    render() {
        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedClub')}!</h4>
                &nbsp;
                <button className="btn btn-success"
                    style={{width: "200px"}}>
                    <Link to="/games" className="link">
                        Add Games
                    </Link>
                </button>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "200px"}}>
                    <Link to="/clubAccount" className="link">
                        Change Details
                    </Link>
                </button>
            </div>
        )
    }
}

export default ClubDetailsPage