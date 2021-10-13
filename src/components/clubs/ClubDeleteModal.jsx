import React, {Component} from "react";
import "../../modalStyle.css"
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import {Link} from "react-router-dom";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            clubUsername: ''
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.refreshClubs = this.refreshClubs.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
    }

    componentDidMount() {
        this.refreshClubs()
    }

    refreshClubs() {
        let clubName = AuthenticationServiceJwt.getLoggedInClubName()
        ClubsDataService.retrieveClub(clubName)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id : response.data.id,
                        clubUsername: response.data.clubUsername
                    })
                }
            )
    }

    deleteAccount(id) {
        let clubName = this.state.clubUsername
        console.log(id + " " + clubName);
        // if(window.confirm('Are you sure you want to delete this account?')) {
            ClubsDataService.deleteClub(clubName, id)
                .then(response => {
                    console.log(response)
                })
        // }
    }

    handleCancel = () => {
        this.props.history.push(`/clubDetailsPage`)
    }

    render() {

        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button className="btn btn-success"
                                style={{backgroundColor: "white"}}
                                onClick={this.handleCancel}>
                            X
                        </button>
                    </div>
                    <div className="title">
                        <p>Delete Account</p>
                    </div>
                    <div className="body">
                        <p>Are you sure you want to delete this account?</p>
                    </div>
                    <div className="footer">
                        <button className="btn btn-success"
                                onClick={this.handleCancel}>
                            No
                        </button>
                        <button className="btn btn-warning" id="cancelBtn"
                                onClick={() => this.deleteAccount(this.state.id)}
                        >
                            <Link to="/clubDeletedSuccessful" className="link">
                                Yes
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubDeleteModal