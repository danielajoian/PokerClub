import React, {Component} from "react";

class Clubs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubs: {
                name: 'Poker Club',
                description: 'Important info',
                address: 'Bucharest',
                phone: '+04058963217'
            }
        }
    }
    render() {
        return (
            <div>
                <h3>List of Poker Clubs</h3>
                    <div className="container">
                        <div className="row">
                            <div className={"col"}>
                                <form>
                                    <h4>{this.state.clubs.name}</h4>
                                    <h4>Details: {this.state.clubs.description}</h4>
                                    <p>Address: {this.state.clubs.address}</p>
                                    <p>Phone: {this.state.clubs.phone}</p>
                                </form>
                            </div>

                            <div className={"col"}>
                                <form>
                                    <h4>{this.state.clubs.name}</h4>
                                    <h4>Details: {this.state.clubs.description}</h4>
                                    <p>Address: {this.state.clubs.address}</p>
                                    <p>Phone: {this.state.clubs.phone}</p>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default Clubs