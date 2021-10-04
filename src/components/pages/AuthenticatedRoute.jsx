import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationServiceJwt.isUserLoggedIn() || AuthenticationServiceJwt.isClubLoggedIn()){
           return <Route {...this.props}/>
        }else {
           return <Redirect to="/*" />
        }
    }
}

export default AuthenticatedRoute