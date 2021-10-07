import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";

class ClubAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            clubUsername: this.props.match.params.name,
            email: '',
            password: '',
            city: '',
            country: '',
            address: '',
            site: '',
            phoneNumber: '',
            errors: {
                clubUsername: '',
                // password: '',
                // confirmPassword: '',
                city: '',
                country: '',
                address: '',
                email: '',
                site: '',
                phoneNumber: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshClubs = this.refreshClubs.bind(this)
        this.validateUsername = this.validateUsername.bind(this)
        this.validateCity= this.validateCity.bind(this)
        // this.validatePassword = this.validatePassword.bind(this)
        this.validateCountry = this.validateCountry.bind(this)
        this.validateAddress = this.validateAddress.bind(this)
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this)
        // this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.validateSite = this.validateSite.bind(this)
    }

    componentDidMount() {
        this.refreshClubs()
    }

    refreshClubs() {
        let clubUsername = this.state.clubUsername
        ClubsDataService.retrieveClub(clubUsername)
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        id: response.data.id,
                        clubUsername: response.data.clubUsername,
                        email: response.data.email,
                        password: response.data.password,
                        city: response.data.city,
                        country: response.data.country,
                        address: response.data.address,
                        site: response.data.site,
                        phoneNumber: response.data.phoneNumber
                    })
                }
            )
    }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.errors.clubUsername === '' &&
            // this.state.errors.password === '' &&
            this.state.errors.city === '' &&
            this.state.errors.country === '' &&
            this.state.errors.address === '' &&
            this.state.errors.email === '' &&
            this.state.errors.site === '' &&
            this.state.errors.phoneNumber === '') {
            let club = {
                email: this.state.email,
                password: this.state.password,
                city: this.state.city,
                country: this.state.country,
                address: this.state.address,
                site: this.state.site,
                phoneNumber: this.state.phoneNumber
            }
            ClubsDataService
                .updateClub(this.state.clubUsername, this.state.id, club)
                .then(response => {
                    console.log(response)
                    this.props.history.push(`/clubDetailsPage`)
                })
        }else return
    }

    validateUsername = () => {
        let error = this.state.errors
        if (!this.state.clubUsername) {
            error.clubUsername = 'Required'
        } else if(this.state.clubUsername.length < 3) {
            error.clubUsername= 'Username has to have at least 3 characters'
        }else {
            error.clubUsername = ''
        }
    }

    validateCity = () => {
        let error = this.state.errors
        if (!this.state.city) {
            error.city = 'Required'
        } else if(this.state.city.length < 3) {
            error.city= 'City has to have at least 3 characters'
        }else {
            error.city = ''
        }
    }

    validateCountry = () => {
        let error = this.state.errors
        if (!this.state.country) {
            error.country = 'Required'
        } else if(this.state.country.length < 3) {
            error.country= 'Country has to have at least 3 characters'
        }else {
            error.country = ''
        }
    }

    validateAddress = () => {
        let error = this.state.errors
        if (!this.state.address) {
            error.address = 'Required'
        } else if(this.state.address.length < 3) {
            error.address= 'Address has to have at least 3 characters'
        }else {
            error.address = ''
        }
    }

    validateSite = () => {
        let error = this.state.errors
        if (!this.state.site){
            error.site = ''
        }else if(this.state.site.length < 3) {
            error.site = 'Site address has to have at least 3 characters'
        }else if (!(this.state.site
            .match(/(www)\.[A-Za-z]*[0-9]*\.[A-Za-z]{2,}/))){
            error.site = `Web address doesn't have the correct form`
        }else {
            error.site = ''
        }
    }

    validatePhoneNumber = () => {
        let error = this.state.errors
        if (!this.state.phoneNumber) {
            error.phoneNumber = 'Required'
        } else if(this.state.phoneNumber.length < 3) {
            error.phoneNumber= 'Phone Number has to have at least 3 characters'
        } else if(this.state.phoneNumber.length > 15) {
            error.phoneNumber= 'Phone Number is too long'
        }else if(!(this.state.phoneNumber.match(/^[0-9]+$/))) {
            error.phoneNumber= 'Phone Number has to have only digits'
        }else {
            error.phoneNumber = ''
        }
    }

    validateEmail = () => {
        let error = this.state.errors
        if(!this.state.email) {
            error.email = ''
        }else if(!(this.state.email
            .match(/[A-Za-z]+[0-9.]*@[A-Za-z]{3,}\.[A-Za-z]{2,}/))) {
            error.email = 'Email is not valid'
        }else {
            error.email = ''
        }
    }

    // validatePassword = () => {
    //     let error = this.state.errors
    //     if (!this.state.password) {
    //         error.password = 'Required'
    //     } else if(this.state.password.length < 4) {
    //         error.password = 'Password has to have at least 4 characters'
    //     }else {
    //         error.password = ''
    //     }
    // }

    // validateConfirmPassword = () => {
    //     let error = this.state.errors
    //     if (!this.state.confirmPassword) {
    //         error.confirmPassword = 'Required'
    //     } else if(!(this.state.confirmPassword === this.state.password)) {
    //         error.confirmPassword = 'Passwords have to match'
    //     }else {
    //         error.confirmPassword = ''
    //     }
    // }

    render() {
        let {
            clubUsername,
            password,
            city,
            country,
            address,
            email,
            site,
            phoneNumber
        } = this.state;

        return (
            <div>
                <h2 className="card-header">Club Account Details</h2>
                &nbsp;

                <form onSubmit={this.handleSubmit}>
                    <label>Club Name: </label>
                    <input type="text"
                           name="clubUsername"
                           value={clubUsername}
                           onChange={this.handleChange}
                           required={this.validateUsername()}
                           />
                    {this.state.errors.clubUsername &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.clubUsername}</p>}
                    <br/>
                    <br/>

                    <label>City: </label>
                    <input type="text"
                           name="city"
                           value={city}
                           onChange={this.handleChange}
                           required={this.validateCity()}
                           />
                    {this.state.errors.city &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.city}</p>}
                    <br/>
                    <br/>

                    <label>Country: </label>
                    <input type="text"
                           name="country"
                           value={country}
                           onChange={this.handleChange}
                           required={this.validateCountry()}
                           />
                    {this.state.errors.country &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.country}</p>}
                    <br/>
                    <br/>

                    <label>Site Address: </label>
                    <input placeholder="www.something23.org"
                           type="text"
                           name="site"
                           value={site}
                           onChange={this.handleChange}
                           required={this.validateSite()}
                           />
                    {this.state.errors.site &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.site}</p>}
                    <br/>
                    <br/>

                    <label>Address: </label>
                    <input type="text"
                           name="address"
                           value={address}
                           onChange={this.handleChange}
                           required={this.validateAddress()}
                           />
                    {this.state.errors.address &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.address}</p>}
                    <br/>
                    <br/>

                    <label>Phone Number: </label>
                    <input type="text"
                           name="phoneNumber"
                           value={phoneNumber}
                           onChange={this.handleChange}
                           // required={this.validatePhoneNumber()}
                           />
                    {this.state.errors.phoneNumber &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.phoneNumber}</p>}
                    <br/>
                    <br/>

                    <label>Email: </label>
                    <input placeholder="something@mail.com"
                           type="email"
                           name="email"
                           value={email}
                           onChange={this.handleChange}
                           required={this.validateEmail()}
                           />
                    {this.state.errors.email &&
                    <p style={{color: "red", display: "inline"}}>
                        {this.state.errors.email}</p>}
                    <br/>
                    <br/>

                    {/*<label>Password: </label>*/}
                    {/*<input type="password"*/}
                    {/*       name="password"*/}
                    {/*       value={password}*/}
                    {/*       onChange={this.handleChange}*/}
                    {/*       />*/}
                    {/*{this.state.errors.password &&*/}
                    {/*<p style={{color: "red", display: "inline"}}>*/}
                    {/*    {this.state.errors.password}</p>}*/}
                    {/*<br/>*/}
                    {/*<br/>*/}

                    <button className="btn btn-success"
                            type="submit"
                            style={{width: "220px"}}
                            >
                        Submit Changes
                    </button>
                </form>
            </div>
        )
    }
}

export default ClubAccount