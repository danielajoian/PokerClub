import React, {Component} from "react";
import "bootstrap"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
import AuthenticationService from "./AuthenticationService.js";

class Header extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);

        return (
            <nav className="head navbar navbar-expand-md">
                <div className="navbar-brand">
                    <img style={{maxWidth: "30px"}}
                         src="/cards.png"
                         alt="cards"
                    />
                    PokerApp
                </div>
                <ul className="navbar-nav">
                        <li>
                            <Link className="nav-link" to="/" >
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
                    {isUserLoggedIn &&
                        <li>
                            <Link to="/playerDetailsPage" className="nav-link">
                                Welcome {sessionStorage.getItem('authenticatedUser')}
                            </Link>
                        </li>}

                    {isUserLoggedIn &&
                        <li>
                            <Link to="/logout"
                                  className="nav-link"
                                  onClick={AuthenticationService.logout}
                            >
                                Logout
                            </Link>
                        </li>}
                </ul>
            </nav>
        )
    }
}

// export default Header;
export default withRouter(Header);