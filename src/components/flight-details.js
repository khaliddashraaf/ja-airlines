import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';



// const Details = props => (
//     <tr>
      
    
//       {/* <td>{props.f.FlightNumber}</td>
//       <td>{props.f.DepartureTime}</td> */}
      
//       <td>
//          {/* <a href="#" onClick={() => { props.deleteFlight(props.f._id) }}>delete</a>| */}
//          {/* <a href="#" onClick={() => { props.confirmDelete(props.f._id) }}>delete???</a> */}
//          {/* <Link to={"/get-flight/"+props.f._id}>details</Link> */}
//          {/* <a href="#" onClick={() => { props.deleteFlight(props.f._id) }}>delete</a>| */}
//       </td>
//     </tr>
//   )


    
  
  


export default class FlightDetails extends Component {
    constructor(props) {
        super(props);
        
        // this.flightDetails = this.flightDetails.bind(this)
        // this.confirmDelete = this.confirmDelete.bind(this)
        this.deleteFlight = this.deleteFlight.bind(this)
      


      
        this.state = {
            DepartureTime: '',
            Fid:'',
            ToDB:'',
            FromDB:'',
            DateDB:'',
            details: []};
    }


     
        

    

    componentDidMount() {
        console.log("props")
        // console.log(window.location.pathname)
        var id = window.location.pathname.split("/")[2]

       
        axios.get(`http://localhost:8000/flights/get-flight/${id}`)
          .then(res => {
              console.log(res.data)
            this.setState({
            FlightNumber:res.data.FlightNumber,
            DepartureTime: res.data.DepartureTime,
            ArrivalTime: res.data.ArrivalTime,
            From: res.data.From,
            To: res.data.To,
            DepartureAirport: res.data.DepartureAirport,
            ArrivalAirport: res.data.ArrivalAirport,
            EconomySeats: res.data.EconomySeats,
            BusinessSeats: res.data.BusinessSeats,
            FirstClassSeats: res.data.FirstClassSeats,
            Date: res.data.Date,
            Fid:id,

            ToDB: res.data.To,
            FromDB: res.data.From,
            DateDB: res.data.Date,
            // details:this.state.details.filter(el => el._id == id),  
            }) 
            console.log("hello"+this.state.ToDB)
            console.log("hello"+this.state.FromDB)  
            console.log("hello"+this.state.DateDB)  

          })
        
          .catch(function (error) {
            console.log(error);
          })
        }
    

    // confirmDelete(id) {
    //     console.log()
    //     axios.get('http://localhost:8000/flights/get-flight/'+id)
    //     .then(res => { console.log(res.data)});

    //     this.setState({
    //       details:this.state.details.filter(el => el._id == id),
    //       flag:true

    //     })
    //     this.flightDetails();
      
    // }


    // confirmDelete(id) {
    //     console.log()
    //     axios.get('http://localhost:8000/flights/get-flight/'+id)
    //     .then(res => { console.log(res.data)});

    //     this.setState({
    //     //   // FlightNumber: res.data[0].FlightNumber,
    //     //   // DepartureTime: res.data.DepartureTime,
    //     //   // ArrivalTime: res.data.ArrivalTime,
    //     //   // From: res.data.From,
    //     //   // To: res.data.To,
    //     //   // DepartureAirport: res.data.DepartureAirport,
    //     //   // ArrivalAirport: res.data.ArrivalAirport,
    //     //   // EconomySeats: res.data.EconomySeats,
    //     //   // BusinessSeats: res.data.BusinessSeats,
    //     //   // Date: res.data.Date
    //     //   flights: this.state.flights.filter(el => el._id !== id)
    //       details:this.state.details.filter(el => el._id == id),
         
          
          
    //     })
    //     // console.log(details);
    //     this.flightDetails();
      
    //   }

    // flightDetails() {
    //     console.log("here is the state detailssss")

    //     console.log(this.state)
    //     console.log("details here"+this.state.details)
    //     return this.state.details.map(currentflight => {         
    //       return (<Details f={currentflight} FlightNumber={currentflight.FlightNumber} 
    //       DepartureTime={currentflight.DepartureTime} ArrivalTime={currentflight.ArrivalTime}
    //       From={currentflight.From} To={currentflight.To}
    //       DepartureAirport={currentflight.DepartureAirport} ArrivalAirport={currentflight.ArrivalAirport}
    //       EconomySeats={currentflight.EconomySeats} BusinessSeats={currentflight.BusinessSeats}
    //       Date={currentflight.Date} confirmDelete={this.confirmDelete}
    //       />
          
    //       )
    //     })
      
    // }
    deleteFlight(id,FlightNumber) {
        console.log(id)
        
        axios.delete('http://localhost:8000/flights/'+id)
          .then(res => { console.log(res.data)});

        axios.delete(`http://localhost:8000/database/removedb/`+FlightNumber)
        .then(res => { console.log(res.data)});
        alert('Flight Has been Deleted Succsesfully')
          window.location = '/admin';
    
      }


    render(){
      
        return(

          <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
          <ElevateAppBar/>
          
       <Paper style={{backgroundImage: `url(${backgd})`,
       backgroundSize:'cover',
       height: '1000px',
       display:'block',
       width: '100%'
   }}>

<Box sx={{pt:'75px', pl:'300px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff',position:'relative',left:300}}>
Flight Details
     </Typography>
 
          
     <Table style={{position:'relative',width:1000,backgroundColor:'#ffff'}} triped bordered hover variant='light' className="table">
             
          
                <tr >
                  <th style={{backgroundColor:'#ffff'}}>Flight Number</th>
                  <th>DepartureTime</th>
                  <th>ArrivalTime</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Arrival Airport</th>
                  <th>Economy Seats</th>
                  
                  <th>Business Seats</th>
                  <th>First Class Seats</th>
                  <th>Date</th>
                </tr>
              <tbody>
              <td>{this.state.FlightNumber}</td>
              <td>{this.state.DepartureTime}</td>
              <td>{this.state.ArrivalTime}</td>
              <td>{this.state.From}</td>
              <td>{this.state.To}</td>
              {/* <td>{this.state.DepartureAirport}</td> */}
              <td>{this.state.ArrivalAirport}</td>
              <td>{this.state.EconomySeats}</td>
              <td>{this.state.BusinessSeats}</td>
              <td>{this.state.FirstClassSeats}</td>
              <td>{this.state.Date}</td>

              <Button onClick={() => this.deleteFlight(this.state.Fid,this.state.FlightNumber)}>
  
                        Delete
                </Button>
              </tbody>
            </Table>
            </Box>
            </Paper>
            
          </div>
        )
    }
}
