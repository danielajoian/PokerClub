import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            clubUsername: ''
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.handleClick = this.handleClick.bind(this)
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
        if(window.confirm('Are you sure you want to delete this account?')) {
            ClubsDataService.deleteClub(clubName, id)
                .then(response => {
                    console.log(response)
                })
            AuthenticationServiceJwt.logout();
        }
    }

    handleClick = () => {
        this.props.history.push(`/clubAccount/${this.state.clubUsername}/${this.state.id}`)
    }

    render() {
        let {id} = this.state

        return (
            <div>
                <h4>Welcome to your page, {sessionStorage.getItem('authenticatedClub')}!</h4>
                &nbsp;
                <button className="btn btn-success"
                        style={{width: "200px"}}>
                    <Link to="/games" className="link">
                        Add Games
                    </Link>
                </button>
                &nbsp;
                <button className="btn btn-success"
                        onClick={this.handleClick}
                        style={{width: "200px"}}>
                    Change Details
                </button>
                &nbsp;
                <button className="btn btn-warning"
                        type="submit"
                        style={{width: "200px"}}
                        onClick={() => this.deleteAccount(id)}
                >
                    <Link to="/" className="link">
                        Delete Account
                    </Link>
                </button>
            </div>
        )
    }
}

export default ClubDetailsPage