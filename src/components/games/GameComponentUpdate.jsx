import React, {Component} from "react";
import moment from "moment";
import GameDataService from "../../api/services/GameDataService";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

class GameComponentUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            details: '',
            beginDate: moment(new Date()).format('YYYY-MM-DD'),
            errors: {
                id: '',
                title: '',
                details: '',
                beginDate: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshGames = this.refreshGames.bind(this)
        this.validateTitle = this.validateTitle.bind(this)
        this.validateDetails = this.validateDetails.bind(this)
        this.validateDate = this.validateDate.bind(this)
    }

    componentDidMount() {
        this.refreshGames()
    }

    refreshGames() {
        let clubName = AuthenticationServiceJwt.getLoggedInClubName()
        GameDataService.retrieveGame(clubName, this.state.id)
            .then(response =>
                this.setState({
                    title: response.data.title,
                    details: response.data.details,
                    beginDate: moment(response.data.beginDate).format('YYYY-MM-DD')
                }))
    }

    validateTitle = () => {
        let error = this.state.errors
        if (!this.state.title) {
            error.title = 'Required'
        } else if (this.state.title.length < 5) {
            error.title = 'Enter at least 5 characters in the title'
        } else if (this.state.title.length > 25) {
            error.title = 'The title has too many characters!'
        }else {
            error.title = ''
        }
    }

    validateDetails = () => {
        let error = this.state.errors
        if (!this.state.details) {
            error.details = 'Required'
        } else if (this.state.details.length < 5) {
            error.details = 'Enter at least 15 characters for details'
        } else {
            error.details = ''
        }
    }

    validateDate = () => {
        let error = this.state.errors
        if (!moment(this.state.beginDate).isValid()) {
            error.beginDate = 'Enter a valid begin date'
        }else {
            error.beginDate = ''
        }
    }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let clubUsername = AuthenticationServiceJwt.getLoggedInClubName();
        if (this.state.errors.title === '' &&
            this.state.errors.details === '' &&
            this.state.errors.beginDate === '') {
            let game = {
                // id: this.state.id,
                title: this.state.title,
                details: this.state.details,
                beginDate: this.state.beginDate
            }
            if(this.state.id !== -1){
                    GameDataService.updateGame(clubUsername, this.state.id, game)
                        .then(() => this.props.history.push(`/games`))
            }
        }else return
    }

    render() {
        let {title, details, beginDate} = this.state;

        return (
            <div>
                <h3 className="card-header">Game Component</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input type="text"
                           name="title"
                           value={title}
                           onChange={this.handleChange}
                           required={this.validateTitle()}
                    />

                    {this.state.errors.title &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.title}</p>}
                    <br/>

                    <label>Details</label>
                    <textarea placeholder="Type your description here..."
                              name="details"
                              value={details}
                              onChange={this.handleChange}
                              required={this.validateDetails()}
                    />

                    {this.state.errors.details &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.details}</p>}
                    <br/>

                    <label>Begin Date</label>
                    <input type="date"
                           name="beginDate"
                           value={beginDate}
                           onChange={this.handleChange}
                           required={this.validateDate()}
                    />
                    {this.state.errors.beginDate &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.beginDate}</p>}
                    <br/>
                    <br/>

                    <button className="btn btn-success"
                            type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default GameComponentUpdate