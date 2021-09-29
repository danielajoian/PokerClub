import React, {Component} from "react";
import moment from "moment";
import {Form, Formik, Field, ErrorMessage} from 'formik';
import GameDataService from "../../api/services/GameDataService";
import AuthenticationServiceJwt from "../../api/services/AuthenticationServiceJwt";

class GameComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            details: '',
            beginDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }

        let clubName = AuthenticationServiceJwt.getLoggedInClubName()
        GameDataService.retrieveGame(clubName, this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                details: response.data.details,
                beginDate: moment(response.data.beginDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        console.log(values)
        let errors = {}
        if (!values.title) {
            errors.title = 'Enter a Title'
        } else if (values.title.length < 5) {
            errors.title = 'Enter at least 5 characters in the title'
        } else if (values.title.length > 25) {
            errors.title = 'The title has too many characters!'
        }

        if (!values.details) {
            errors.details = 'Enter details about the game'
        } else if (values.details.length < 5) {
            errors.details = 'Enter at least 15 characters for details'
        }

        if (!moment(values.beginDate).isValid()) {
            errors.beginDate = 'Enter a valid begin date'
        }
        return errors
    }

    onSubmit(values) {
        console.log(values)
        let clubName = AuthenticationServiceJwt.getLoggedInClubName();

        let game = {
            id: this.state.id,
            title: values.title,
            details: values.details,
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
        let {title, details, beginDate} = this.state;

        return (
            <div>
                <h3>Game Component</h3>
                <Formik
                    initialValues={{title, details, beginDate}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="title"
                                              component="div"
                                              className="alert alert-warning"
                                />
                                <ErrorMessage name="details"
                                              component="div"
                                              className="alert alert-warning"
                                />
                                <ErrorMessage name="beginDate"
                                              component="div"
                                              className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field className="form-control"
                                           type="text"
                                           name="title"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Details</label>
                                    <Field className="form-control"
                                           type="text-area"
                                           name="details"
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