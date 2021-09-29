import React, {Component} from "react";
import "bootstrap"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

class Header extends Component {
    render() {
        const isUserLoggedIn = AuthenticationServiceJwt.isUserLoggedIn();
        const isClubLoggedIn = AuthenticationServiceJwt.isClubLoggedIn();
        console.log(isUserLoggedIn);
        console.log(isClubLoggedIn);

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
                            <Link className="nav-link link" to="/" >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/clubs" className="nav-link link">
                                Clubs
                            </Link>
                        </li>
                </ul>

                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {isUserLoggedIn &&
                        <li>
                            <Link to="/playerDetailsPage" className="nav-link link">
                                Welcome {sessionStorage.getItem('authenticatedUser')}
                            </Link>
                        </li>}

                    {isClubLoggedIn &&
                        <li>
                            <Link to="/clubDetailsPage" className="nav-link link">
                                Welcome {sessionStorage.getItem('authenticatedClub')}
                            </Link>
                        </li>}

                    {isUserLoggedIn &&
                        <li>
                            <Link to="/logout"
                                  className="nav-link link"
                                  onClick={AuthenticationServiceJwt.logout}
                            >
                                Logout
                            </Link>
                        </li>}

                    {isClubLoggedIn &&
                        <li>
                            <Link to="/logout"
                                  className="nav-link link"
                                  onClick={AuthenticationServiceJwt.logout}
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