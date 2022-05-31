import React,{ Component } from 'react';

import axios from 'axios';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table'

export default class Search extends Component {
    
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
    this.onChangeDate= this.onChangeDate.bind(this);


    //this.onSubmit = this.onSubmit.bind(this);
    //<table className="table">
    // <tr>
    //   <th>Flight Number</th>
    //   <th>DepartureTime</th>
    //   <th>ArrivalTime</th>
    //   <th>From</th>
    //   <th>To</th>
    //   <th>Arrival Airport</th>
    //   <th>Economy Seats</th>
      
    //   <th>Business Seats</th>
    //   <th>First Class Seats</th>
    // </tr>
    
    this.state = {
        // FlightNumber: '',
        Flights:[],
        flNumber:'',
        To:'',
        From:'',
        DepartureTime:'',
        ArrivalTime:'',
        DepartureAirport:'',
        ArrivalAirport:'',
        EconomySeats:'',
        BusinessSeats:'',
        Date:''
        

        
    
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8000/Flights/search')
      .then(response => {
        this.setState({ Flights: response.data })
        console.log(this.state.Flights)
      })
      .catch((error) => {
        console.log(error);
      })
    //console.log('componentdidmount');
  }
  onChangeFlightNumber(e) {
    this.setState({
     // FlightNumber: e.target.value,
      flNumber:e.target.value
      
    })
    
   

    // const SearchTerm =e.target.value
    // axios.get('http://localhost:8000/Flights/search').then((response)=>
    // {      
    //     this.setState({Flights:response.data})
    //     console.log('fll'+JSON.stringify(this.state.Flights))

       
    //    console.log('res.data:  '+JSON.stringify(response.data))
    //     if(JSON.stringify(response.data.success)){
    //         const result= this.state.Flights.filter(this.state.Flights.FlightNumber.includes(SearchTerm));
    //  this.setState({Flights:result});
    //  console.log('filter content')
    //     }
    // })
    console.log(e.target.value);
  }
//   filterContent(Flights,SearchTerm){
//       console.log('flights'+Flights)
//       console.log('Search term'+SearchTerm)

//      const result= Flights.filter(Flights.FlightNumber.includes(SearchTerm));
//      this.setState({Flights:result});
//      console.log('filter content')
 // }


