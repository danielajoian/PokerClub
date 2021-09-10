import React, {Component} from "react";
import {Link} from "react-router-dom";

class FirstPage extends Component {
    render() {
        return (
            <div className='content-box'>
                <h1>PokerApp</h1>
                <h3>Are you a Player or you own a Club?</h3>
                <button className="btn btn-success"
                        style={{border: "2px solid", height: "50px", width: "220px"}}>
                    <Link to="/playerPage" className="link">
                        <img style={{maxWidth: "30px", padding: "1px"}}
                            src="/poker-chips.png"
                             alt="player"
                        /> &nbsp;
                        Player
                    </Link>
                </button>
                <button className="btn btn-success"
                        style={{border: "2px solid",  height: "50px", width: "220px"}}>
                    <Link to="/clubOwner" className="link">
                        Poker Club &nbsp;
                        <img style={{maxWidth: "40px"}}
                             src="/poker.png"
                             alt="club"
                        />
                    </Link>
                </button>
            </div>
        )
    }
}

export default FirstPage