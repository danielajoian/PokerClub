import React, {Component} from "react";
import {Link} from "react-router-dom";

class FirstPage extends Component {
    render() {
        return (
            <div className='content-box'>
                <h1>PokerApp</h1>
                <h3>Are you a Player or you own a Club?</h3>
                <button className="btn btn-success">
                    <Link to="/playerPage" className="link">
                        <img style={{maxWidth: "40px"}}
                            src="/poker-chips.png"
                             alt="player"
                        /> &nbsp;
                        Player
                    </Link>
                </button>
                <button className="btn btn-success">
                    <Link to="/clubOwner" className="link">
                        <img style={{maxWidth: "40px"}}
                            src="/poker.png"
                             alt="club"
                        /> &nbsp;
                        Poker Club
                    </Link>
                </button>
            </div>
        )
    }
}

export default FirstPage