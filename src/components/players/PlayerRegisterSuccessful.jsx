import React, {Component} from "react";

class PlayerRegisterSuccessful extends Component {
    render() {
        return (
            <div className="container content-box">
                <h4 className="card-header">Player was registered!</h4>
                &nbsp;
                <img
                    style={{maxWidth: "300px"}}
                    src="/great.gif"
                    alt="Success"/>
            </div>
        )
    }
}

export default PlayerRegisterSuccessful