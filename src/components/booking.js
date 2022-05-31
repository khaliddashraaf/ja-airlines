import { Paper } from "@mui/material";
import { Typography} from '@material-ui/core';
import React , { Component } from "react";
import ElevateAppBar from './Appbar/UserNavBar'
import FlightIcon from '@mui/icons-material/Flight';
import { Divider, Chip } from "@mui/material";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import axios from "axios";
import Button from '@mui/material/Button';
class Booking extends Component{
    constructor (props) {
        super(props);
        // const {state} = this.props.location;
        this.state = {
            flights: [],
            depID: '',
            retID: '',
            user:{}

          };

    }
    async componentDidMount() {
        // console.log(localStorage.getItem("FID"))
        const depID = (localStorage.getItem("depID"))
        console.log(depID)
        let fls = []
        const retID = (localStorage.getItem("retID"))
        let u = {};
        console.log(localStorage.getItem("Cabin"))
        console.log(localStorage.getItem("Seats"))
        axios.get('http://localhost:8000/users/get-user/'+ localStorage.getItem('CurrentUserID'))
        .then(result => u = result.data)
        await axios.get('http://localhost:8000/Flights/FindMyFlight?ID=' + depID)
            .then(response => {
                fls.push(response.data)
                
            })
            .catch((error) => {
                console.log(error);
            })
        await axios.get('http://localhost:8000/Flights/FindMyFlight?ID=' + retID)
            .then(response => {
                fls.push(response.data)
                this.setState({
                    flights:fls,
                    depID:depID,
                    retID:retID,
                    user: u
                }, () =>{
                    // console.log(this.state)
                })
            })
            .catch((error) => {
                console.log(error);
            })
            // console.log(fls)
            console.log(this.state.flights)
    }
 
      
    render (){
        
        const flightss = this.state.flights;
        const depFlight = this.state.flights[0];
        const cabin = (localStorage.getItem("Cabin"))
        const seats = parseInt(localStorage.getItem("Seats"))
        const rows = [];
        let noDep = 0;
        let noRet = 0;
        let bookedDep = [];
        let bookedRet = [];
        let selectedDep = [];
        let selectedRet = [];
        let putCabin = '';
        if(flightss[0]){
            if(cabin === "FirstClass"){
                noDep = flightss[0].FirstClassSeats;
                noRet = flightss[1].FirstClassSeats;
                bookedDep = flightss[0].resFirstClassSeats;
                bookedRet = flightss[1].resFirstClassSeats;
                putCabin = "resFirstClassSeats";
            }
            else if(cabin === "Business"){
                noDep = flightss[0].BusinessSeats;
                noRet = flightss[1].BusinessSeats;
                bookedDep = flightss[0].resBusinessSeats;
                bookedRet = flightss[1].resBusinessSeats;
                putCabin = "resBusinessSeats";
            }
            else if(cabin === "Economy"){
                noDep = flightss[0].EconomySeats;
                noRet = flightss[1].EconomySeats;
                bookedDep = flightss[0].resEconomySeats;
                bookedRet = flightss[1].resEconomySeats;
                putCabin = "resEconomySeats";
            }
        }
        for (let index = 0; index < noDep && flightss[0]; index++) {
            rows.push({id: index+1, number:'A'+(index+1)})
            
        }
        const renderDepSeats = () => {
          let depSeats = []
          for (let i = 0; i < rows.length; i++) {
              depSeats.push(<AirlineSeatReclineNormalIcon onClick={() => handleSelectDepart(i)} style={{marginLeft: i !== 0 ? 20 : 0, width: 50, height: 50, cursor: 'pointer', color:  selectedDep.includes(i) ? 'disabled' : 'primary'}}/>)
        
            }
          return depSeats;
        }
        const renderRetSeats = () => {
            let retSeats = []
            for (let i = 0; i < rows.length; i++) {
                retSeats.push(<AirlineSeatReclineNormalIcon onClick={() => handleSelectRet(i)} style={{marginLeft: i !== 0 ? 20 : 0, width: 50, height: 50, cursor: 'pointer', backgroundColor: bookedRet.includes(i) || selectedRet.includes(i) ? 'disabled' : 'primary'}}/>)
            }
            return retSeats;
          }
        const handleSelectDepart = (i) => {
            const arr = selectedDep.slice();
            if(selectedDep.includes(i)){
                arr.splice(selectedDep.indexOf(i),1);
            }else if(selectedDep.length < seats){
                arr.push(i)
            }
            selectedDep = arr;
            console.log(selectedDep)
        }
        const handleSelectRet = (i) => {
            const arr = selectedRet.slice();
            if(selectedRet.includes(i)){
                arr.splice(selectedRet.indexOf(i),1);
            }else if(selectedRet.length < seats){
                arr.push(i)
            }
            selectedRet = arr;

        }
        const handleSubmit = () =>{
            const arrDep = bookedDep;
            arrDep.push(...selectedDep);
            const arrRet = bookedRet;
            arrRet.push(...selectedRet);
            if(flightss[0]){
                axios.put('http://localhost:8000/Flights/' + flightss[0].id, {putCabin : arrDep})
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                })
                axios.put('http://localhost:8000/Flights/' + flightss[1].id, {putCabin : arrRet})
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                })
                this.state.user.seatNumbers.push(selectedDep);
                this.state.user.seatNumbers.push(selectedRet);
                axios.post('http://localhost:8000/user/editseats/' + localStorage.getItem('CurrentUserID'),  this.state.user )
                .then(res => console.log(res))
                .catch(err => console.log(err))
                // axios.post('http://localhost:8000/booking/createBooking',{
                //     departureFlightID : flightss[0].id,
                //     returnFlightID : flightss[1].id,
                //     PassCount : seats,
                //     userID: 0,
                //     departureFlightSeats: selectedDep,
                //     returnFlightSeats: selectedRet
                // }).then(res => {
                //     this.props.history.push({pathname:'/'})
                // })
                // .catch(err =>{
                //     console.log(err)
                // })
                
                window.location='/SummaryFlight';
            }
        }        
        const retFlight = flightss[1];
        if(flightss[0]){
            console.log(flightss[0].FlightNumber)
        }
        // console.log(depFlight.FlightNumber);
        return (
            <Paper style={{alignItems:'center', backgroundColor:'#f2f2f2'}}>
                <ElevateAppBar />
                <Paper elevation={1} style={{width:'80%', margin:'auto', backgroundColor:'#fcfcfc', height:'2500px', display:'flex', alignItems:'center', flexDirection:'column'}}>                    
                    <Paper elevation={0} square style={{display:'flex', width:'100%', backgroundColor:'#D9A404', marginTop:'20px', height:'90px'}}>
                        <Typography variant='h4' style={{marginLeft:'30px', color:'#024059', marginTop:'auto', marginBottom:'auto '}}>
                            BOOKING - Details
                        </Typography>
                    </Paper>
                    <Paper elevation={2} style={{width:'98%', display:'flex', alignItems:'center', flexDirection:'column', height:'1200px', backgroundColor:'#f2f2f2', marginTop:'20px'}}>
                        <Paper elevation={2} sx={{pt:'10px', pb:'10px'}} style={{backgroundColor:'#024059', width:'100%'}}>
                            <Typography variant='h4' style={{marginLeft:'30px', color:'#d9a404'}}>
                                Departure Trip Information
                            </Typography>
                            <Typography variant='subtitle1' style={{marginLeft:'30px', color:'#fff'}}>
                                Flight Number: {flightss[0] && flightss[0].FlightNumber}
                            </Typography>
                        </Paper>
                        <Paper sx={{pt:'16px'}} style={{display:'flex', alignItems:'center', flexDirection:'row', height:'600px', width:'100%'}}>
                            <Paper square elevation={0} sx={{}} style={{ height:'500px', width:'50%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <Paper elevation={0} sx={{ml:'-200px', mt:'10px'}} style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                    <FlightIcon sx={{mr:'10px'}}></FlightIcon>

                                    <Typography variant="h6">{flightss[0] && flightss[0].DepartureAirport} - {flightss[0] && flightss[0].ArrivalAirport}</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ml:'-200px', mt:'0px'}}>
                                    <Typography variant="subtitle1" >{flightss[0] && flightss[0].Date}</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ml:'-400px', mt:'60px'}}>
                                    <Typography variant="subtitle1" >{flightss[0] && flightss[0].DepartureTime} {flightss[0] && flightss[0].From}</Typography>
                                    {/* <Typography variant="subtitle1" >Cairo Airport (CAI)</Typography> */}
                                    <Divider orientation="vertical">
                                        <Chip label="TO" />
                                    </Divider>
                                    <Typography variant="subtitle1" >{flightss[0] && flightss[0].ArrivalTime} {flightss[0] && flightss[0].To}</Typography>
                                    {/* <Typography variant="subtitle1" >Cairo Airport (CAI)</Typography> */}

                                </Paper>

                            </Paper>
                            <Divider orientation="vertical"></Divider>
                            <Paper square elevation={0} style={{ height:'150px', width:'50%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <Typography variant="body1">Cabin: {cabin}</Typography>
                                <Typography variant="body1">Nummber of Seats: {seats}</Typography>
                                <Typography variant="body1">Price: 500EUR</Typography>
                            </Paper>
                        </Paper>
                        <Paper elevation={2} style={{width:'98%', display:'flex', alignItems:'center', flexDirection:'column', height:'200px', backgroundColor:'#f2f2f2', marginTop:'0px'}}>
                            <Paper elevation={2} sx={{pt:'10px', pb:'10px'}} style={{backgroundColor:'#d9a404', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <Typography variant="h4" style={{color:'#024059'}}>Choose seats</Typography>
                            </Paper>
                            <Paper sx={{pt:'16px'}} style={{display:'flex', alignItems:'center', flexDirection:'row', height:'600px', width:'100%'}}>
                                {/* Seats Loop goes here */}
                                {/* if not available : disabled, selected : success */}
                                <Paper elevation={0} style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                    {/* <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon>
                                    <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon>
                                    <Divider orientation="horizontal"></Divider>
                                    <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon>
                                    <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon> */}
                                    {renderDepSeats()}
                                </Paper>
                              
                                
                            </Paper>
                        </Paper>

                    </Paper>
                    <Paper elevation={2} style={{width:'98%', display:'flex', alignItems:'center', flexDirection:'column', height:'200px', backgroundColor:'#f2f2f2', marginTop:'20px'}}>
                        <Paper elevation={2} sx={{pt:'10px', pb:'10px'}} style={{backgroundColor:'#024059', width:'100%'}}>
                            <Typography variant='h4' style={{marginLeft:'30px', color:'#d9a404'}}>
                                Return Trip Information
                            </Typography>
                            <Typography variant='subtitle1' style={{marginLeft:'30px', color:'#fff'}}>
                                Flight Number: {flightss[1] && flightss[1].FlightNumber}
                            </Typography>
                        </Paper>
                        <Paper sx={{pt:'16px'}} style={{display:'flex', alignItems:'center', flexDirection:'row', height:'600px', width:'100%'}}>
                            <Paper square elevation={0} sx={{}} style={{ height:'500px', width:'50%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <Paper elevation={0} sx={{ml:'-200px', mt:'10px'}} style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                    <FlightIcon sx={{mr:'10px'}}></FlightIcon>

                                    <Typography variant="h6">{flightss[1] && flightss[1].DepartureAirport} - {flightss[1] && flightss[1].ArrivalAirport}</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ml:'-200px', mt:'0px'}}>
                                    <Typography variant="subtitle1" >{flightss[1] && flightss[1].Date}</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ml:'-400px', mt:'60px'}}>
                                    <Typography variant="subtitle1" >{flightss[1] && flightss[1].DepartureTime} {flightss[1] && flightss[1].From}</Typography>
                                    {/* <Typography variant="subtitle1" >Cairo Airport (CAI)</Typography> */}
                                    <Divider orientation="vertical">
                                        <Chip label="TO" />
                                    </Divider>
                                    <Typography variant="subtitle1" >{flightss[1] && flightss[1].ArrivalTime} {flightss[1] && flightss[1].To}</Typography>
                                    {/* <Typography variant="subtitle1" >Cairo Airport (CAI)</Typography> */}

                                </Paper>

                            </Paper>
                            <Divider orientation="vertical"></Divider>
                            <Paper square elevation={0} style={{ height:'150px', width:'50%', display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <Typography variant="body1">Cabin: {cabin}</Typography>
                                <Typography variant="body1">Nummber of Seats: {seats}</Typography>
                                <Typography variant="body1">Price: 500EUR</Typography>
                            </Paper>
                        </Paper>
                        <Paper elevation={2} style={{width:'98%', display:'flex', alignItems:'center', flexDirection:'column', height:'200px', backgroundColor:'#f2f2f2', marginTop:'0px'}}>
                            <Paper elevation={2} sx={{pt:'10px', pb:'10px'}} style={{backgroundColor:'#d9a404', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <Typography variant="h4" style={{color:'#024059'}}>Choose seats</Typography>
                            </Paper>
                            <Paper sx={{pt:'16px'}} style={{display:'flex', alignItems:'center', flexDirection:'row', height:'600px', width:'100%'}}>
                                {/* Seats Loop goes here */}
                                {/* if not available : disabled, selected : success */}
                                <Paper elevation={0} style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
                                    {/* <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon>
                                    <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon>
                                    <Divider orientation="horizontal"></Divider>
                                    <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon>
                                    <AirlineSeatReclineNormalIcon color="disabled"></AirlineSeatReclineNormalIcon> */}
                                    {renderRetSeats()}
                                </Paper>
                              
                                
                            </Paper>
                        </Paper>

                    </Paper>
                <Button onClick={() => handleSubmit()} variant="outlined" style={{margin:'auto', marginBottom:'50px'}}> Reserve</Button>


                </Paper>

            </Paper>
        )
    }
}
export default Booking;