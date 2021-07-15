import React, {Component} from "react";

class ClubRegisterSuccessful extends Component {
    render() {
        return (
            <div className="container content-box">
                <h4>Your club was registered!</h4>
                <img style={{maxWidth: "200px"}}
                    src="/success.png"
                    alt="club success"
                />
            </div>
        )
    }
}

export default ClubRegisterSuccessful