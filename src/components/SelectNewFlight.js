import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';

export default class SelectNewFlight extends Component {
    
  constructor(props) {
    super(props);
    
        this.state = {

             FlightNumber: '',
             From:'',
             To:'',
             Date:'',
             Seats:'',
             Cabin:'',
             NumberOfBags:0,
             WeightOfBag:23,
             NewPrice:0
    }
  }
  componentDidMount(){
    // const a =localStorage.getItem("FID");
    // console.log('and gowa select flight b print');
    // console.log(localStorage.getItem("Cabin"))
    // console.log(a);
     var id = window.location.pathname.split("/")[2]
    // localStorage.setItem("depID", id);

    // console.log("id : "+ id);
    // console.log(localStorage.getItem("depID"));
    // localStorage.setItem("FID", id);
    const x=localStorage.getItem("Cabin22").normalize();
    var pp=localStorage.getItem("Price22")
     console.log(pp+"PPPPP")
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
      Cabin:localStorage.getItem("Cabin22"),
      Seats:localStorage.getItem("Seats22"),
    })

    axios.get('http://localhost:8000/Flights/FindMyFlight?ID='+id)
    .then(res=>{
      // console.log(res.data.Price)
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
    NumberOfBags:n,
    WeightOfBag:w,
    Price:res.data.Price,
    Duration:res.data.Duration,
    
        })
        localStorage.setItem("FID22",this.state.Fid)
   
    
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
    // localStorage.setItem("Price22",u);
    // console.log("price now"+this.state.Price)
    var d=this.state.Price-pp
    // console.log("pp "+pp)
    this.setState({
        NewPrice:d
    })
    localStorage.setItem("PriceToBePayed",d)
    console.log("new pricedddd "+localStorage.getItem("PriceToBePayed"))
    // console.log(this.state.Price)

    // console.log(this.state.NewPrice)

    
         }    

      );
};
SummaryNewFlight(){
   console.log("Cabinnnn "+localStorage.getItem("Cabin"));
   console.log("From "+localStorage.getItem("From"));
   console.log("To "+localStorage.getItem("To"));
  //  console.log(this.props);
   window.location='/SummaryNewFlight';
   
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
      <Typography variant='h2' style={{position:'absolute',top:100,  left:500, fontFamily:'monospace', color:'#ffff',pt:'250px'}}>
          Your New Flight 
        </Typography>
             <div>
             <Box sx={{pt:'110px', pl:'80px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} width='1500px' height='200px' display='inline-grid' alignItems='center'>
           
             {/* <h3 style={{top:600}}>Your Departure Flight</h3> */}
             {/* <div> */}
               
             <Table striped bordered hover  style={{backgroundColor:'#ffff'}}className="table">
           {/* <Table className="table"> */}
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
                  <th>weight of  bag</th> 
                  <th>Date</th>
                  <th>Price Difference</th>
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
              <td>{this.state.NewPrice}</td>
              {/* <td> */}
             {/* <Link to={"/Select/" + props.flight._id}> Select</Link>  */}
            
 
            {/* <Link to={"/Select/" + this.state.FlightNumber}>Select</Link>
        
         </td> */}

              </tbody>
              </Table>
            </Box>
      
          
       </div>
       <div>
       <Button style={{position:'absolute',top:250,  left:550 , width:400}}  onClick={() => this.SummaryNewFlight()}>
              Confirm Booking
               </Button>
               <div></div>
               </div>
               </Paper>
        </div>
    )
};

}
