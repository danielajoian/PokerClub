import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            username: this.props.match.params.name,
            email: '',
            city: '',
            password: '',
            imageLink: '',
            privateGameId: '',
            selectedFile: null,
            errors: {
                username: '',
                email: '',
                city: '',
            }
        }
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateUsername = this.validateUsername.bind(this)
        this.validateEmail= this.validateEmail.bind(this)
        this.validateCity= this.validateCity.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.addImage = this.addImage.bind(this)
    }

    componentDidMount() {
        this.refreshPlayers()
    }

    refreshPlayers() {
        let playerName = this.state.username
        PlayersDataService.retrievePlayer(playerName)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id : response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        password: response.data.password,
                        city: response.data.city,
                        imageLink: response.data.imageLink,
                        privateGameId: response.data.privateGameId,
                    })
                }
            )
    }

    onFileChange = (event) => {
        this.setState( {
            selectedFile: event.target.files[0]
        })
    }

    addImage = () => {
        const formData = new FormData();
        formData.append("file",
            this.state.selectedFile
            // this.state.selectedFile.name
        );

        console.log(this.state.selectedFile)

        PlayersDataService.addPlayerImage(this.state.id, formData)
            .then(response => {
                console.log(response)
                this.props.history.push(`/playerAccount/${this.state.username}/${this.state.id}`)
            })
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
        if (this.state.errors.username === '' &&
            this.state.errors.email === '' &&
            this.state.errors.city === ''
        ) {
                let player = {
                    email: this.state.email,
                    password: this.state.password,
                    city: this.state.city,
                    imageLink: this.state.imageLink,
                    privateGameId: this.state.privateGameId,
                }
                PlayersDataService.updatePlayer(this.state.username, this.state.id, player)
                    .then(response => {
                        console.log(response)
                        this.props.history.push(`/playerDetailsPage`)
                    })
        }else return
    }

    validateUsername= () => {
        let error = this.state.errors
        if (!this.state.username) {
            error.username = 'Required'
        } else if(this.state.username.length < 3) {
            error.username = 'Username has to have at least 3 characters'
        }else {
            error.username = ''
        }
    }

    validateEmail= () => {
        let error = this.state.errors
        if (!this.state.email) {
            error.email = 'Required'
        } else if(!(this.state.email
            .match(/[A-Za-z]+[0-9.]*@[A-Za-z]{3,}\.[A-Za-z]{2,}/))) {
            error.email = 'Email is not valid'
        }else {
            error.email = ''
        }
    }

    validateCity = () => {
        let error = this.state.errors
        if (!this.state.city) {
            error.city = 'Required'
        } else if(this.state.city.length < 3) {
            error.city = 'Username has to have at least 3 characters'
        }else {
            error.city = ''
        }
    }

    render() {
        let {id, username, email, city, imageLink} = this.state
        return (
            <div>
                <h2 className="card-header">Player Account Details</h2>
                &nbsp;


                <form onSubmit={this.handleSubmit}>
                   <img className="images"
                       src={`http://localhost:8081/${id}/playerImage/download/${imageLink}`}
                        alt="No image to show"
                   />
                    <h3>Change profile picture</h3>
                    <input type="file"
                           onChange={this.onFileChange}
                    />
                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "220px"}}
                            onClick={this.addImage}
                    >
                        Add Picture
                    </button>

                    {/*<label>UserName: </label>*/}
                    {/*<input type="text"*/}
                    {/*       name="username"*/}
                    {/*       value={username}*/}
                    {/*       onChange={this.handleChange}*/}
                    {/*       required={this.validateUsername()}*/}
                    {/*/>*/}
                    {/*{this.state.errors.username &&*/}
                    {/*<p style={{color: "red", display: "inline"}}>{this.state.errors.username}</p>}*/}
                    {/*<br/>*/}
                    <br/>

                    <label>Email: </label>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                           required={this.validateEmail()}
                    />
                    {this.state.errors.email &&
                    <p style={{color: "red", display: "inline"}}>{this.state.errors.email}</p>}
                    <br/>
                    <br/>

                    <label>City:</label>
                    <input type="text"
                           name="city"
                           value={city}
                           onChange={this.handleChange}
                           required={this.validateCity()}
                    />
                    {this.state.errors.city &&
                    <p style={{color: "red", display: "inline"}}>{this.state.errors.city}</p>}
                    <br/>
                    <br/>

                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "240px"}}
                    >
                        Submit Changes
                    </button>
                </form>
            </div>
        )
    }
}

export default PlayerAccount