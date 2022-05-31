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
export default class SelectReturnFlights extends Component {
    
  constructor(props) {
    super(props);
    
        this.state = {
        
             FlightNumber: '',
             From:'',
             To:'',
             Date:'',
             Seats:'',
             Cabin:'',
             Price:0,
             Duration:'', 
             NumberOfBags:0,
             WeightOfBag:23
    }
    this.SelectReturnFlights = this.SelectReturnFlights.bind(this)
  }
  componentDidMount(){
    const a =localStorage.getItem("FID2");
    console.log('and gowa select flight b print');
    console.log(a);
    var id = window.location.pathname.split("/")[2]
    localStorage.setItem("retID", id)
    
    console.log(localStorage.getItem("depID"))
    console.log(localStorage.getItem("retID"))

    localStorage.setItem("FID2", id);
    const x=localStorage.getItem("Cabin").normalize();
    var n=0;
    var w=2;
    if(x=="Economy" ){
      n=2;
      w=23;
    }
    else if(x=="Business"){
      n=2;
      w=32;
    }
    else {
      n=3;
      w=32;
    }
    this.setState({
      Cabin:localStorage.getItem("Cabin"),
      Seats:localStorage.getItem("Seats"),
    })
   
    axios.get('http://localhost:8000/Flights/FindMyFlight?ID='+id)
    .then(res=>{
      console.log(res.data.Price)
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
    Fid:res.data._id,
    Price:res.data.Price,
    Duration:res.data.Duration,
    NumberOfBags:n,
    WeightOfBag:w
        })
        var p= this.state.Price
        // console.log("prie now "+p)
        if(x=="Economy" ){
          
          p=p
        }
        else if(x=="Business"){
          
          p=p*1.4
        }
        else {
          
          p=p*1.8
        }
        var u=p*this.state.Seats
         this.setState({
           Price:u
         })
         console.log(this.state.Price)
         }    
      );
};
SelectReturnFlights = ()=>{
    // localStorage.setItem("FID2", this.state.Fid);
    // localStorage.setItem("From2", this.state.To);
    // localStorage.setItem("To2", this.state.From);
    console.log(localStorage.getItem("FID"))
    console.log(localStorage.getItem("depID"))
    console.log(localStorage.getItem("retID"))
    console.log(localStorage.getItem("cabinID"))
    console.log(localStorage.getItem("seatsID"))
    window.location='/booking';

    
    // this.props.history.push({
    //   pathname: '/booking',
      
    //   retFlight: this.state.Fid
    // })
    console.log(this.state.Fid)
     window.location='/SummaryFlight';
   // console.log("selectReturn floigh fe show return flights")
   
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
   
 <Typography variant='h2' style={{ fontFamily:'monospace', color:'#ffff',pt:'800px', position:'relative',left:400,top:20}}>
     My Return Flight 
   </Typography>
   
        <div>
        <Box sx={{pt:'50px', pl:'80px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} width='1300px' height='100px' display='inline-grid' alignItems='center'>
      <Table striped bordered hover  style={{backgroundColor:'#ffff'}}className="table">
      
                <tr>
                <th>Flight Number</th> 
                  <th>DepartureTime</th>
                  <th>ArrivalTime</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Duration</th>
                  <th>Price</th>
                  
                  <th>Cabin</th>
                  
                  <th>Number of Passengers</th> 
                  <th>Number of bags</th> 
                  <th>weight of bag</th> 
                  <th>Date</th>
                </tr>
              <tbody>
               <td>{this.state.FlightNumber}</td> 
              <td>{this.state.DepartureTime}</td>
              <td>{this.state.ArrivalTime}</td>
              <td>{this.state.From}</td>
              <td>{this.state.To}</td>
              <td>{this.state.Duration}</td> 
              <td>{this.state.Price}</td>
              <td>{this.state.Cabin}</td>
              <td>{this.state.Seats}</td>
              <td>{this.state.NumberOfBags}</td>
              <td>{this.state.WeightOfBag}</td>
              {/* {/* <td>{this.state.FirstClassSeats}</td> */}
              <td>{this.state.Date}</td>
              {/* <td> */}
            {/* <Link to={"/Select/" + props.flight._id}> Select</Link>  */}
            
 
            {/* <Link to={"/Select/" + this.state.FlightNumber}>Select</Link>
        
        </td> */}

              </tbody>
            </Table>
      </Box>
          
       </div>
       <div>
       <Link
          
          to={{
            pathname: "/booking",
            data:  this.state.Fid 
          }}
          property='asjfdjkasn'
        >
          go
        </Link>

         
       <Button style={{position:'relative',left:500,top:20}} onClick={() => this.SelectReturnFlights()}>
              Proceed to the Summary Of your booking
               </Button>
               </div>
               </Paper>
        </div>
    )
};

}
