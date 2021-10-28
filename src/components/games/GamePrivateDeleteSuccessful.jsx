import React, {Component} from "react";
import {Link} from "react-router-dom";

class GamePrivateDeleteSuccessful extends Component {
    render() {
        return (
            <div className="container content-box">
                <h4 className="card-header">Game was deleted!</h4>
                <button className="btn btn-success"
                        style={{width: "200px", height: "35px"}}
                >
                    <Link className="nav-link link" to="/games" >
                        Go to Games
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

export default GamePrivateDeleteSuccessful