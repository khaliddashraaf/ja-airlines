import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Flight = props => (
    <tr>
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.DepartureTime}</td>
        <td>{props.flight.ArrivalTime}</td>
        <td>{props.flight.From}</td>
        <td>{props.flight.To}</td>
        <td>{props.flight.DepartureAirport}</td>
        <td>{props.flight.ArrivalAirport}</td>
        <td>{props.flight.EconomySeats}</td>
        <td>{props.flight.BusinessSeats}</td>
        <td>{props.flight.FirstClassSeats}</td>

        <td>{props.flight.Date}</td>

        <td>
            <Link to={"/ChangeFlight/" + props.flight._id}>Edit</Link>
        </td>
    </tr>
)

export default class FlightsList2 extends Component {
    constructor(props) {
        super(props);

        //this.deleteExercise = this.deleteExercise.bind(this)

        this.state = { flights: [] , flightsID:[]};
    }

    componentDidMount() {
        // axios.get('http://localhost:8000/Users/user-flights/'+'61d88b8a60b9a0246948acc6')
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({ flightsID: response.data })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        //     console.log(this.state.flightsID.length)
        //     for(var x=0;x<this.state.flightsID.length;x++){
        //         axios.get('http://localhost:8000/Flight/get-flight/'+this.state.flightsID[x])
        //     .then(response => {
        //         console.log(response.data)
        //         this.state.flights.push(response.data)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
            
        //     }
    }


    FlightList() {
        return this.state.flights.map(currentflight => {
            return <Flight flight={currentflight} key={currentflight._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3> My Flights</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>FlightNumber</th>
                            <th>DepartureTime</th>
                            <th>ArrivalTime</th>
                            <th>From</th>
                            <th>To</th>
                            <th>DepartureAirport</th>
                            <th>ArrivalAirport</th>
                            <th>EconomySeats</th>
                            <th>BusinessSeats</th>
                            <th>FirstClassSeats</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.FlightList()}
                    </tbody>
                </table>
            </div>
        )
    }
}