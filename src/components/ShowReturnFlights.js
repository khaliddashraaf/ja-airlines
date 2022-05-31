import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
const Flight = props => (
  <tr>
      <td>{props.flight.FlightNumber}</td>
      <td>{props.flight.DepartureTime}</td>
      <td>{props.flight.ArrivalTime}</td>
      <td>{props.flight.From}</td>
      <td>{props.flight.To}</td>
      <td>{props.flight.Duration}</td>
      <td>{props.flight.Price}</td> 
     
      {/* <td>{props.flight.EconomySeats}</td> */}
      {/* <td>{props.flight.BusinessSeats}</td> */}
      {/* <td>{props.flight.FirstClassSeats}</td> */}

      <td>{props.flight.Date}</td>

      <td>
           <Link to={"/SelectReturnFlight/" + props.flight._id}> Select</Link>  
          {/* <button onClick={() => this.SelectFlight(this.state._id)}>
                     Select
            </button> */}


      </td>
  </tr>
)
export default class SelectFlight extends Component {
    
  constructor(props) {
    super(props);
    
        this.state = {
          FlightsList:[],
             FlightNumber: '',
             From:'',
             To:'',
             Date:'',
             Seats:'',
             Cabin:''
    }
  }
  componentDidMount(){
   const Date=localStorage.getItem("ReturnDate");
   const From=localStorage.getItem("From");
   const To=localStorage.getItem("To");
   const Cabin=localStorage.getItem("Cabin");
   const Seats=localStorage.getItem("Seats");
   console.log(localStorage.getItem("depID"));
   console.log('http://localhost:8000/Flights/SearchUser?'+'Date='+Date+'&To='+
   To+'&From='+From+'&Cabin='+Cabin+'&Seats='+Seats)
    axios.get('http://localhost:8000/Flights/SearchUser?'+'Date='+Date+'&To='+
    To+'&From='+From+'&Cabin='+Cabin+'&Seats='+Seats)
    .then(res=>{
        this.setState({
          FlightsList:res.data
    //         FlightNumber:res.data[0].FlightNumber,
    // DepartureTime: res.data[0].DepartureTime,
    // ArrivalTime: res.data[0].ArrivalTime,
    // From: res.data[0].From,
    // To: res.data[0].To,
    // DepartureAirport: res.data[0].DepartureAirport,
    // ArrivalAirport: res.data[0].ArrivalAirport,
    // EconomySeats: res.data[0].EconomySeats,
    // BusinessSeats: res.data[0].BusinessSeats,
    // FirstClassSeats: res.data[0].FirstClassSeats,
    // Date: res.data[0].Date,
    // Fid:res.data[0]._id
        })
        if(res.data.length==0){
          alert('There are no Flights with those dates please try using other values')
        }
         }    
      );
};
SelectReturnFlight(){
    localStorage.setItem("FID2", this.state.Fid);
    localStorage.setItem("From2", this.state.To);
    localStorage.setItem("To2", this.state.From);
   // window.location='/SelectReturnFlight';
   
}
FlightList() {
  return this.state.FlightsList.map(currentflight => {
      return <Flight flight={currentflight} key={currentflight._id} />;
  })
}
render() {
    return (
      <div style={{width:'100%', backgroundColor:'#f2f2f2'}} >
      <ElevateAppBar/>
   <Paper style={{backgroundImage: `url(${backgd})`,
     backgroundSize:'cover',
     height: '1000px',
     display:'block',
     width: '100%'
 }}>
   
 <Typography variant='h3' style={{ fontFamily:'monospace', color:'#ffff',pt:'800px', position:'relative',left:300,top:20}}>
    Select your Return Flight
   </Typography>
             
             <div>
             <Box sx={{pt:'50px', pl:'80px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} width='1300px' height='100px' display='inline-grid' alignItems='center'>
      <Table striped bordered hover  style={{backgroundColor:'#ffff'}}className="table">
              
                  <th>Flight Number</th>
                  <th>DepartureTime</th>
                  <th>ArrivalTime</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Date</th>
                
             
               {/* <td>{this.state.FlightNumber}</td> 
              <td>{this.state.DepartureTime}</td>
              <td>{this.state.ArrivalTime}</td>
              <td>{this.state.From}</td>
              <td>{this.state.To}</td> */}
              {/* <td>{this.state.DepartureAirport}</td> 
              <td>{this.state.ArrivalAirport}</td>
              <td>{this.state.EconomySeats}</td>
              <td>{this.state.BusinessSeats}</td> */}
              {/* {/* <td>{this.state.FirstClassSeats}</td> */}
              {/* <td>{this.state.Date}</td> */}
              {/* <td> */}
            {/* <Link to={"/Select/" + props.flight._id}> Select</Link>  */}
              
              <tbody>
                        {this.FlightList()}
                    </tbody>
           
            {/* <td>
            <button onClick={() => this.SelectReturnFlight()}>
              Select
               </button>
            </td> */}
 
            {/* <Link to={"/Select/" + this.state.FlightNumber}>Select</Link>
        
        </td> */}

             
            </Table>
      
          </Box>
       </div>
       </Paper>
        </div>
    )
};

}
