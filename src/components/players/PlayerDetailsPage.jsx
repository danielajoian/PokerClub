import React, {Component} from "react";
import {Link} from "react-router-dom";

class PlayerDetailsPage extends Component {
    render() {
        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedUser')}!</h4>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "300px"}}>
                    <Link to="/playerAccount" className="link">
                        Change Account Details
                    </Link>
                </button>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "300px"}}>
                    <a href="https://www.pokerstars.ro/poker/games/rules/"
                          target="_blank"
                          className="link">
                        Check the Rules
                    </a>
                </button>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "300px"}}>
                    <Link to="/" className="link">
                        Go to Private Games
                    </Link>
                </button>
            </div>
        )
    }
}

export default PlayerDetailsPage