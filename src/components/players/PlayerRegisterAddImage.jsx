import React, {Component} from "react";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerRegisterAddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.name,
            id: '',
            imageLink: '',
            selectedFile: null
        }

        this.refreshPlayer = this.refreshPlayer.bind(this)
        this.addImage = this.addImage.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.fileData = this.fileData.bind(this)
    }

    componentDidMount() {
        this.refreshPlayer();
    }

    refreshPlayer() {
        let playerName = this.state.username;
        PlayersDataService.retrievePlayer(playerName)
            .then(response => (
                this.setState( {
                    id: response.data.id
                })
            ))
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
                this.props.history.push(`/registerSuccessful`)
            })
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>

                    <p>File Type: {this.state.selectedFile.type}</p>

                    <p>
                        Last Modified: { " "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose a image before pressing the upload button</h4>
                </div>
            )
        }
    }

    render() {

        return (
            <div className="container row">
                <h3>Add a profile picture</h3>
                <input type="file"
                       onChange={this.onFileChange}
                />
                <button className="btn btn-success"
                        type="submit"
                        onClick={this.addImage}
                >
                    Add Picture
                </button>

                {this.fileData()}
            </div>
        )
    }
}

export default PlayerRegisterAddImage