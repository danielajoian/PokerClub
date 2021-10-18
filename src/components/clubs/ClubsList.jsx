import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import SearchBar from "../pages/SearchBar";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";
import PlayersDataService from "../../api/services/PlayersDataService";
import {logDOM} from "@testing-library/react";

class ClubsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            clubs: [],
            players: []
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.infoClubClicked = this.infoClubClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCity = this.handleCity.bind(this)
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

    handleCity = () => {
        let player = AuthenticationServiceJwt.getLoggedInUserName()
        PlayersDataService.retrievePlayer(player)
            .then(response => {
                console.log('player city: ' + response.data.city)
                this.setState({
                    players: response.data
                })
                    this.props.history.push(`/clubsListByCity/${response.data.city}`)
            } )

    }

    render() {
        const isUserLoggedIn = AuthenticationServiceJwt.isUserLoggedIn();
        let {search} = this.state
        let {clubs} = this.state

        return (
            <div
                className="container col"
            >
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

                {isUserLoggedIn &&
                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "300px"}}
                            onClick={this.handleCity}
                    >
                        Show Clubs in my City
                    </button>
                }


                <h3 className="card-header">List of Poker Clubs</h3>
                {clubs.filter((club) => {
                    if (search === '') {
                        return clubs.map(
                            club =>
                                <div className="row"
                                     // style={{display: "block"}}
                                     key={club.id}>
                                    <div className="card-body col">
                                        <img className="card-body col images"
                                             src={`http://localhost:8081/${club.id}/clubImage/download/${club.imageLink}`}
                                             alt="No image to show"
                                        />
                                        {/*<br/><br/><br/><br/><br/>*/}
                                        {/*<br/><br/><br/><br/><br/>*/}
                                        <h5 className="card-header">{club.clubUsername}  Poker Club</h5>
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
                                    {/*<div className="col">*/}

                                    </div>
                                </div>
                        )
                    }else if (club.city.toLowerCase().includes(search.toLowerCase()) ||
                        club.country.toLowerCase().includes(search.toLowerCase()) ||
                        club.clubUsername.toLowerCase().includes(search.toLowerCase())) {
                        return club
                    }
                })
                    .map((club, key) => {
                    return (
                        <div key={key} className="container row"
                             // style={{display: "block"}}
                        >
                            <div className="card-body col">
                                <img className="card-body col images"
                                     src={`http://localhost:8081/${club.id}/clubImage/download/${club.imageLink}`}
                                     alt="No image to show"
                                />

                                <h5 className="card-header">{club.clubUsername}  Poker Club</h5>
                                <h5>Country: {club.country}</h5>
                                <h5>City: {club.city}</h5>
                                <p className="card-text">Address: {club.address}</p>
                                <p className="card-text">Phone: {club.phoneNumber}</p>
                                <button className="btn btn-success btn-primary"
                                        onClick={() => this.infoClubClicked(club.clubUsername)}
                                >
                                    Details
                                </button>
                            {/*</div>*/}
                            {/*<div className="col">*/}

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