 //*********************************************** */
  onChangeTo(e) {
    this.setState({
    To: e.target.value
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
  
  onChangeDate(e) {
    this.setState({
      Date: e.target.value
    })
    
  }
//*************************************************** */

//   onSubmit(e) {
//     e.preventDefault();

//     const Flights = {
//       FlightNumber: this.state.FlightNumber
//     //   Email:this.state.Email,
//     //   Age :this.state.Age,
//     //   BornIn:this.state.BornIn,
//     //   LivesIn:this.state.LivesIn,
//     //   MartialStatus :this.state.MartialStatus,
//     //   PhoneNumber:this.state.PhoneNumber,
//     //   Job :this.state.Job
      
     
//     }

//     console.log(Flights);

//     // axios.get('http://localhost:8000/Flights/search', Flights)
//     //   .then(res => console.log(res.data));

//     this.setState({
//       FlightNumber: '',
//       Flights:[],
//       flNumber:''
      
//     //   Age :0,
//     //   BornIn:'',
//     //   MartialStatus :'',
//     //   LiveIn:'',
//     //   Email:'',
//     //   PhoneNumber:'',
//     //   Job:''
//     })
   
//   }
  

  render() {
    return (
      <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
       <ElevateAppBar/>
       
   <Paper style={{backgroundImage: `url(${backgd})`,
   backgroundSize:'cover',
   height: '1700px',
   display:'block',
   width: '100%'
}}>
  <Box sx={{pt:'75px', pl:'300px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff'}}>
         Search Flights
        </Typography>
           

     
      
        {/* <h3>Search</h3> */}
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">  */}
            <label>Flight Number: </label>
            <input  type="text"
                required
                 
                // className="form-control"
                value={this.state.flNumber}
                onChange={this.onChangeFlightNumber}
                style={{width: "150px",margin:10}}/>
           
           {/* <div>  */}
              
      {/* </div> */}
          {/* <div className="form-group">  */}
            <label>To: </label>
            <input  type="text"
                required
                // className="form-control"
                value={this.state.To}
                onChange={this.onChangeTo}
                style={{width: "150px",margin:10}}
                />
          {/* </div> */}
          {/* <div>
               {  this.state.Flights.filter(flight => (flight.To.includes(this.state.To)) &  (flight.FlightNumber.includes(this.state.flNumber))).map((val,key)=> {
         return (
        
         <div className="flight" key={key}>
             <p>{val.FlightNumber+" "+val.To} </p>
             </div>);

       })} </div> */}
           {/* <div className="form-group">  */}
            <label>From: </label>
            <input  type="text"
                required
               // className="form-control"
                height="100px"
                value={this.state.From}
                onChange={this.onChangeFrom}
                style={{width: "150px",margin:10}}
                />
          {/* </div> */}
          {/* <div className="form-group">  */}
            <label>Departure Time : </label>
            <input  type="integer"
                required
                //className="form-control"
                value={this.state.DepartureTime}
                onChange={this.onChangeDepartureTime}
                style={{width: "150px",margin:10}}
                />
          {/* </div> */}
          {/* <div className="form-group">  */}
            <label> DepartureAirport: </label>
            <input  type="text"
                required
              //  className="form-control"
                value={this.state.DepartureAirport}
                onChange={this.onChangeDepartureAirport}
                style={{width: "150px",margin:10}}
                />
          {/* </div> */}
          {/* <div className="form-group">  */}
            <label>ArrivalAirport: </label>
            <input  type="text"
                required
                // className="form-control"
                value={this.state.ArrivalAirport}
                onChange={this.onChangeArrivalAirport}
                style={{width: "150px",margin:10}}
                />
          {/* </div>  */}
           
          {/* <div className="form-group">  */}
            <label>ArrivalTime: </label>
            <input  type="text"
                required
                // className="form-control"
                value={this.state.ArrivalTime}
                onChange={this.onChangeArrivalTime}
                style={{width: "150px",margin:10}}
                />
          {/* </div> */}
          {/* <div className="form-group">  */}
            <label>Date: </label>
            <input  type="text"
                required
                // className="form-control"
                value={this.state.Date}
                onChange={this.onChangeDate}
                style={{width: "150px",margin:10}}
                />
          {/* </div>  */}
          {/* <div className="form-group">  */}
            <label>EconomySeats: </label>
            <input  type="text"
                required
                // className="form-control"
                value={this.state.EconomySeats}
                onChange={this.onChangeEconomySeats}
                style={{width: "150px",margin:10}}
                />
          {/* </div>  */}
          {/* <div className="form-group">  */}
            <label>BusinessSeats: </label>
            <input  type="text"
                required
                // className="form-control"
                value={this.state.BusinessSeats}
                onChange={this.onChangeBusinessSeats}
                style={{width: "150px",margin:10}}
                />
          {/* </div>  */}
        
           <div>
             <label> Flight Number </label>
             <label>        </label>
             <label> From </label>
             <label> To </label>
             <label> DepartureTime </label>
             <label> ArrivalTime </label>
             <label> DepartureAirport </label>
             <label> ArrivalAirport </label>
             <label> Economy </label>
             <label> Business </label>
             <label> Date </label>
             </div>
          
          <div>
          {/* &
                   (flight.EconomySeats.includes(this.state.EconomySeats)) &
                   (flight.BusinessSeats.includes(this.state.BusinessSeats)) */}
               {  this.state.Flights.filter(flight => ((flight.To.includes(this.state.To)) & 
                (flight.FlightNumber.includes(this.state.flNumber)) &
                (flight.From.includes(this.state.From)) &
                 (flight.DepartureTime.includes(this.state.DepartureTime)) & 
                  (flight.DepartureAirport.includes(this.state.DepartureAirport))&  
                   (flight.ArrivalTime.includes(this.state.ArrivalTime)) & 
                   (flight.ArrivalAirport.includes(this.state.ArrivalAirport))  &
                   (flight.Date.includes(this.state.Date))
               )
               ).map((val,key)=> {
         return (
        
         <div className="flight" key={key}>
             <p>{val.FlightNumber+"             " +val.From+"       " +val.To+ "        "+val.DepartureTime+"       "+val.ArrivalTime+"        "+val.DepartureAirport +"      "+val.ArrivalAirport+"        "+
             val.EconomySeats+"        "+val.BusinessSeats+"       "+val.Date} </p>
             </div>
             );

       }
       
       )} 
       </div>
          
        </form>
        </Box>
        </Paper>
      </div>
    )
  }
}
