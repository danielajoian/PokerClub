import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";

class ClubsListByCity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: this.props.match.params.name,
            clubs: [],
            isEmpty: true
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.infoClubClicked = this.infoClubClicked.bind(this)
    }

    componentDidMount() {
        console.log(this.state.clubs)
        console.log(this.state.isEmpty)
        this.refreshClubs();
    }

    refreshClubs() {
        ClubsDataService.retrieveClubByCity(this.state.city)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        clubs : response.data
                    })
                    if (response.data.length !== 0) {
                        this.setState({isEmpty: false})                    }
                }
            )
    }

    infoClubClicked(clubName) {
        console.log("This is the id: " + clubName)
        this.props.history.push(`/clubs/${clubName}`)
    }

    render() {
        let {clubs} = this.state
        let {city} = this.state
        let {isEmpty} = this.state

        return (
            <div className="container col">
                {!isEmpty &&
                    <h3 className="card-header">List of Poker Clubs from {city}</h3>}

                {isEmpty &&
                    <h5 className="card-header">No Clubs Found in {city}!</h5>
                }


                {clubs.map(
                    club =>
                        <div className="row"
                             // style={{display: "inline-block"}}
                             key={club.id}>

                            <div className="card-body col">
                                <img className="card-body col images"
                                     src={`http://localhost:8081/${club.id}/clubImage/download/${club.imageLink}`}
                                     alt="No image to show"
                                />
                                {/*<br/><br/><br/><br/><br/>*/}
                                {/*<br/><br/><br/><br/><br/>*/}

                                <h5 className="card-header">{club.clubUsername} Poker Club</h5>
                                <h5 className="card-title">Country: {club.country}</h5>
                                <h5>City: {club.city}</h5>
                                <p className="card-text">Address: {club.address}</p>
                                <p className="card-text">Phone: {club.phoneNumber}</p>
                                <button className="btn btn-success btn-primary"
                                        onClick={() => this.infoClubClicked(club.clubUsername)}
                                >
                                    Details
                                </button>
                            {/*</div>*/}
                            {/*<div className="card-body col">*/}

                            </div>
                        </div>
                )
                }
            </div>
        )
    }
}

export default ClubsListByCity