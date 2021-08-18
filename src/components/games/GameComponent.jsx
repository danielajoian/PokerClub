import React, {Component} from "react";
import moment from "moment";
import {Form, Formik, Field, ErrorMessage} from 'formik';
import GameDataService from "../../api/services/GameDataService";
import AuthenticationService from "../../api/services/AuthenticationService";

class GameComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            beginDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }

        let clubName = AuthenticationService.getLoggedInClubName()
        GameDataService.retrieveGame(clubName, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                beginDate: moment(response.data.beginDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        console.log(values)
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters in description'
        }

        if (!moment(values.beginDate).isValid()) {
            errors.beginDate = 'Enter a valid begin date'
        }
        return errors
    }

    onSubmit(values) {
        console.log(values)
        let clubName = AuthenticationService.getLoggedInClubName();

        let game = {
            id: this.state.id,
            description: values.description,
            beginDate: values.beginDate
        }

        if (this.state.id === -1) {
            GameDataService.createGame(clubName, game)
                .then(() => this.props.history.push('/games'))
        } else {
            GameDataService.updateGame(clubName, this.state.id, game)
                .then(() => this.props.history.push(`/games`))
        }
    }

    render() {
        let {description, beginDate} = this.state;

        return (
            <div>
                <h3>Game Component</h3>
                <Formik
                    initialValues={{description, beginDate}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description"
                                              component="div"
                                              className="alert alert-warning"
                                />
                                <ErrorMessage name="beginDate"
                                              component="div"
                                              className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control"
                                           type="text"
                                           name="description"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Begin Date</label>
                                    <Field className="form-control"
                                           type="date"
                                           name="beginDate"
                                    />
                                </fieldset>
                                <button className="btn btn-success"
                                        type="submit"
                                        >
                                    Save
                                </button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

export default GameComponent