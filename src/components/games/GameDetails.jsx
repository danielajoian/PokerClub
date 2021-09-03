import React, {Component} from "react";
import GameDataService from "../../api/services/GameDataService";
import ClubsDataService from "../../api/services/ClubsDataService";

class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.id,
            club: [],
            game: []
        }

        this.refreshGames = this.refreshGames.bind(this)
        this.refreshClub = this.refreshClub.bind(this)
    }

    componentDidMount() {
        this.refreshClub();
        this.refreshGames();
    }

    refreshClub() {
        ClubsDataService.retrieveClub(this.state.club.clubUsername)
            .then(response => {
                    this.setState({club: response.data})
                }
            )
    }

    refreshGames() {
        GameDataService.retrieveGame(this.state.club.clubUsername, this.state.gameId)
            .then(
                response => {
                    console.log(response)
                    this.setState({game : response.data})
                }
            )
    }
    render() {
        return (
            <div>
                <h4 className="card-header">{this.state.game.title} Game details</h4>
                <p className="card-text">{this.state.game.details}</p>
            </div>
        )
    }
}

export default GameDetails