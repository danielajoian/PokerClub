import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubs: []
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.infoClubClicked = this.infoClubClicked.bind(this)
    }

    componentDidMount() {
        this.refreshClubs();
    }

    refreshClubs() {
        ClubsDataService.retrieveAllClubs()
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        clubs : response.data
                    })
                }
            )
    }

    infoClubClicked(clubName) {
        console.log("This is the id: " + clubName)
        this.props.history.push(`/clubs/${clubName}`)
    }

    render() {
        return (
            <div>
                <h3 className="card-header">List of Poker Clubs</h3>
                    {this.state.clubs.map(
                            club =>
                    <div className="container col" style={{display: "inline-block"}} key={club.id}>
                        <h5 className="card-header">{club.clubUsername}  Poker Club</h5>
                        <div className="card-body">
                            <h5 className="card-title">Country: {club.country}</h5>
                            <h5>City: {club.city}</h5>
                            <p className="card-text">Address: {club.address}</p>
                            <p className="card-text">Phone: {club.phoneNumber}</p>
                            <button className="btn btn-success btn-primary"
                                onClick={() => this.infoClubClicked(club.clubUsername)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                                )}
            </div>
        )
    }
}

export default ClubsList