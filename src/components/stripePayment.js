import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
//import Button from '@mui/material/Button';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
// sample function defined to compute total quantity of cart
// function computeQuantity(cart) {
//     return cart.reduce((count, itemInCart) => count + itemInCart.quantity, 0);
// }
// similar functions can be defined to compute total price, email of the user, etc.



// const onToken = (amount, description) => token =>
//   axios.post('http://localhost:8000/payments/charge',
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromEuroToCent(amount)
//     })


const FlightID = localStorage.getItem("FID");
const FlightID2 = localStorage.getItem("FID2");
const UserID = localStorage.getItem("CurrentUserID") // I will get i from the login page
const pass_port_number = localStorage.getItem("passport_numberH"); // I will get the passport from the login 
const price_flight = localStorage.getItem("Flight_Price");

// data for the departured flight
const From1H = localStorage.getItem("From1");
const DT1H = localStorage.getItem("DT1");
const AT1H = localStorage.getItem("AT1");
const AA1H = localStorage.getItem("AA1");
const DA1H = localStorage.getItem("DA1");
const To1H = localStorage.getItem("To1");
const DU1H = localStorage.getItem("DU1");
const D1H = localStorage.getItem("D1");


const From2H = localStorage.getItem("From2");
const To2H = localStorage.getItem("To2");
const DT2H = localStorage.getItem("DT2");
const AT2H = localStorage.getItem("AT2");
const AA2H = localStorage.getItem("AA2");
const DA2H = localStorage.getItem("DA2");
const DU2H = localStorage.getItem("DU2");
const D2H = localStorage.getItem("D2");

const userfirstname = localStorage.getItem("userfirstnameH")
const lastname = localStorage.getItem("lastnameH")
const email = localStorage.getItem("mailH")
console.log(lastname)
const prod = {
    name:"flight",
    price:price_flight*100
}

class CheckoutWithStripe extends React.Component {
    // onToken = (token) => {
    //     fetch('http://localhost:8000/payments/charge', {
    //       method: 'POST',
    //       body: JSON.stringify(data.body),
    //     }).then(response => {
    //       console.log("RESPONSE",response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //   }



    // onToken = (token) => {
    //     axios.post('http://localhost:8000/payments/charge',
    // {
    //   "source": token.id,
    //   "currency": "USD",
    //   "amount":1000
    // }).then(response => {
    //       console.log("RESPONSE",response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //   }

    constructor(props) {
        super(props);
        this.confirmFlight = this.confirmFlight.bind(this);
        this.sendMailer = this.sendMailer.bind(this);
        console.log(From1H)
        console.log(To1H)
        console.log(localStorage.getItem("Seats")+"hello")
        this.state = {
        
            FlightNumber: '',
            From:'',
            To:'',
            Date:'',
            Seats:'',
            Cabin:'',
            // for the mail send
            mail:'',
            userfirstname:'',
            userlastname:'',
            // from1:'',
            // to1:'',
            // price1:0,
            // from2:'',
            // to2:'',
            // price2:0,

   }
    }

    componentDidMount(){
        console.log("hello from pay: "+price_flight)

        console.log(userfirstname)
        

    }

    confirmFlight(){
        const f = {
            flights:FlightID,
            pricePayed:localStorage.getItem("Price"),
            NumberOfSeats:localStorage.getItem("Seats"),
            cabinType:localStorage.getItem("Cabin")

        }
        const p = {
            PassportNumber:pass_port_number
        }
        const f2 = {
            flights:FlightID2,
            pricePayed:localStorage.getItem("Price2"),
            NumberOfSeats:localStorage.getItem("Seats"),
            cabinType:localStorage.getItem("Cabin")

        }
        const constseatsForF = {
            resSeats:localStorage.getItem("Seats"),
            cabinType:localStorage.getItem("Cabin")
        }


        // this to edit the seats
        axios.post('http://localhost:8000/flights/updateSeats/' + FlightID, constseatsForF)
            .then(res => console.log(res.data));
            console.log("hello seating")

            axios.post('http://localhost:8000/flights/updateSeats/' + FlightID2, constseatsForF)
            .then(res => console.log(res.data));
            console.log("hello seatings2")

        axios.post('http://localhost:8000/users/bookFlight/' + UserID, f)
            .then(res => console.log(res.data));
            console.log("hello from confirmation")

        axios.post('http://localhost:8000/users/bookFlight/' + UserID, f2)
            .then(res => console.log(res.data));

        axios.post('http://localhost:8000/users/addPassPortNumber/' + FlightID, p)
            .then(res => console.log(res.data));
            console.log("pass: "+pass_port_number)

        axios.post('http://localhost:8000/users/addPassPortNumber/' + FlightID2, p)
            .then(res => console.log(res.data));
    }
    
    onToken= token =>{
        const body = {
            token,
            prod
        }
        // axios.post('http://localhost:8000/payments/charge',body)
        // .then(res => console.log(res.data));
   
        axios.post('http://localhost:8000/payments/charge',body)
        .then(res=>{
            this.confirmFlight();
            this.sendMailer();

        });
        alert('Your Payment has been done succsesfully , Thank you for booking with JA! Airlines');

        
        
    }
    sendMailer(){

        
       

        let data = {
            name:userfirstname,
            lastname:lastname,
            email:email,
            msg:"your departured flight with details: From: "+From1H+" ,To: "+To1H+" ,departured Time: "+DT1H+
            " ,Arrival Time: "+AT1H+" ,Departured Airport: "+DA1H+" ,Arrival Airport: "+AA1H+" ,Duration: "+DU1H+" ,price: "
            +localStorage.getItem("Price")+" ,number of seats: "+localStorage.getItem("Seats")+" ,Date: "+D1H+"\n" +"Your return flight with details: From: "+From2H+
            " ,To: "+To2H+" ,departured Time: "+DT2H+" ,Arrival Time: "+AT2H+" ,Departured Airport: "+DA2H+" ,Arrival Airport: "+AA2H+" ,Duration: "+DU2H+" ,price: "
            +localStorage.getItem("Price2")+" ,number of seats: "+localStorage.getItem("Seats") // here seats is undefined
            +" ,Date: "+D2H

        }
        console.log(From1H)
        console.log("hey from mailer "+data.email)
        axios.post('http://localhost:8000/users/sendWithNodeMailer' ,data)
        .then(res=>{
            this.setState({
                sent:true
            },this.resetForm)
        }).catch(()=>{
            console.log("message sent")
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
        {/* <div style={{position='absolute',top=120 }}> */}
      <Typography variant='h1' style={{ fontFamily:'monospace', color:'#ffff',pt:'250px',position:'relative',top: 30, left: 400,
       
      }}>
        Pay With Card
        </Typography>
      

           
            {/* <button onClick={this.confirmFlight} action="#">confirm</button> */}

            <StripeCheckout style={{position:'relative',top:30,left:550 , width:'400px', height:'100px'}}
                amount = {prod.price}
                name="Payment"
                // functions defined above can be used to add more information while making the API call.
                // description={`Order of ${computeQuantity(cart)} items!`}
                // image='LINKTOIMAGE'
                stripeKey="pk_test_51KFF0bJRBpyojyQVT6u2cNTiaXyshxjfWScqYeBg6N14fbkCGuBGcugW06Q94dC4GGmZD3HzRA85iS4oUzxZy5nl00buu6Iv7J"

                token={this.onToken}
                currency="USD"
                email='USER_EMAIL'
                // token={this.onToken}
                /> 
                </Paper> 
                </div>
                      
        );
    }
}

export default CheckoutWithStripe