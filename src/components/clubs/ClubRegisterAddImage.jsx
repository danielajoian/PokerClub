import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubRegisterAddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clubUsername: this.props.match.params.name,
            id: '',
            imageLink: '',
            selectedFile: null
        }

        this.refreshClub = this.refreshClub.bind(this)
        this.addImage = this.addImage.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.fileData = this.fileData.bind(this)
    }

    componentDidMount() {
        this.refreshClub();
    }

    refreshClub() {
        let clubName = this.state.clubUsername;
        ClubsDataService.retrieveClub(clubName)
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

        ClubsDataService.addClubImage(this.state.id, formData)
            .then(response => {
                console.log(response)
                this.props.history.push(`/clubRegisterSuccessful`)
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
                    <h5>Choose a image before pressing the upload button</h5>
                </div>
            )
        }
    }

    render() {

        return (
            <div
                // className="container"
            >
                <h2>Add a profile picture</h2>
                <input type="file"
                       onChange={this.onFileChange}
                />
                <br/><br/>
                <button className="btn btn-success"
                        style={{width: "200px"}}
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

export default ClubRegisterAddImage