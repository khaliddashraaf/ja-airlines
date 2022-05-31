import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';

const Old_FID = localStorage.getItem("FIDOld");
const total_price = localStorage.getItem("price_to_be_paid");
const new_FID = localStorage.getItem("FID22");
const UID = localStorage.getItem("UserIDCONF");
const pass_port_number = localStorage.getItem("passport_numberH"); // will be from local storage
 

const prod = {
    name:"flight",
    price:total_price*100
}

class ChargeChangedFlight extends React.Component {

    
    constructor(props) {
        super(props);
    this.confirmFlight = this.confirmFlight.bind(this);
    this.cancelFlight = this.cancelFlight.bind(this);


    this.state = {
        DepartureTime: '',
        DepartureAirport:'',
        Fid:'',
        ToDB:'',
        FromDB:'',
        DateDB:'',
        Fid:'',
        userid:'',
        first_name:'',
        email:'',
        FlightNumber:'',
        price:'',
        passportNumber:'',
        flightsList:[],
        seatsList:[],
        paymentList:[],
        cabinTypesList:[],
        index:0,
        details: []};




    }
    componentDidMount(){
        console.log(Old_FID+"alia")
        console.log(new_FID);
        console.log(UID+"alia")

        console.log(localStorage.getItem("Seats22"))



        



        axios.get('http://localhost:8000/users/get-user/'+UID)
        .then(res => {

            this.setState({
               first_name : res.data.first_name,
               email : res.data.email,
               passportNumber: res.data.passport_number,
               flightsList: res.data.flights,
               seatsList: res.data.seats,
               paymentList:res.data.prices,
              cabinTypesList:res.data.cabinTypes

            })
            console.log(this.state.email)


            var i = 0; 
            for(i = 0 ; i<this.state.flightsList.length ; i++){
              
                if(this.state.flightsList[i]==Old_FID){
                  this.setState({
                    index:i
                  })
                  console.log("hey inside if")
                  // indexG++;
                  break;
                }
  
              }
              console.log("found in : "+this.state.index)


        })
        
        .catch(function (error) {
            console.log(error);
          })

         
    }

    cancelFlight(){


        console.log("this the canceled on : "+this.state.flightsList[this.state.index])
        console.log("found in : "+this.state.index)
        const x = {
            // here we need the old values for the ld flight
            flights:Old_FID,
            cabinTypes:this.state.cabinTypesList[this.state.index],
            prices:this.state.paymentList[this.state.index],
            seats:this.state.seatsList[this.state.index]


        }

        const y = {
            passport_number:pass_port_number

        }

        axios.post('http://localhost:8000/users/cancel/'+UID,x)
              .then(res => { console.log(res.data)});

        axios.post('http://localhost:8000/users//removePassport/'+Old_FID,y)
        .then(res => { console.log(res.data)});



        const z = {
            resSeats : this.state.seatsList[this.state.index],
            cabinType : this.state.cabinTypesList[this.state.index]
          }
  
        
  
            axios.post('http://localhost:8000/flights/updateSeatsInCancel/' + Old_FID, z)
            .then(res => console.log(res.data));
            console.log("hello seating")
    }


    confirmFlight(){
        const f = {
            flights:new_FID,
            pricePayed:localStorage.getItem("Price22"),
            NumberOfSeats:localStorage.getItem("Seats22"),
            cabinType:localStorage.getItem("Cabin22")

        }
        const p = {
            PassportNumber:pass_port_number
        }
        const constseatsForF = {
            resSeats:localStorage.getItem("Seats"),
            cabinType:localStorage.getItem("Cabin")
        }


        


        // this to edit the seats
        axios.post('http://localhost:8000/flights/updateSeats/' + new_FID, constseatsForF)
            .then(res => console.log(res.data));
            console.log("hello seating")
        

        axios.post('http://localhost:8000/users/bookFlight/' + UID, f)
            .then(res => console.log(res.data));
            console.log("hello from confirmation")

        axios.post('http://localhost:8000/users/addPassPortNumber/' + new_FID, p)
            .then(res => console.log(res.data));
            console.log("pass: "+pass_port_number)

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
            
            this.cancelFlight();
            this.confirmFlight();

        });

        
        
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
        <StripeCheckout  style={{position:'relative',top:30,left:550 , width:'400px', height:'100px'}}
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
export default ChargeChangedFlight