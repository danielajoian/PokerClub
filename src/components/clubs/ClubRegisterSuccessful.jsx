import React, {Component} from "react";

class ClubRegisterSuccessful extends Component {
    render() {
        return (
            <div className="container content-box">
                <h4 className="card-header">Your club was registered!</h4>
                &nbsp;
                <img style={{maxWidth: "200px"}}
                    src="/success.png"
                    alt="club success"
                />
            </div>
        )
    }
}

export default ClubRegisterSuccessful