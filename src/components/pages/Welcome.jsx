import React, {Component} from "react";
import HelloWorldService from "../../api/services/WelcomeDataService";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage: ''
        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.retrieveWelcomeMessage();
    }

    retrieveWelcomeMessage() {
        console.log('retrieve message');
        /*HelloWorldService.executeHelloWorldService()
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error));*/

        // HelloWorldService.executeHelloBeanService(this.props.match.params.name)
        //     .then(response => this.handleSuccessfulResponse(response))
        //
        //
        // HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        //     .then(response => this.handleSuccessfulResponse(response))
        //     .catch(error => this.handleError(error))

        HelloWorldService.executeHelloBeanService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({
            welcomeMessage: response.data.message
        })
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = '';

        if (error.message) {
            errorMessage += error.message;
        }

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message()
        }
        this.setState({
            welcomeMessage: errorMessage
        })
    }

    render() {
        return (
            <div className="container content-box">
                <h3 className="card-header">Welcome to PokerApp, {this.props.match.params.name}!</h3>
                &nbsp;
                {/*<h6>Click here to get a customized welcome message</h6>*/}
                {/*<button onClick={this.retrieveWelcomeMessage}*/}
                {/*        className="btn btn-success">*/}
                {/*    Get Welcome Message*/}
                {/*</button>*/}
                <h4>{this.state.welcomeMessage}</h4>
            </div>
        )
    }
}

export default Welcome