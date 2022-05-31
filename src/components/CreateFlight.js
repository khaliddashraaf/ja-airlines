import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
export default class CreateFlight extends Component {
  constructor(props) {
    super(props);

    this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
   this.onChangeFrom = this.onChangeFrom.bind(this);
   this.onChangeDepartureAirport = this.onChangeDepartureAirport.bind(this);
   this.onChangeArrivalAirport = this.onChangeArrivalAirport.bind(this);
   this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
   this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
   this.onChangeEconomySeats = this.onChangeEconomySeats.bind(this);
   this.onChangeBusinessSeats = this.onChangeBusinessSeats.bind(this);
   this.onChangeFirstClassSeats = this.onChangeFirstClassSeats.bind(this);

   this.onChangeDate= this.onChangeDate.bind(this);
   this.onChangePrice= this.onChangePrice.bind(this);
   this.onChangeDuration= this.onChangeDuration.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        Flights:[],
        FlightNumber:'',
        To:'',
        From:'',
        DepartureTime:'',
        ArrivalTime:'',
        DepartureAirport:'',
        ArrivalAirport:'',
        EconomySeats:'',
        BusinessSeats:'',
        FirstClassSeats:'',
        Date:'',
        Cabin:'',
        Seats_Available_on_Flight:0,
        Duration:0,
        Price:0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/Flights/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            Flights: response.data.map(Flight => Flight.FlightName),
            FlightNumber: response.data[0].FlightNumber
          })
        } 
      })
      .catch((error) => {
        console.log(error);
      })

  }
  onChangeFlightNumber(e) {
    this.setState({
    FlightNumber: e.target.value
    })
    
  }
  onChangeCabin(e){
    this.setState({
        Cabin: e.target.value
        })
  }
        onChangeSeatsAvailableOnFlight(e){
            this.setState({
                Seats_Available_on_Flight: e.target.value
                })
        }

  onChangeTo(e) {
    this.setState({
    To: e.target.value
    })
    
  }
  onChangePrice(e) {
    this.setState({
    Price: e.target.value
    })
    
  }
  onChangeDuration(e) {
    this.setState({
    Duration: e.target.value
    })
    
  }
  onChangeFrom(e) {
    this.setState({
      From: e.target.value
    })
  }
  onChangeDepartureAirport(e) {
    this.setState({
      DepartureAirport: e.target.value
    })
  }
  onChangeDepartureTime(e) {
    this.setState({
      DepartureTime: e.target.value
    })
  }
  onChangeArrivalAirport(e) {
    this.setState({
      ArrivalAirport: e.target.value
    })
  }
  onChangeArrivalTime(e) {
    this.setState({
      ArrivalTime: e.target.value
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
    console.log(this.state.FirstClassSeats)
    
  }
  onChangeDate(e) {
    this.setState({
      Date: e.target.value
    })
    
  }
  componentDidMount() {
    axios.get('http://localhost:8000/flights/')
      .then(response => {
        //if (response.data.length > 0) {
          this.setState({
            Flights: response.data.map(Flight => Flight.FlightNumber),
            FlightNumber:'',
            To:'',
            From:'',
            DepartureTime:'',
            ArrivalTime:'',
            DepartureAirport:'',
            ArrivalAirport:'',
            EconomySeats:0,
            BusinessSeats:0,
            FirstClassSeats:0,
            Date:'',
            Cabin:'',
            Seats_Available_on_Flight:0,
            Duration:'',
            Price:0
           
          })
      //  } 
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onSubmit(e) {

    e.preventDefault();

    const flight = {
      FlightNumber: this.state.FlightNumber,
      DepartureAirport: this.state.DepartureAirport,
      DepartureTime: this.state.DepartureTime,
      Date: this.state.Date,
      From: this.state.From,
      To: this.state.To,
      BusinessSeats: this.state.BusinessSeats,
      EconomySeats: this.state.EconomySeats,
      FirstClassSeats:this.state.FirstClassSeats,
      ArrivalAirport:this.state.ArrivalAirport,
      ArrivalTime:this.state.ArrivalTime,
      Price:this.state.Price,
      Duration:this.state.Duration
     
    }
    
    const FlightSchedule1= {
       Flight_Date: this.state.Date,
      From: this.state.From,
      To: this.state.To,
      Cabin:'Business',
      Seats_Available_on_Flight:this.state.BusinessSeats,
     Flight_Number:this.state.FlightNumber


    }
    const FlightSchedule2= {
        Flight_Date: this.state.Date,
      From: this.state.From,
      To: this.state.To,
      Cabin:'Economy',
      Seats_Available_on_Flight:this.state.EconomySeats,
      Flight_Number:this.state.FlightNumber


    }
    const FlightSchedule3= {
      Flight_Date: this.state.Date,
    From: this.state.From,
    To: this.state.To,
    Cabin:'FirstClass',
    Seats_Available_on_Flight:this.state.FirstClassSeats,
    Flight_Number:this.state.FlightNumber


  }

       console.log("----------------------------------------------------------------------")

    console.log("flight  " +JSON.stringify(flight));
    console.log("flight1  "+JSON.stringify(FlightSchedule1));
    console.log("flight2  "+JSON.stringify(FlightSchedule2));


    axios.post('http://localhost:8000/flights/add', flight)
      .then(res => console.log(res.data));

      axios.post('http://localhost:8000/database/add', FlightSchedule1)
      .then(res => console.log(res.data));
      axios.post('http://localhost:8000/database/add', FlightSchedule2)
      .then(res => console.log(res.data));
      axios.post('http://localhost:8000/database/add', FlightSchedule3)
      .then(res => console.log(res.data));

     
    this.state = {
        Flights:[],
        FlightNumber:'',
        To:'',
        From:'',
        DepartureTime:'',
        ArrivalTime:'',
        DepartureAirport:'',
        ArrivalAirport:'',
        EconomySeats:0,
        BusinessSeats:0,
        FirstClassSeats:0,
        Date:'',
        Cabin:'',
        Seats_Available_on_Flight:0,
        Price:0,
        Duration:''
    }
    alert("Flight Created Succsesfully")
     window.location = '/admin';  
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
          Create New Flight
        </Typography>
            {/* <Table striped bordered hover variant='light' className="table"> */}
         
                {/* <tr> */}
                
      {/* <h3>Create New Flight </h3> */}
      <form onSubmit={this.onSubmit}>
      <div className="form-group">  
          <label>Flight Number : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.FlightNumber}
              onChange={this.onChangeFlightNumber}
              />
        </div>
              {/* {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              } */}
          {/* </select>
        </div> */}
        <div className="form-group"> 
          <label>From : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.From}
              onChange={this.onChangeFrom}
              />
        </div>
        <div className="form-group">
          <label>To : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.To}
              onChange={this.onChangeTo}
              />
        </div>

        <div className="form-group">
          <label>Departure Airport: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.DepartureAirport}
              onChange={this.onChangeDepartureAirport}
              />
        </div>
        <div className="form-group">
          <label>Arrival Airport : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.ArrivalAirport}
              onChange={this.onChangeArrivalAirport}
              />
        </div>
      
        <div className="form-group">
          <label>DepartureTime : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.DepartureTime}
              onChange={this.onChangeDepartureTime}
              />
        </div>
        <div className="form-group">
          <label>ArrivalTime : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.ArrivalTime}
              onChange={this.onChangeArrivalTime}
              />
        </div>
        
        <div className="form-group">
          <label>Economy Seats : </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.EconomySeats}
              onChange={this.onChangeEconomySeats}
              />
        </div>
        <div className="form-group">
          <label> BusinessSeats: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.BusinessSeats}
              onChange={this.onChangeBusinessSeats}
              />
         </div>
         <div className="form-group">
          <label> First Class Seats: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.FirstClassSeats}
              onChange={this.onChangeFirstClassSeats}
              />
         </div>
         <div className="form-group">
          <label> Date: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Date}
              onChange={this.onChangeDate}
              />
         </div>
         <div className="form-group">
          <label> Price: </label>
          <input 
              type="number" 
               className="form-control"
              value={this.state.Price}
              onChange={this.onChangePrice}
              />
         </div>
         <div className="form-group">
          <label> Duration: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Duration}
              onChange={this.onChangeDuration}
              />
         </div>
        {/* <div className="form-group">
           <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.Date}
            
              onChange={this.onChangeDate}
            />
          </div>
        </div> */} 
        {/* FlightNumber:'',
        To:'',
        From:'',
        DepartureTime:'',
        ArrivalTime:'',
        DepartureAirport:'',
        ArrivalAirport:'',
        EconomySeats:'',
        BusinessSeats:'',
        Date:'' */}

        <div className="form-group">
          <input type="submit" value="Create Flight " className="btn btn-primary" />
        </div>
      </form>
      </Box>
      </Paper>
    </div>
    )
  }
}