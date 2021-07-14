import React, {Component} from "react";
import {Link} from "react-router-dom";

class FirstPage extends Component {
    render() {
        return (
            <div className='content-box'>
                <h1>PokerApp</h1>
                <button className="btn btn-success">
                    <Link to="/clubs" className="link">
                        Player
                    </Link>
                </button>
                <button className="btn btn-success">
                    <Link to="/login" className="link">
                        Poker Club
                    </Link>
                </button>
            </div>
        )
    }
}

export default FirstPage