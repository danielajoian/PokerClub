import React, {Component} from "react";
import {Link} from "react-router-dom";
import {ErrorMessage, Form, Formik, Field} from "formik";

class PlayerRegister extends Component {
    constructor(props) {
        super(props);

        // this.state: {
        //     id: this.props.match.params.id,
        //     username: '',
        //     email: '',
        //     password: ''
        // }
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // componentDidMount() {
    //     if (this.state.id !== null) {
    //         return
    //     }
    //
    //     PlayersDataService.retrievePlayer(this.state.username)
    //         .then(() => this.setState({
    //             username: this.state.username,
    //             email: this.state.email,
    //             password: this.state.password
    //         }))
    // }

    validate(values) {
        console.log(values)
        // let error = {}
        // if (!this.state.username) {
        //     error.username = 'Enter a username'
        // } else if(this.state.username.length < 3) {
        //     error.username = 'Username has to have at least 3 characters'
        // }
        //
        // if (!this.state.email) {
        //     error.email = 'Enter a email'
        //     // } else if(values.username.length < 3) {
        //     //     error.username = 'Username has to have at least 3 characters'
        // }
        //
        // if (!this.state.password) {
        //     error.password = 'Enter a password'
        // } else if(this.state.password.length < 4) {
        //     error.password = 'Password has to have at least 4 characters'
        // }
        // return error
    }

    onSubmit(values) {
        console.log(values)
        //
        // let player = {
        //     username: values.username,
        //     email: values.email,
        //     password: values.password
        // }

        // if (this.state.id === -1) {
        //     PlayersDataService.createPlayer(this.state.username)
        //         .then(() => this.props.history.push(`/registerSuccessful`))
        // }
    }

    render() {
        // let {username, email, password} = this.state

        return (
            <div className="container content-box">
                <h3>Player Register Form</h3>
                &nbsp;
                <Formik initialValues={{}}
                        validate={this.validate}
                        onSubmit={this.onSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                >{
                    (props) => (
                        <Form>
                            <ErrorMessage name="username"
                                          component="div"
                                          className="alert alert-warning"
                            />
                            <ErrorMessage name="email"
                                          component="div"
                                          className="alert alert-warning"
                            />
                            <ErrorMessage name="password"
                                          component="div"
                                          className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Name: </label>
                                <Field className="form-control"
                                       type="text"
                                       name="username"/>

                            </fieldset>
                            <fieldset className="form-group">
                                <label>Email: </label>
                                <Field className="form-control"
                                       type="email"
                                       name="email"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Password: </label>
                                <Field className="form-control"
                                       type="password"
                                       name="password"/>
                            </fieldset>
                            <button className="btn btn-success"
                                    type="submit">
                                <Link to="/registerSuccessful" className="link">
                                    Register
                                </Link>
                            </button>
                        </Form>
                    )
                }
                </Formik>
            </div>
        )
    }
}

export default PlayerRegister
