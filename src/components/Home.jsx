import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '../switcher.scss';
import Login from "./Login.jsx";
import Welcome from "./Welcome.jsx";
import Error from "./Error.jsx";
import Clubs from "./Clubs.jsx";
import FirstPage from "./FirstPage.jsx";
import Logout from "./Logout.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import Header from "./Header";
import Footer from "./Footer";

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <Router>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={FirstPage} />
                        <Route path="/login" component={Login} />
                        <AuthenticatedRoute path="/logout" component={Logout} />
                        <Route path="/clubs" component={Clubs} />
                        <AuthenticatedRoute path="/welcome/:name" component={Welcome} />
                        <Route path="*" component={Error} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default Home;