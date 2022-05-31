import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Table from 'react-bootstrap/Table'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';

const UserID = localStorage.getItem("CurrentUserID"); 
const prod = {
  name:"flight",
  price:5000
}


export default class SummaryFlight extends Component {
  // onToken= token =>{
  //   const body = {
  //       token,
  //       prod
  //   }
  //   axios.post('http://localhost:8000/payments/charge',body)
  //   .then(res => console.log(res.data));
  // }
  
    
  constructor(props) {

    
    super(props);
    console.log("hey"+localStorage.getItem("UserIDH"))
        this.state = {
        
             FlightNumber: '',
             From:'',
             To:'',
             Date:'',
             Seats:'',
             Cabin:'',
             // for the next

             userfirstname:'',
             lastname:'',
             mail:'',
             passport_number:'',

             Price3:0 
    }
  }
  componentDidMount(){
    const a =localStorage.getItem("FID");
    const a2=localStorage.getItem("FID2");
    const c=localStorage.getItem("Cabin");
    const s=localStorage.getItem("Seats")
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
    Price:res.data.Price,
    Duration:res.data.Duration
        })
        localStorage.setItem("Price", this.state.Price);


        localStorage.setItem("From1", this.state.From);
        localStorage.setItem("To1", this.state.To);
        localStorage.setItem("price1",this.state.Price);
        localStorage.setItem("DT1",this.state.DepartureTime);
        localStorage.setItem("AT1",this.state.ArrivalTime);
        localStorage.setItem("AA1",this.state.ArrivalAirport);
        localStorage.setItem("DA1",this.state.DepartureAirport);
        localStorage.setItem("DU1",this.state.Duration);
        localStorage.setItem("D1",this.state.Date)




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
    Price2:res.data.Price,
    Duration2:res.data.Duration,
    // Price3:this.state.Price+res.data.Price
        })



        // to get the data of the user

        axios.get('http://localhost:8000/users//get-user/'+localStorage.getItem("CurrentUserID"))
        .then(res=>{
            this.setState({
                userfirstname:res.data.first_name,
                lastname:res.data.last_name,
                mail:res.data.email,
                passport_number:res.data.passport_number
            })

            localStorage.setItem("userfirstnameH", this.state.userfirstname);
        localStorage.setItem("lastnameH", this.state.lastname);
        localStorage.setItem("mailH", this.state.mail);
        localStorage.setItem("passport_numberH", this.state.passport_number);
        console.log("hello00: "+localStorage.getItem("mailH"))

        console.log(this.state.userfirstname)
            console.log(this.state.lastname)
            console.log(this.state.mail)
            
        })


        localStorage.setItem("Price2", this.state.Price2);
        localStorage.setItem("Flight_Price", this.state.Price3);

        localStorage.setItem("From2", this.state.From2);
        localStorage.setItem("To2", this.state.To2);
        localStorage.setItem("DT2",this.state.DepartureTime2);
        localStorage.setItem("AT2",this.state.ArrivalTime2);
        localStorage.setItem("AA2",this.state.ArrivalAirport2);
        localStorage.setItem("DA2",this.state.DepartureAirport2);
        localStorage.setItem("DU2",this.state.Duration2);
        localStorage.setItem("D2",this.state.Date2)

        

  //  console.log("hello: "+localStorage.getItem("Flight_Price"))


       
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
         this.setState({
           Price2:u2,
           Price3:u2+this.state.Price
         })
         console.log(this.state.Price2)
         console.log(this.state.Price3)
        localStorage.setItem("price2",this.state.Price2)
         }    
      );

};
SelectReturnFlights(){
   localStorage.setItem("FID2", this.state.Fid);
  // localStorage.setItem("From2", this.state.To);
  // localStorage.setItem("To2", this.state.From);

   // I added the price also to the local storage (Alia)
   
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
       Your Departure Flight
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
       <div>
       <Typography  variant='h4' style={{ fontFamily:'monospace', color:'#ffff',position:'relative',top: 40, left: 400}}>
         Return Flight
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
              <td>{this.state.Cabin}</td>
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
      
       </div>
       <div>
         <p>
         <Typography variant='h5' style={{ fontFamily:'monospace', color:'#ffff',pt:'250px',position:'relative',left:200,top:80}}>
           Total Price To Buy:{this.state.Price3}
           </Typography>
           </p>
       </div>
       <div>
       {/* <StripeCheckout
                amount = {this.state.Price3*100}
                name="STRIPE_INTEGRATION"
                // functions defined above can be used to add more information while making the API call.
                // description={`Order of ${computeQuantity(cart)} items!`}
                // image='LINKTOIMAGE'
                stripeKey="pk_test_51KFF0bJRBpyojyQVT6u2cNTiaXyshxjfWScqYeBg6N14fbkCGuBGcugW06Q94dC4GGmZD3HzRA85iS4oUzxZy5nl00buu6Iv7J"

                token={this.onToken}
                currency="usd"
                email='USER_EMAIL'
                // token={this.onToken}
                />   */}
                <Button style={{position:'relative',top:100,left:200 , color :'#fffff'}} >
                Proceede To Pay
                  <Link  to={"/charge/"}>Proceede To Pay</Link>
                 
                  </Button>
                  

       </div>
       {/* <div> */}
       {/* <button onClick={() => this.SelectReturnFlights()}>
              Return to Homepage
               </button>
               </div> */}
               </Paper>
        </div>
        
    )
};

}
