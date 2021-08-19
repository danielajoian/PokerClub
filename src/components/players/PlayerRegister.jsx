import React, {Component} from "react";
import {Link} from "react-router-dom";
import {ErrorMessage, Form, Formik, Field} from "formik";

class PlayerRegister extends Component {
    constructor(props) {
        super(props);

        // this.state: {
        //     username: 'fgjfj',
        //     email: 'cncgnjx',
        //     password: 'gmcg,kk'
        // }
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validate(values) {
        console.log(values)
        let error = {}
        if (!values.username) {
            error.username = 'Enter a username'
        } else if(values.username.length < 3) {
            error.username = 'Username has to have at least 3 characters'
        }

        if (!values.email) {
            error.email = 'Enter a email'
        // } else if(values.username.length < 3) {
        //     error.username = 'Username has to have at least 3 characters'
        }

        if (!values.password) {
            error.password = 'Enter a password'
        } else if(values.password.length < 4) {
            error.password = 'Password has to have at least 4 characters'
        }
        return error
    }

    onSubmit(values) {
        console.log(values)
    }

    render() {
        return (
            <div className="container content-box">
                <h3>Player Register Form</h3>
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
                            <button className="btn btn-success">
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