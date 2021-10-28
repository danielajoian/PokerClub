import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubForgotPasswordUsername extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubUsername: '',
            clubs: [],
            hasUsernameFailed: false
        }

        this.refreshClubs = this.refreshClubs.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.refreshClubs()
    }

    refreshClubs() {
        ClubsDataService.retrieveAllClubs()
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        clubs: response.data
                    })
                }
            )
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
        let name = this.state.clubUsername;
        console.log("Name: " + name)
        this.state.clubs.map(
            club => {
                if (name === club.clubUsername) {
                    return this.props.history.push(`/clubForgotPassword/${this.state.clubUsername}`)
                }else {
                    this.setState({
                        hasUsernameFailed: true
                    })
                }
            })
    }

    render() {
        return (
            <div className="container content-box">
                <h3 className="card-header">Enter your Username</h3>
                {this.state.hasUsernameFailed && <div className="alert alert-warning">
                    Invalid Username</div>}
                &nbsp;
                <form
                    onSubmit={this.handleSubmit}
                >
                <label>Club Name: </label>
                <input type="text"
                       name="clubUsername"
                       value={this.state.clubUsername}
                       onChange={this.handleChange}
                />
                <br/><br/>
                <button className="btn btn-success"
                        style={{width: "200px"}}
                >
                    {/*<Link to="/clubForgotPassword" className="link">*/}
                        Next Step
                    {/*</Link>*/}
                </button>
                </form>
            </div>
        )
    }
}

export default ClubForgotPasswordUsername