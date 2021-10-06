import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";
import GamePrivateDataService from "../../api/services/GamePrivateDataService";

class GamePrivateDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.id,
            club: [],
            privateGame: []
        }

        this.refreshGames = this.refreshGames.bind(this)
        this.refreshClub = this.refreshClub.bind(this)
    }

    componentDidMount() {
        this.refreshClub();
        this.refreshGames();
    }

    refreshClub() {
        ClubsDataService
            .retrieveClub(this.state.club.clubUsername)
            .then(response => {
                    this.setState({club: response.data})
                }
            )
    }

    refreshGames() {
        GamePrivateDataService
            .retrievePrivateGame(this.state.club.clubUsername, this.state.gameId)
            .then(
                response => {
                    console.log(response)
                    this.setState({privateGame : response.data})
                }
            )
    }

    render() {
        return (
            <div>
                <h4 className="card-header">{this.state.privateGame.title} Game details</h4>
                <p className="card-text">{this.state.privateGame.details}</p>
            </div>
        )
    }
}

export default GamePrivateDetails