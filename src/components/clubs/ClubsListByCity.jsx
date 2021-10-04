import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";

class ClubsListByCity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: this.props.match.params.name,
            clubs: []
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.infoClubClicked = this.infoClubClicked.bind(this)
        this.emptyList = this.emptyList.bind(this)
    }

    componentDidMount() {
        console.log(this.state.clubs)
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
                }
            )
    }

    emptyList = () => {
        if (this.state.clubs){
            console.log('Empty list ' + this.state.clubs)
            return true;
        }else
            return false;
    }

    infoClubClicked(clubName) {
        console.log("This is the id: " + clubName)
        this.props.history.push(`/clubs/${clubName}`)
    }

    render() {
        let {clubs} = this.state
        let {city} = this.state
        // const found = this.emptyList()

        return (
            <div>
                <h3 className="card-header">List of Poker Clubs from {city}</h3>


                {/*{found &&*/}
                {/*    <h5 className="card-header">No Clubs Found in {city}!</h5>*/}
                {/*}*/}


                {clubs.map(
                    club =>
                        <div className="container col" style={{display: "inline-block"}} key={club.id}>
                            <h5 className="card-header">{club.clubUsername} Poker Club</h5>
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
                )
                }
            </div>
        )
    }
}

export default ClubsListByCity