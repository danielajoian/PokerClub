import React, {Component} from "react";
import {Link} from "react-router-dom";

class PlayerPage extends Component {
    render() {
        return (
            <div>
                <h3 className="card-header">Welcome to the Players Page!</h3>
                &nbsp;
                <h6>If you have an account, then
                    <button className="btn btn-success">
                        <Link to="/playerLogin" className="link">
                            Login
                        </Link>
                    </button>
                </h6>
                &nbsp;
                <h6>If you don't, you can
                    <button className="btn btn-success">
                        <Link to="/playerRegister" className="link">
                            Register
                        </Link>
                    </button>
                </h6>
                &nbsp;
                <h6>Or maybe you just want to be a guest and watch the list of
                    <button className="btn btn-success">
                        <Link to="/clubs" className="link">
                            Clubs
                        </Link>
                    </button>
                </h6>
            </div>
        )
    }
}

export default PlayerPage