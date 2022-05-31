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

export default class ChooseEditCriteria extends Component {
    
  constructor(props) {
    super(props);
    
        this.state = {

             FlightNumber: '',
             From:'',
             To:'',
             Date:'',
             Seats:0,
             Cabin:'',
             NumberOfBags:0,
             WeightOfBag:23,
             Price:0,
             Prices:[],
             NumberOfSeats:[]
    }
  }
  componentDidMount(){
    var id = window.location.pathname.split("/")[2]
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
    // NumberOfBags:n,
    // WeightOfBag:w,
    // Price:res.data.Price,
    Duration:res.data.Duration
        })
        console.log(this.state)
      
       axios.get('http://localhost:8000/Users/get-user/'+localStorage.getItem("CurrentUserID"))
     .then(res => {
       //console.log("res.data.cabin types  " +res.data.flights)
       this.setState({
         cabinTypes:res.data.cabinTypes,
         NumberOfSeats:res.data.seats,
         Flights:res.data.flights,
         Prices:res.data.prices
 
       })
       console.log("Prices Array "+this.state.Prices)
       var i =0;
       for(i=0;i<this.state.Flights.length;i++){
         if(this.state.Flights[i]==this.state.Fid){
          //  console.log(this.state)
          this.setState({
            index:i,
            Cabin:this.state.cabinTypes[this.state.index],
            Seats:this.state.NumberOfSeats[this.state.index],
            Price:this.state.Prices[this.state.index]
            
          })
          console.log(this.state.Prices[this.state.index])
          localStorage.setItem("Price22",this.state.Prices[this.state.index]);
           console.log("local storage price"+localStorage.getItem("Price22"))
          localStorage.setItem("Cabin22",this.state.cabinTypes[this.state.index]);
   
          localStorage.setItem("Seats22",this.state.NumberOfSeats[this.state.index]);
          localStorage.setItem("PriceOld",this.state.Prices[this.state.index]);
         
                  console.log("local storage CabinOld"+localStorage.getItem("CabinOld"))
                localStorage.setItem("CabinOld",this.state.cabinTypes[this.state.index]);
         
                localStorage.setItem("SeatsOld",this.state.NumberOfSeats[this.state.index]);
                localStorage.setItem("FIDOld",this.state.Fid)
     console.log(localStorage.getItem("FIDOld")+" FID OLDDDD")

          
          break;
          
         }}
        }
        
        );


       
       
     
    
     localStorage.setItem("From22",this.state.From);
     localStorage.setItem("To22",this.state.To);
     localStorage.setItem("Date22",this.state.Date);
     localStorage.setItem("FromOld",this.state.From);
     localStorage.setItem("ToOld",this.state.To);
     localStorage.setItem("DateOld",this.state.Date);
     

        
         }    
      );
    

   
   
    
    
    
};
EditCabin(){
    window.location='/EditCabin';
}
EditDate(){
    window.location='/EditDate';
}
EditBoth(){
  
   window.location='/EditBoth';
   
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
        
      <Typography variant='h2' style={{ fontFamily:'monospace', color:'#ffff',pt:'800px'}}>
          this is your old flight , choose a new flight 
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
                  <th>weight of  bag</th> 
                  <th>Date</th>
                </tr>
              <tbody>
               <td>{this.state.FlightNumber}</td> 
              <td>{this.state.DepartureTime}</td>
              <td>{this.state.ArrivalTime}</td>
              <td>{this.state.From}</td>
              <td>{this.state.To}</td>
              <td>{this.state.Duration}</td> 
              <td>{localStorage.getItem("Price22")}</td>
              <td>{localStorage.getItem("Cabin22")}</td>
              <td>{localStorage.getItem("Seats22")}</td>
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
       &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
       <Button onClick={() => this.EditDate() } style={{position:'absolute',top: 250,
        width: 250,
        height: 40,}}>
             Edit Date
               </Button>
               &nbsp;&nbsp;&nbsp;
               <Button onClick={() => this.EditCabin()}style={{position:'relative',top: 14, left: 270,
        width: 250,
        height: 40,
        }}>
             Edit Cabin Class
               </Button>
               &nbsp;&nbsp;&nbsp;
               <Button onClick={() => this.EditBoth()} style={{position:'relative',top: 14, left: 270,
        width: 250,
        height: 40,
        }}>
             Edit Cabin and Date
               </Button>
               </div>
               </Paper>
        </div>
        
    )
};

}
