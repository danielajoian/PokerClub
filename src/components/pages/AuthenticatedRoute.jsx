import React, {Component} from "react";
import AuthenticationService from "../../api/services/AuthenticationService.js";
import {Redirect, Route} from "react-router-dom";

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn() || AuthenticationService.isClubLoggedIn()){
           return <Route {...this.props}/>
        }else {
           return <Redirect to="/" />
        }
    }
}

export default AuthenticatedRoute