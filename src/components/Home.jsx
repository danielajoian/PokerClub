import React, { Component } from "react";
import '../switcher.scss';
import Login from "./Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Welcome from "./Welcome";
import Error from "./Error";
import Clubs from "./Clubs";
import FirstPage from "./FirstPage";
import Logout from "./Logout";

class Home extends Component {
    render() {
        return (
            <div className='content-box'>
                <Router>
                    {/*<>*/}
                        <Switch>
                            <Route path="/" exact component={FirstPage} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/clubs" component={Clubs} />
                            <Route path="/welcome/:name" component={Welcome} />
                            <Route component={Error} />
                        </Switch>
                    {/*</>*/}
                </Router>
            </div>
        );
    }
}

export default Home;