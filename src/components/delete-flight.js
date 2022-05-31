import React, { Component } from 'react';
import { Link,Route,Routes } from 'react-router-dom';
import axios from 'axios';
import FlightDetails from './flight-details';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
// const flight = require('../Models/Flights');

const Flight = props => (
    <tr>
      
    
      <td>{props.f.FlightNumber}</td>
      {/* <td>{props.f._id}</td> */}
      
      <td>
         {/* <a href="#" onClick={() => { props.deleteFlight(props.f._id) }}>delete</a>| */}
         {/* <a href="#" onClick={() => { props.confirmDelete(props.f._id) }}>delete???</a> */}
         <Link to={"/get-flight/"+props.f._id}>Details</Link>

        {/* <Routes>
        <Route path = "/get-flight/" element = {<FlightDetails id={props.f._id}/>}>details</Route>
        </Routes> */}

         {/* <Link to={`/get-flight/${this.state.id}`} >details</Link> */}
      </td>
    </tr>
  )

  export default class FlightsList extends Component {
    constructor(props) {
      super(props);
      
      // this.deleteFlight = this.deleteFlight.bind(this)
      // this.confirmDelete = this.confirmDelete.bind(this)
      this.flightDetails = this.flightDetails.bind(this)
  
      this.state = {flights: [],details: [],flag:false};
      // this.state = {details: []};
    }



    


    componentDidMount() {
      console.log("hello from dele")
        axios.get('http://localhost:8000/flights/')
          .then(response => {
            this.setState({ flights: response.data,flag:false })
            console.log(this.state.flights)
          })
          .catch((error) => {
            console.log(error);
          })
    }


     
      flightList() {
        console.log("here is the state")
        console.log(this.state)
        
        return this.state.flights.map(currentflight => {         
          return <Flight f={currentflight} key={currentflight._id} deleteFlight={this.deleteFlight} confirmDelete={this.confirmDelete}/>;
        })
      }

      flightDetails() {
        console.log("here is the state detailssss")
        console.log(this.state)
        return this.state.details.map(currentflight => {         
          return (<Flight f={currentflight} FlightNumber={currentflight.FlightNumber} 
          DepartureTime={currentflight.DepartureTime} ArrivalTime={currentflight.ArrivalTime}
          From={currentflight.From} To={currentflight.To}
          DepartureAirport={currentflight.DepartureAirport} ArrivalAirport={currentflight.ArrivalAirport}
          EconomySeats={currentflight.EconomySeats} BusinessSeats={currentflight.BusinessSeats}
          Date={currentflight.Date} 
          />
          )
        })
      
    }

      render() {
        return (
          <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
          <ElevateAppBar/>
          
       <Paper style={{backgroundImage: `url(${backgd})`,
       backgroundSize:'cover',
       height: '100%',
       display:'block',
       width: '100%'
   }}>

<Box sx={{pt:'75px', pl:'300px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff',position:'relative',left:300}}>
      Flights
     </Typography>
 
          
     <Table style={{position:'relative',left:300}}triped bordered hover variant='light' className="table">
                <tr>
                  <th>Flight Number</th>
                </tr>
              <tbody>
                { this.flightList() }
               
                
              </tbody>
            </Table>
            </Box>
      </Paper>
          </div>
     
        )
      }
}