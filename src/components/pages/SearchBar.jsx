import React, {Component} from "react";
import ClubsDataService from "../../api/services/ClubsDataService";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            clubs: []
            //     {
            //     country: '',
            //     city: '',
            //     clubUsername: ''
            // }

        }
        this.refreshClubs = this.refreshClubs.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.refreshClubs();
    }

    refreshClubs() {
        ClubsDataService.retrieveAllClubs()
            .then(
                response => {
                    console.log(response)
                    this.setState({
                        clubs: response.data
                        // country : response.data.country,
                        // city: response.data.city,
                        // clubUsername: response.data.clubUsername
                    })
                }
            )
    }

    handleChange = (event) => {
        console.log(event.target.name);
        this.setState(
            {
                search: event.target.value
            }
        )
    }

    render() {
        let {search} = this.state
        let {clubs} = this.state
        let allClubs = ClubsDataService.retrieveAllClubs()

        return (
            <div>
                <input placeholder="Search..."
                       type="search"
                       icon="search"
                       onChange={this.handleChange}
                />
                {clubs.filter((club) => {
                    if (search === '') {
                        return ''
                    }else if (club.city.toLowerCase()
                        .includes(search.toLowerCase())) {
                        return club
                    }
                }).map((club, key) => {
                    return (
                        <div key={key}>
                            <p>{club.clubUsername} {club.city}</p>

                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default SearchBar