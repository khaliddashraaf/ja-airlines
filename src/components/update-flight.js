import React, { Component } from 'react';
import axios from 'axios';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import ReactDOM from 'react-dom'
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';

export default class UpdateFlights extends Component {
    constructor(props) {
        super(props);

        this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
        this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
        this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.onChangeDepartureAirport = this.onChangeDepartureAirport.bind(this);
        this.onChangeArrivalAirport = this.onChangeArrivalAirport.bind(this);
        this.onChangeEconomySeats = this.onChangeEconomySeats.bind(this);
        this.onChangeBusinessSeats = this.onChangeBusinessSeats.bind(this);
        this.onChangeFirstClassSeats = this.onChangeFirstClassSeats.bind(this);

        this.onChangeDate = this.onChangeDate.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            FlightNumber: '',
            DepartureTime: '',
            ArrivalTime: '',
            From: '',
            To: '',
            DepartureAirport: '',
            ArrivalAirport: '',
            EconomySeats: '',
            BusinessSeats: '',
            FirstClassSeats: '',
            Date: '',

            flights: []
        }
    }

    componentDidMount() {
        var id = window.location.pathname.split("/")[2]
        console.log(id)
        axios.get(`http://localhost:8000/flights/update/${id}`)
            .then(response => {
                this.setState({
                    FlightNumber: response.data.FlightNumber,
                    DepartureTime: response.data.DepartureTime,
                    ArrivalTime: response.data.ArrivalTime,
                    From: response.data.From,
                    To: response.data.To,
                    DepartureAirport: response.data.DepartureAirport,
                    ArrivalAirport: response.data.ArrivalAirport,
                    EconomySeats: response.data.EconomySeats,
                    BusinessSeats: response.data.BusinessSeats,
                    FirstClassSeats: response.data.FirstClassSeats,
                    Date: response.data.Date,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    onChangeFlightNumber(e) {
        this.setState({
            FlightNumber: e.target.value
        })
    }

    onChangeDepartureTime(e) {
        this.setState({
            DepartureTime: e.target.value
        })
    }
    onChangeArrivalTime(e) {
        this.setState({
            ArrivalTime: e.target.value
        })
    }
    onChangeFrom(e) {
        this.setState({
            From: e.target.value
        })
    }
    onChangeTo(e) {
        this.setState({
            To: e.target.value
        })
    }
    onChangeDepartureAirport(e) {
        this.setState({
            DepartureAirport: e.target.value
        })
    }
    onChangeArrivalAirport(e) {
        this.setState({
            ArrivalAirport: e.target.value
        })
    }
    onChangeEconomySeats(e) {
        this.setState({
            EconomySeats: e.target.value
        })
    }
    onChangeBusinessSeats(e) {
        this.setState({
            BusinessSeats: e.target.value
        })
    }
    onChangeFirstClassSeats(e) {
        this.setState({
            FirstClassSeats: e.target.value
        })
    }
    onChangeDate(e) {
        this.setState({
            Date: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
    
        const flightUpdate = {
            FlightNumber: this.state.FlightNumber,
            DepartureTime: this.state.DepartureTime,
            ArrivalTime: this.state.ArrivalTime,
            From: this.state.From,
            To: this.state.To,
            DepartureAirport: this.state.DepartureAirport,
            ArrivalAirport: this.state.ArrivalAirport,
            EconomySeats: this.state.EconomySeats,
            BusinessSeats: this.state.BusinessSeats,
            FirstClassSeats: this.state.FirstClassSeats,
            Date: this.state.Date,

        }
        const FlightSchedule1= {
            Flight_Date: this.state.Date,
           From: this.state.From,
           To: this.state.To,
        //    Cabin:'Business',
        //    Seats_Available_on_Flight:parseInt(this.state.BusinessSeats),
          Flight_Number:this.state.FlightNumber
     
     
         }

        console.log(flightUpdate);
        var pid = window.location.pathname.split("/")[2]
        console.log(pid)
        axios.post('http://localhost:8000/flights/update/' + pid, flightUpdate)
            .then(res => console.log(res.data));

        axios.post('http://localhost:8000/database/update/' + this.state.FlightNumber, FlightSchedule1)
            .then(res => console.log(res.data));
              alert('Flight Has been Updated Succsesfully')
        window.location = '/admin';
        //window.location.reload();


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
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff'}}>
       Update Flight
       </Typography>
   
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>FlightNumber: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.FlightNumber}
                            onChange={this.onChangeFlightNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>DepartureTime: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.DepartureTime}
                            onChange={this.onChangeDepartureTime}
                        />
                    </div>
                    <div className="form-group">
                        <label>ArrivalTime: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ArrivalTime}
                            onChange={this.onChangeArrivalTime}
                        />
                    </div>
                    <div className="form-group">
                        <label>From: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.From}
                            onChange={this.onChangeFrom}
                        />
                    </div>
                    <div className="form-group">
                        <label>To: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.To}
                            onChange={this.onChangeTo}
                        />
                    </div>
                    <div className="form-group">
                        <label>DepartureAirport: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.DepartureAirport}
                            onChange={this.onChangeDepartureAirport}
                        />
                    </div>
                    <div className="form-group">
                        <label>ArrivalAirport: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ArrivalAirport}
                            onChange={this.onChangeArrivalAirport}
                        />
                    </div>
                    <div className="form-group">
                        <label>EconomySeats: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.EconomySeats}
                            onChange={this.onChangeEconomySeats}
                        />
                    </div>
                    <div className="form-group">
                        <label>BusinessSeats: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.BusinessSeats}
                            onChange={this.onChangeBusinessSeats}
                        />
                    </div>
                    <div className="form-group">
                        <label>FirstClassSeats: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.FirstClassSeats}
                            onChange={this.onChangeFirstClassSeats}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Flights" className="btn btn-primary" />
                    </div>
                </form>
                </Box>
                </Paper>
            </div>
        )
    }
}