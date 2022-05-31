import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
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
            <Link to={"/update/" + props.flight._id}>update</Link>
        </td>
    </tr>
)

export default class FlightsList2 extends Component {
    constructor(props) {
        super(props);

        //this.deleteExercise = this.deleteExercise.bind(this)

        this.state = { flights: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/flights/')
            .then(response => {
                this.setState({ flights: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    FlightList() {
        return this.state.flights.map(currentflight => {
            return <Flight flight={currentflight} key={currentflight._id} />;
        })
    }

    render() {
        return (
            <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
          <ElevateAppBar/>
          
       <Paper style={{backgroundImage: `url(${backgd})`,
       backgroundSize:'cover',
       height: '1000px',
       display:'block',
       width: '100%'
   }}>

<Box sx={{pt:'75px', pl:'300px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff',position:'relative',left:'600'}}>
Flights
     </Typography>
 
          
     <Table style={{position:'relative',width:1000,left:-270,backgroundColor:'#ffff'}} triped bordered hover variant='light' className="table">
             
          
         
               
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.FlightList()}
                    </tbody>
                </Table>
                </Box>
                </Paper>
            </div>
        )
    }
}