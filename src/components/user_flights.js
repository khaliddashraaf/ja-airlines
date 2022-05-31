
import React, { Component } from 'react';
import { Link,Route,Routes } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';



const Flight = props => (
    <tr>
      

      <td>{props.f.FlightNumber}</td>
      <td>{props.f.DepartureTime}</td>
      <td>{props.f.ArrivalTime}</td>
      <td>{props.f.From}</td>
      <td>{props.f.To}</td>
      <td>{props.f.DepartureAirport}</td>
      <td>{props.f.ArrivalAirport}</td>
      {/* <td>{props.i}</td> */}
      {/* <td>hiii</td> */}
      
      <Button action="#">
      <Link to={"/conf-flight/"+props.f._id+"/"+props.i}>cancel</Link>
      </Button>
      <Button action="edit">
      <Link to={"/ChooseEditCriteria/"+props.f._id}>Edit</Link>
      </Button>
    
      <Button action="#">
      <Link to={"/sendEmailForITen/"+props.i+"/"+props.f._id} action="#">send Email</Link>
      </Button>

    
    </tr>
  
  )

  const f = 2;



export default class ReservedFlights extends Component {
  
    constructor(props) {
      super(props);
      
      this.loopOnRes = this.loopOnRes.bind(this);
      this.showFlights = this.showFlights.bind(this);
      this.flightList = this.flightList.bind(this);
      // this.sendEmail = this.sendEmail.bind(this);
    //   this.cancelFlight = this.cancelFlight.bind(this);

      


      this.state = {
        flightsReserved: [],
        details:[],
        flightDetails:[],
        Uid:'',
    }
     
    }

    componentDidMount() {
        var id = window.location.pathname.split("/")[2];

        axios.get(`http://localhost:8000/users/user-flights/${id}`)
        .then(res => {
            this.setState({
                flightsReserved:res.data,
                Uid:id,
                
            })

            // console.log("hello"+this.state.flightsReserved);
            this.loopOnRes();

        })
      }

     

     

    //   cancelFlight(id){
    //     axios.post('http://localhost:8000/users/cancel/'+id)
    //     .then(res => { console.log(res.data)});
    //   }


    loopOnRes(){
    for (const fr of this.state.flightsReserved){
        
        // console.log("flight id"+fr);
        this.showFlights(fr);
        }
        this.flightList()
    
    }

    showFlights(id) {
        // console.log(id)
        
        axios.get('http://localhost:8000/flights/get-flight/'+id)
        .then(response => {
            this.setState({ details: response.data })
            // console.log(this.state.details)
            // this.flightList()
            this.setState(
                { flightDetails: [...this.state.flightDetails, this.state.details] }
              )
              // console.log(this.state.flightDetails)

            
          })
          .catch((error) => {
            console.log(error);
          })


    
      }
      

      flightList() {
        //   console.log("from flightList Target "+this.state.Uid)
        return this.state.flightDetails.map((currentflight, index) => {         
            return <Flight f={currentflight} i = {this.state.Uid} in={index} key={index} cancelFlight={this.cancelFlight} />;

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
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff'}}>
          My Flights 
        </Typography>
            <Table striped bordered hover variant='light' className="table">
         
                <tr>
                  <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
                  Flight Number
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
        Departure Time
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
        Arrival Time
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
        From
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
        To
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
        Departure Airport
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
        Arrival Airport
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000'}}>
               Actions
        </Typography></th>

                  
                </tr>
              <tbody>
                { this.flightList() }
                
               
                
              </tbody>
              {/* </Paper> */}
            </Table>
            </Box>
            </Paper>
            
          </div>
     
        )
      }
}