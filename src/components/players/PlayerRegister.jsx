import React, {Component} from "react";
// import {ErrorMessage, Form, Formik, Field} from "formik";
import PlayersDataService from "../../api/services/PlayersDataService";

class PlayerRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // id: this.props.match.params.id,
            // id: -1,
            username: '',
            email: '',
            password: ''
        }
        // this.validate = this.validate.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount() {
    //     this.handleSubmit();
    // }

    // componentDidMount() {
        // console.log("component did mount")
        // if (this.state.id !== null) {
        //     return
        // }
        //
        // this.onSubmit(this.values);

        // PlayersDataService.createPlayer(this.state.username)
        //     .then(response => this.setState({
        //         username: response.data.username,
        //         email: response.data.email,
        //         password: response.data.password
        //     }))

    // }

    // validate(values) {
    //     console.log("Validate " + values)
    //     let error = {}
    //     if (!this.state.username) {
    //         error.username = 'Enter a username'
    //     } else if(this.state.username.length < 3) {
    //         error.username = 'Username has to have at least 3 characters'
    //     }
    //
    //     if (!this.state.email) {
    //         error.email = 'Enter a email'
    //         // } else if(values.username.length < 3) {
    //         //     error.username = 'Username has to have at least 3 characters'
    //     }
    //
    //     if (!this.state.password) {
    //         error.password = 'Enter a password'
    //     } else if(this.state.password.length < 4) {
    //         error.password = 'Password has to have at least 4 characters'
    //     }
    //     return error
    // }

    // onSubmit(values) {
    //     console.log("on submit" + values)
    //
    //     let player = {
    //         username: values.username,
    //         email: values.email,
    //         password: values.password
    //     }
    //
    //     // if (this.state.id === -1) {
    //         PlayersDataService.createPlayer(player.username)
    //             // .then(() => this.props.history.push(`/registerSuccessful`))
    //             .then(() => console.log(player))
    //     // }
    // }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let player = {
            email: this.state.email,
            password: this.state.password
        }
        PlayersDataService.createPlayer(this.state.username, player)
            .then(response => {
                console.log(response)
                this.props.history.push(`/registerSuccessful`)
            })
    }

    render() {
        let {username, email, password} = this.state

        return (
            <div className="container content-box">
                <h3>Player Register Form</h3>
                &nbsp;
                <form onSubmit={this.handleSubmit}>
                    <label>UserName: </label>
                    <input type="text"
                           name="username"
                           value={username}
                           onChange={this.handleChange}
                    />
                    <br/>
                    <label>Email: </label>
                    <input type="email"
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

                    <button className="btn btn-success"
                            type="submit"
                            // onClick={this.loginClicked}
                            // onClick={this.handleSubmit}
                    >
                        Register
                    </button>
                </form>
                {/*<Formik initialValues={{}}*/}
                {/*        onSubmit={this.onSubmit}*/}
                {/*        validate={this.validate}*/}
                {/*        validateOnChange={true}*/}
                {/*        validateOnBlur={true}*/}
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
                {/*                       name="username"/>*/}

                {/*            </fieldset>*/}
                {/*            <fieldset className="form-group">*/}
                {/*                <label>Email: </label>*/}
                {/*                <Field className="form-control"*/}
                {/*                       type="email"*/}
                {/*                       name="email"/>*/}
                {/*            </fieldset>*/}
                {/*            <fieldset className="form-group">*/}
                {/*                <label>Password: </label>*/}
                {/*                <Field className="form-control"*/}
                {/*                       type="password"*/}
                {/*                       name="password"/>*/}
                {/*            </fieldset>*/}
                {/*            <button className="btn btn-success"*/}
                {/*                    type="submit">*/}
                {/*                /!*<Link to="/registerSuccessful" className="link">*!/*/}
                {/*                    Register*/}
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

export default PlayerRegister
