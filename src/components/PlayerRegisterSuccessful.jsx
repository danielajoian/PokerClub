import React, {Component} from "react";

class PlayerRegisterSuccessful extends Component {
    render() {
        return (
            <div className="container content-box">
                <h4>Player was registered!</h4>
                <img
                    style={{maxWidth: "300px"}}
                    src="/great.gif"
                    alt="Success"/>
            </div>
        )
    }
}

export default PlayerRegisterSuccessful