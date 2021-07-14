import React, {Component} from "react";
import "bootstrap"
import {Link, withRouter} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <nav className="head navbar navbar-expand-md">
                <div className="navbar-brand">PokerApp</div>
                <ul className="navbar-nav">
                    <li>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/clubs" className="nav-link">
                            Clubs
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    <li>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="nav-link">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Header)