import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';



let name = "";
let mail = "";
let msg = "";
let Fprice = 0;
let indexG = 0;

export default class Confirm_cancel extends Component {
    constructor(props) {
        super(props);

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

    componentDidMount() {
        var id = window.location.pathname.split("/")[2];
        console.log(id)
        var Uid = window.location.pathname.split("/")[3];
        axios.get(`http://localhost:8000/users/get-confirmation/${id}/user/${Uid}`)
        .then(res => {

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
                Fid:id,
                userid:Uid,
                price:res.data.Price,
                


            })
            console.log(this.state.price)

        })
        .catch(function (error) {
            console.log(error);
          })

        axios.get('http://localhost:8000/users/get-user/'+Uid)
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
            name = this.state.first_name;
            mail = this.state.email;
            

            msg = "your flight with number "+this.state.FlightNumber+" is canceled, we will make a rfund of the flight price which is: "+this.state.price;
            Fprice = this.state.price;
           

            console.log("here is the name "+name)
            console.log("here is the price "+Fprice)
            console.log("here is the mail "+mail)
            console.log("here is the passport "+this.state.passportNumber)
            console.log(msg)


            var i = 0;
            var c = 0;
            for(i = 0 ; i<this.state.flightsList.length ; i++){
              
              if(this.state.flightsList[i]==id){
                this.setState({
                  index:i
                })
                console.log("hey inside if")
                // indexG++;
                break;
              }

            }

            
            
            console.log("hello "+this.state.seatsList[this.state.index])
        })

        
       

        .catch(function (error) {
            console.log(error);
          })

          
    }
   

    cancelFlight(id){

      
      

      
        const x = {
            flights:id,
            cabinTypes:this.state.cabinTypesList[this.state.index],
            prices:this.state.paymentList[this.state.index],
            seats:this.state.seatsList[this.state.index]


            // users.prices.splice(users.prices.indexOf(req.body.pricePayed),1);
            // users.cabinTypes.splice(users.prices.indexOf(req.body.cabinType),1);
            // users.seats.splice(users.prices.indexOf(req.body.NumberOfSeats),1);


        }
        const y = {
            passport_number:this.state.passportNumber

        }
        const z = {
          resSeats : this.state.seatsList[this.state.index],
          cabinType : this.state.cabinTypesList[this.state.index]
        }

        
        

        
            console.log(id)

            axios.post('http://localhost:8000/flights/updateSeatsInCancel/' + this.state.Fid, z)
            .then(res => console.log(res.data));
            console.log("hello seating")
            
            axios.post('http://localhost:8000/users/cancel/'+this.state.userid,x)
              .then(res => { console.log(res.data)});

              axios.post('http://localhost:8000/users/removePassport/'+this.state.Fid,y)
              .then(res => { console.log(res.data)});

      alert('Your Flight has been Canceled  Successfully');
              
          
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
       
     <Typography variant='h2' style={{ fontFamily:'monospace', color:'#ffff',pt:'800px',position:'relative',left:100,top:50}}>
         My  Flight 
       </Typography>
       
           
            <Box sx={{pt:'50px', pl:'80px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} width='1300px' height='100px' display='inline-grid' alignItems='center'>
          <Table striped bordered hover  style={{backgroundColor:'#ffff'}}className="table">
            
                <tr>
                  <th>Flight Number</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Departure Airport</th>
                  <th>Arrival Airport</th>
                  <th>Price</th>
                  <th>Date</th>
                  
                </tr>
                <tbody>

                <td>{this.state.FlightNumber}</td>
              <td>{this.state.DepartureTime}</td>
              <td>{this.state.ArrivalTime}</td>
              <td>{this.state.From}</td>
              <td>{this.state.To}</td>
              <td>{this.state.DepartureAirport}</td>
              <td>{this.state.ArrivalAirport}</td>
              <td>{this.state.paymentList[this.state.index]}</td>
              <td>{this.state.Date}</td>

              <Button method="post" onClick={this.sendEmail} action="#" >
              <a style={{color:'#ffff'}}href="#" onClick={() => this.cancelFlight(this.state.Fid)}>confirm</a> 
                </Button>
                </tbody>
            
            </Table>
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
        
      }
}

