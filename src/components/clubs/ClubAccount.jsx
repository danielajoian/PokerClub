import React, {Component} from "react";
// import {ErrorMessage, Field, Form, Formik} from "formik";
// import {Link} from "react-router-dom";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            clubUsername: this.props.match.params.name,
            password: '',
            city: '',
            country: '',
            address: '',
            email: '',
            site: '',
            phoneNumber: ''
        }

        // this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshClubs = this.refreshClubs.bind(this)
    }

    componentDidMount() {
        this.refreshClubs()
    }

    refreshClubs() {
        let clubName = this.state.clubUsername
        ClubsDataService.retrieveClub(clubName)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id : response.data.id,
                        clubUsername: response.data.clubUsername,
                        password: response.data.password,
                        city: response.data.city,
                        country: response.data.country,
                        address: response.data.address,
                        email: response.data.email,
                        site: response.data.site,
                        phoneNumber: response.data.phoneNumber
                    })
                }
            )
    }

    // validate(values) {
    //     console.log(values)
    //     let error = {}
    //     if (!values.clubUsername) {
    //         error.clubUsername = 'Enter a username'
    //     } else if(values.clubUsername.length < 3) {
    //         error.clubUsername = 'Username has to have at least 3 characters'
    //     }
    //
    //     if (!values.email) {
    //         error.email = 'Enter a email'
    //         // } else if(values.username.length < 3) {
    //         //     error.username = 'Username has to have at least 3 characters'
    //     }
    //
    //     if (!values.password) {
    //         error.password = 'Enter a password'
    //     } else if(values.password.length < 4) {
    //         error.password = 'Password has to have at least 4 characters'
    //     }
    //     return error
    // }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let club = {
            password: this.state.password,
            city: this.state.city,
            country: this.state.country,
            address: this.state.address,
            email: this.state.email,
            site: this.state.site,
            phoneNumber: this.state.phoneNumber
        }
        ClubsDataService.updateClub(this.state.clubUsername, this.state.id, club)
            .then(response => {
                console.log(response)
                this.props.history.push(`/`)
            })
    }

    render() {
        let {clubUsername,
            password,
            city,
            country,
            address,
            email,
            site,
            phoneNumber} = this.state

        return (
            <div>
                <h2>Club Account Details</h2>
                &nbsp;

                <form onSubmit={this.handleSubmit}>
                    <label>Club Name: </label>
                    <input type="text"
                           name="clubUsername"
                           value={clubUsername}
                           onChange={this.handleChange}
                    />

                    <label>City: </label>
                    <input type="text"
                           name="city"
                           value={city}
                           onChange={this.handleChange}
                    />
                    <label>Country: </label>
                    <input type="text"
                           name="country"
                           value={country}
                           onChange={this.handleChange}
                    />

                    <label>Site Address: </label>
                    <input type="text"
                           name="site"
                           value={site}
                           onChange={this.handleChange}
                    />

                    <label>Address: </label>
                    <input type="text"
                           name="address"
                           value={address}
                           onChange={this.handleChange}
                    />

                    <label>Phone Number: </label>
                    <input type="number"
                           name="phoneNumber"
                           value={phoneNumber}
                           onChange={this.handleChange}
                    />

                    <label>Email: </label>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                    />

                    <label>Password: </label>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={this.handleChange}
                    />
                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "220px"}}
                            // onClick={this.validate}
                    >
                        {/*<Link to="/clubRegisterSuccessful" className="link">*/}
                        Submit Changes
                        {/*</Link>*/}
                    </button>
                </form>

                {/*<Formik initialValues={{username}}*/}
                {/*        onSubmit={this.onSubmit}*/}
                {/*        validate={this.validate}*/}
                {/*        validateOnBlur={true}*/}
                {/*        validateOnChange={true}*/}
                {/*        enableReinitialize={true}*/}
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
                {/*                    style={{width: "220px"}}>*/}
                {/*                <Link to="/" className="link">*/}
                {/*                    Submit Changes*/}
                {/*                </Link>*/}
                {/*            </button>*/}
                {/*        </Form>*/}
                {/*    )*/}
                {/*}*/}
                {/*</Formik>*/}
            </div>
        )
    }
}

export default ClubAccount