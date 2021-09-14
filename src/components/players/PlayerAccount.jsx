import React, {Component} from "react";
// import {ErrorMessage, Field, Form, Formik} from 'formik';
// import {Link} from "react-router-dom";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            username: this.props.match.params.name,
            email: '',
            password: ''
        }

        this.validate = this.validate.bind(this)
        this.refreshPlayers = this.refreshPlayers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                        password: response.data.password
                    })
                }
            )
    }

    validate(values) {
        console.log(values)
        // this.handleChange(values)
        let error = {}
        if (!values.username) {
            error.username = 'Enter a username'
        } else if(values.username.length < 3) {
            error.username = 'Username has to have at least 3 characters'
        }

        if (!values.email) {
            error.email = 'Enter a email'
        }

        if (!values.password) {
            error.password = 'Enter a password'
        } else if(values.password.length < 4) {
            error.password = 'Password has to have at least 4 characters'
        }
        return error
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
        let player = {
            email: this.state.email,
            password: this.state.password
        }
        PlayersDataService.updatePlayer(this.state.username, this.state.id, player)
            .then(response => {
                console.log(response)
                this.props.history.push(`/`)
            })
    }

    render() {
        let {username, email, password} = this.state
        return (
            <div>
                <h2>Player Account Details</h2>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                    <label>UserName: </label>
                    <input type="text"
                           name="username"
                           value={username}
                           onChange={this.handleChange}
                    />
                    <label>Email: </label>
                    <input type="text"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                    />
                    <br/>
                    <label>Password: </label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={this.handleChange}
                    />
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "220px"}}
                            onClick={this.validate}
                    >
                        Submit Changes
                    </button>
                </form>

                {/*<Formik initialValues={{username, email, password}}*/}
                {/*        onSubmit={this.handleSubmit}*/}
                {/*        validate={this.validate}*/}
                {/*        validateOnBlur={false}*/}
                {/*        validateOnChange={true}*/}
                {/*        enableReinitialize={false}*/}
                {/*>{*/}
                {/*    (props) => (*/}
                {/*        <Form>*/}
                {/*            <ErrorMessage name="username"*/}
                {/*                          component="div"*/}
                {/*                          className="alert alert-warning"*/}
                {/*            />*/}
                {/*            <ErrorMessage name="email"*/}
                {/*                          component="div"*/}
                {/*                          className="alert alert-warning"*/}
                {/*            />*/}
                {/*            <ErrorMessage name="password"*/}
                {/*                          component="div"*/}
                {/*                          className="alert alert-warning"*/}
                {/*            />*/}

                {/*            <fieldset className="form-group">*/}
                {/*                <label>Name: </label>*/}
                {/*                <Field className="form-control"*/}
                {/*                       type="text"*/}
                {/*                       name="username"*/}
                {/*                       // value={username}*/}
                {/*                       // onChange={this.handleChange}*/}
                {/*                />*/}

                {/*            </fieldset>*/}
                {/*            <fieldset className="form-group">*/}
                {/*                <label>Email: </label>*/}
                {/*                <Field className="form-control"*/}
                {/*                       type="email"*/}
                {/*                       name="email"*/}
                {/*                       // value={email}*/}
                {/*                       // onChange={this.handleChange}*/}
                {/*                />*/}
                {/*            </fieldset>*/}
                {/*            <fieldset className="form-group">*/}
                {/*                <label>Password: </label>*/}
                {/*                <Field className="form-control"*/}
                {/*                       type="password"*/}
                {/*                       name="password"*/}
                {/*                       // value={password}*/}
                {/*                       // onChange={this.handleChange}*/}
                {/*                />*/}
                {/*            </fieldset>*/}
                {/*            <button className="btn btn-success"*/}
                {/*                    style={{width: "220px"}}>*/}
                {/*                /!*<Link to="/" className="link">*!/*/}
                {/*                    Submit Changes*/}
                {/*                /!*</Link>*!/*/}
                {/*            </button>*/}
                {/*        </Form>*/}
                {/*    )*/}
                {/*}*/}
                {/*</Formik>*/}
            </div>
        )
    }
}

export default PlayerAccount