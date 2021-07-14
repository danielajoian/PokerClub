import React, {Component} from "react";

class Welcome extends Component {
    render() {
        return (
            <div className="container">
                <h3>Welcome to PokerApp, {this.props.match.params.name}!</h3>
            </div>
        )
    }
}

export default Welcome