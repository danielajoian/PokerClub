import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import GameDataService from "../../api/services/GameDataService";
import moment from "moment";

class ClubInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clubUsername: this.props.match.params.name,
            club: [],
            games: []
        }

        this.refreshGames = this.refreshGames.bind(this)
        this.refreshClub = this.refreshClub.bind(this)
    }

    componentDidMount() {
        this.refreshClub();
        this.refreshGames();
    }

    refreshClub() {
        ClubsDataService.retrieveClub(this.state.clubUsername)
            .then(response => {
                this.setState({club: response.data})
            }
        )
    }

    refreshGames() {
        // this.refreshClub()
        GameDataService.retrieveAllGames(this.state.clubUsername)
            .then(
                response => {
                    console.log(response)
                    this.setState({games : response.data})
                }
            )
    }


    infoGameClicked(id) {
        // this.refreshClubs();
        console.log("This is the id: " + id)
        this.props.history.push(`/games/${id}/details`)
    }


    render() {
        return (
            <div>
                <div className="container">
                    <h4 className="card-header">Club {this.state.clubUsername} Info</h4>
                    <div className="card-body">
                        <h5 className="card-title">Country: {this.state.club.country}</h5>
                        <h5 className="card-title">City: {this.state.club.city}</h5>
                        <p className="card-text">Address: {this.state.club.address}</p>
                        <p className="card-text">Phone: {this.state.club.phoneNumber}</p>
                        <p className="card-text">Site: {this.state.club.site}</p>
                            <h5>Games: </h5>
                        <table className="table" >
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Begin Date</th>
                                <th>Has Ended?</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.games.map(
                                game =>
                                <tr key={game.id}>
                                    <td>{game.title}</td>
                                    <td>{moment(game.beginDate).format('YYYY-MM-DD')}</td>
                                    <td>{game.hasEnded.toString()}</td>
                                    <td>
                                        <button className="btn btn-success btn-primary"
                                                onClick={() => this.infoGameClicked(game.id)}
                                        >
                                            Details
                                        </button>
                                    </td>

                                </tr>


                        )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

export default ClubInfo