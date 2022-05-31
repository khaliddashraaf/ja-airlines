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

const userID =  localStorage.getItem("CurrentUserID") 
localStorage.setItem("UserIDCONF",userID)
export default class SummaryNewFlight extends Component {
    
  constructor(props) {
    super(props);
    
        this.state = {
        
             FlightNumber: '',
             From:'',
             To:'',
             Date:'',
             Seats:'',
             Cabin:'',
             FlightNumber2: '',
             From2:'',
             To2:'',
             Date2:'',
             Seats2:'',
             Cabin2:''
    }
  }
  componentDidMount(){
    const a =localStorage.getItem("FIDOld");
    const a2=localStorage.getItem("FID22");
    const c=localStorage.getItem("Cabin22");
    const s=localStorage.getItem("Seats22")
    const x=localStorage.getItem("Cabin22").normalize();
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
     Cabin:c,
     Seats:s,
     NumberOfBags:n,
     WeightOfBag:w
    })
    axios.get('http://localhost:8000/Flights/FindMyFlight?ID='+a)
    .then(res=>{
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
     Price:localStorage.getItem("PriceOld"),
     Cabin:localStorage.getItem("CabinOld"),
    Duration:res.data.Duration
        })
        var p= this.state.Price
        console.log("prie now "+this.state.Price)
        // if(x=="Economy" ){
          
        //   p=p
        // }
        // else if(x=="Business"){
          
        //   p=p*1.4
        // }
        // else {
          
        //   p=p*1.8
        // }
        // var u=p*this.state.Seats
        // console.log("u   "+u)
        //  this.setState({
        //    Price:u
        //  })
             
        
         }    
      );
      axios.get('http://localhost:8000/Flights/FindMyFlight?ID='+a2)
    .then(res=>{
        this.setState({
            FlightNumber2:res.data.FlightNumber,
    DepartureTime2: res.data.DepartureTime,
    ArrivalTime2: res.data.ArrivalTime,
    From2: res.data.From,
    To2: res.data.To,
    DepartureAirport2: res.data.DepartureAirport,
    ArrivalAirport2: res.data.ArrivalAirport,
    EconomySeats2: res.data.EconomySeats,
    BusinessSeats2: res.data.BusinessSeats,
    FirstClassSeats2: res.data.FirstClassSeats,
    Date2: res.data.Date,
    Fid2:res.data._id,
    Price2:localStorage.getItem("Price22"),
     Cabin2:localStorage.getItem("Cabin22"),
    Duration2:res.data.Duration,
    Price3:localStorage.getItem("PriceToBePayed"),
        })
        var p2= this.state.Price2
        // console.log("prie now "+p)
        if(x=="Economy" ){
          
          p2=p2
        }
        else if(x=="Business"){
          
          p2=p2*1.4
        }
        else {
          
          p2=p2*1.8
        }
        var u2=p2*this.state.Seats
        var o=u2+this.state.Price
        console.log(this.state.Price3)
         this.setState({
           Price2:u2
        //    Price3:o
         })
        console.log(this.state.Price3)
        localStorage.setItem("price2",this.state.Price2)
        localStorage.setItem("price_to_be_paid",this.state.Price3)
         }    
      );
      console.log("zeftttt "+this.state.Price)

};
SelectReturnFlights(){
   localStorage.setItem("FID2", this.state.Fid);
  // localStorage.setItem("From2", this.state.To);
  // localStorage.setItem("To2", this.state.From);
  window.location='/Home';

 
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
        {/* <div style={{position='absolute',top=120 }}> */}
      <Typography variant='h4' style={{ fontFamily:'monospace', color:'#ffff',pt:'250px',position:'relative',top: 30, left: 400,
       
      }}>
        The Itenary For your Old Flight
        </Typography>
        {/* </div> */}
             
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
              {/* <td> */}
            {/* <Link to={"/Select/" + props.flight._id}> Select</Link>  */}
            {/* <Link to={"/Select/" + this.state.FlightNumber}>Select</Link>
        
        </td> */}

              </tbody>
            </Table>
            </Box>
          
       </div>
      
       
        
       
      <Typography  variant='h4' style={{ fontFamily:'monospace', color:'#ffff',position:'relative',top: 20, left: 400}}>
          The Itenary For Your New Flight
        </Typography>
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
              <td>{this.state.FlightNumber2}</td> 
              <td>{this.state.DepartureTime2}</td>
              <td>{this.state.ArrivalTime2}</td>
              <td>{this.state.From2}</td>
              <td>{this.state.To2}</td>
              <td>{this.state.Duration2}</td> 
              <td>{this.state.Price2}</td>
              <td>{this.state.Cabin2}</td>
              <td>{this.state.Seats}</td>
              <td>{this.state.NumberOfBags}</td>
              <td>{this.state.WeightOfBag}</td>
              {/* {/* <td>{this.state.FirstClassSeats}</td> */}
              <td>{this.state.Date2}</td>
              {/* <td> */}
              {/* <td> */}
            {/* <Link to={"/Select/" + props.flight._id}> Select</Link>  */}
            
 
            {/* <Link to={"/Select/" + this.state.FlightNumber}>Select</Link>
        
        </td> */}

              </tbody>
            </Table> 
            </Box>
      
       <div>
         
         <p>
         <Typography variant='h5' style={{ fontFamily:'monospace', color:'#ffff',pt:'250px',position:'relative',left:200,top:80}}>
         Total price paid:{this.state.Price3}
        </Typography>
        </p>
       </div>
       
               <div>
               
       
         {/* <p>total price paid:{this.state.Price3}</p> */}

       </div>
       <div>
         <Button style={{position:'relative',left:300,top:80}}>
           <Link to={{pathname:'/SeatsNewFlight'}}>Select Seats</Link>
           </Button>
           <Button style={{position:'relative',left:500,top:80}}>
                  <Link to={"/chargeForChange/"}>Proceede To Pay</Link>
                  </Button>
       
       {/* <button onClick={() => this.SelectReturnFlights()}>
              Return to Homepage
               </button> */}
               </div>
               </Paper>
       </div>
        
    )
};

}
