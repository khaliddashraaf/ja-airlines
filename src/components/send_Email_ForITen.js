import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';


let msg = "";
let mail = "";
let name = "";
let FN = "";



let Dt = "";
let At = "";
let from = "";
let to = "";
let DA = "";
let AA = "";
let dur = "";
let date = "";

let iH = 0;


export default class Send_Email_For extends Component {

    constructor(props) {
        super(props);
    // this.sendMailer = this.sendMailer.bind(this);
    this.state = {
        From:'',
        To:'',
        price:'',
        flightsList:[],
        first_name:'',
        email:'',
        passportNumber: '',
        seatsList: [],
        paymentList:[],
        cabinTypesList:[],
        index:0,
        flightNumber:'',
        DepartureTime: '',
        ArrivalTime: '',
        From: '',
        To: '',
        DepartureAirport: '',
        ArrivalAirport: '',
        Date: '',
        Price:'',
        Duration:'',
        



    }
    }

    componentDidMount(){
        var id = window.location.pathname.split("/")[2];
        var Fid = window.location.pathname.split("/")[3];
        console.log(Fid)

        axios.get('http://localhost:8000/flights/FindMyFlight?ID='+Fid)
        .then(res=>{
            this.setState({
            flightNumber:res.data.FlightNumber,
            DepartureTime: res.data.DepartureTime,
            ArrivalTime: res.data.ArrivalTime,
            From: res.data.From,
            To: res.data.To,
            DepartureAirport: res.data.DepartureAirport,
            ArrivalAirport: res.data.ArrivalAirport,
            Date: res.data.Date,
            Price:res.data.Price,
            Duration:res.data.Duration


        })
        FN = this.state.flightNumber
         Dt = this.state.DepartureTime;
         At = this.state.ArrivalTime;
         from = this.state.From;
         to = this.state.To;
         DA = this.state.DepartureAirport;
         AA = this.state.ArrivalAirport;
         dur = this.state.Duration;
         date = this.state.Date;
         console.log(this.state.DepartureTime);
         console.log(Dt);
         localStorage.setItem("durMail", this.state.dur);
        //  Dt = localStorage.getItem("durMail");
        
    })


        axios.get('http://localhost:8000/users/get-user/'+id)
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
            mail = this.state.email;
            name = this.state.first_name;
            console.log(mail)



            console.log(this.state.flightsList.length)


            var i = 0;
            for(i = 0 ; i<this.state.flightsList.length ; i++){
                // console.log("hey inside for")
                // console.log(this.state.flightsList[i]== Fid)
              if(this.state.flightsList[i]==Fid){
                this.setState({
                  index:i
                  
                })
                console.log(this.state.index)
                console.log("hey inside if")
                // indexG++;
                break;
              }
              

            }
            


            

    console.log(FN);
            msg = "your flight details with number: "+FN+" with price: "+this.state.paymentList[this.state.index]+ " ,and cabin: "
            +this.state.cabinTypesList[this.state.index]+" ,From: "+from+" ,To: "+to
            +" ,Departure Time: "+Dt+" ,Arrival Time: "+At+
            " ,DepartureAirport: "+DA+" ,ArrivalAirport: "+AA+" ,Duration: "+dur+" ,Date: "+date+" ,number of seats: "+this.state.seatsList[this.state.index]


            

            
            
            console.log("hello "+this.state.seatsList[this.state.index])
        })

        
       

        .catch(function (error) {
            console.log(error);
          })



        //   this.sendMailer();
          
        
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
         
       <Typography variant='h4' style={{ fontFamily:'monospace', color:'#111111',pt:'800px', position:'relative',left:100,top:20}}>
       Do you want us to send you a new confirmatory email for this flight ? {this.state.flights}
         </Typography>
                   
              
         <Box sx={{pt:'20px', pl:'80px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} width='1300px' height='100px' display='inline-grid' alignItems='center'>
            {/* <Table striped bordered hover  style={{backgroundColor:'#ffff'}}className="table"> */}
           
            
            <Button method="post" onClick={this.sendEmail} action="#" >yes send  me an email</Button>

            </Box>
            </Paper>
            </div>

        )

}

sendEmail(event) {
        
    event.preventDefault();
    // use the global vars consts 

    const data = {
        service_id: 'service_gfkf4pn',
        template_id: 'template_tewog94',
        user_id: 'user_SrelKQpvWC9Iqm6txwOtO',
        template_params: {to_name: name,from_name:"Ja Air Lines",message:msg,email:mail}
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        
        body: JSON.stringify(data)
    })
    
    console.log(data);
    alert('An email has been sent to you with your flight details')
    
  }
}
