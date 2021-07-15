import React, {Component} from "react";

class PlayerDetailsPage extends Component {
    render() {
        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedUser')}!</h4>
            </div>
        )
    }
}

export default PlayerDetailsPage