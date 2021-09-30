import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import SearchBar from "../pages/SearchBar";

class ClubsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            clubs: []
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.infoClubClicked = this.infoClubClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState(
            {
                search: event.target.value
            }
        )
    }

    render() {
        let {search} = this.state
        let {clubs} = this.state

        return (
            <div>
                <input className="content-box"
                       style={{width: "200px", height: "50px", padding: "10px"}}
                       placeholder="Search for clubs..."
                       type="search"
                       name="search"
                       value={search}
                       onChange={this.handleChange}
                />
                <br/>
                <br/>
                <br/>

                <h3 className="card-header">List of Poker Clubs</h3>
                {clubs.filter((club) => {
                    if (search === '') {
                        return clubs.map(
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
                        )
                    }else if (club.city.toLowerCase().includes(search.toLowerCase()) ||
                        club.country.toLowerCase().includes(search.toLowerCase()) ||
                        club.clubUsername.toLowerCase().includes(search.toLowerCase())) {
                        return club
                    }
                }).map((club, key) => {
                    return (
                        <div key={key} className="container col" style={{display: "inline-block"}}>
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
                    )
                })
                }
            </div>
        )
    }
}

export default ClubsList