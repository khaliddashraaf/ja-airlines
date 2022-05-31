import axios from "axios";
import React , {useEffect , useState} from "react";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { Button, Paper , Typography } from "@mui/material";
import ElevateAppBar from './Appbar/UserNavBar'



const SelectSeats = () => {
    const userID = localStorage.getItem('CurrentUserID');
    const [loading, setLoading] = useState(true);
    const [flight, setFlight] = useState({});
    const [user, setUser] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const flightID = localStorage.getItem('FID22');
    const cabin = localStorage.getItem('Cabin22')
    let cabinStr = '';
    let cabinStr2 = '';
    let seats = parseInt(localStorage.getItem("Seats22"), 10)
    if (cabin === "Economy") {
        cabinStr = ("resEconomySeats");
        cabinStr2 = ("EconomySeats")
    }
    else if (cabin === "Business") {
        cabinStr = ("resBusinessSeats");
        cabinStr2 = ("BusinessSeats")

    }
    else {
        cabinStr = ("resFirstClassSeats");
        cabinStr2 = ("FirstClassSeats")

    }
    
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8000/flights/get-flight/' + flightID)
        .then(result => {
            setFlight(result.data);
            setBookedSeats(result.data[cabinStr])
            
        })
        .catch(err => console.log(err))
        axios.get('http://localhost:8000/users/get-user/'+ userID)
        .then(result => {
            setUser(result.data);
        })
        .catch(err => console.log(err))

        setLoading(false);
    }, [])

    const handleSelectDepart = (i) => {
        let depSeats = selectedSeats.slice();
        console.log(depSeats)
        console.log(i)
        if(flight[cabinStr].includes(i)){}
        else {
            if(selectedSeats.includes(i)){
                depSeats.splice(selectedSeats.indexOf(i),1);
            }else if(depSeats.length < seats){
                depSeats.push(i)
            }
            setSelectedSeats(depSeats);
        }
    }

    const handleSubmit = () =>{

        const newDep = flight[cabinStr].concat(selectedSeats)
        flight[cabinStr] = newDep

        user.seatNumbers.push(selectedSeats);
        console.log(flight[cabinStr])
        if(selectedSeats.length === seats){
            axios.post('http://localhost:8000/flights/update/' + flight._id, flight)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
            axios.post('http://localhost:8000/user/editseats/' + userID, user )
            .then(res => console.log(res))
            .catch(err => console.log(err))
            alert('Seats Reserved');
            window.location = '/chargeForChange' 
        }
        else {
            alert('Select ' + seats + ' seats')
        }
    }

    const renderSeats = () => {
        let render = [];
        let seats = [];
        let maxSeats = 0;
        let seatCt = (flight[cabinStr2])
        if(seatCt <= 12){
            maxSeats = 3;
        } else if (seatCt <= 20){
            maxSeats = 5;
        } else if (seatCt <= 28){
            maxSeats = 7;
        } else if (seatCt <= 40){
            maxSeats = 10;
        } else {
            maxSeats = 15;
        }
        for (let i = 0; i < seatCt; i++) {
            seats.push(<AirlineSeatReclineNormalIcon key={i} onClick={() => handleSelectDepart(i)} style={{marginLeft: i !== 0 ? 10 : 0, width: 50, height: 50, cursor: 'pointer'}} color= {bookedSeats && bookedSeats.includes(i) ? 'disabled' : (selectedSeats && selectedSeats.includes(i) ? 'success' : 'primary')}/>);            
        }
        while(seats.length > 0){
            render.push(seats.splice(0, maxSeats));
        }
        return render
    }
    return(
        <Paper>
            <ElevateAppBar/>
        <Paper elevation={2} style={{ width:'90%', display:'flex', alignItems:'center', flexDirection:'column', backgroundColor:'#f2f2f2', marginLeft:'auto' ,marginRight:'auto',  marginTop:'40px', height:'350px'}}>
            <Paper elevation={2} sx={{pt:'10px', pb:'10px'}} style={{backgroundColor:'#d9a404', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h4" style={{color:'#024059'}}>Choose New Flight seats</Typography>
            </Paper>
            <Paper sx={{pt:'16px'}} style={{display:'flex', alignItems:'center', flexDirection:'column', width:'100%', backgroundColor:'#f2f2f2', justifyContent:'center', height:'350px'}}>
 
                {loading ? 
                <Paper></Paper>                
                :
                renderSeats().map((item, index) => {
                    return(
                        <Paper key={index + 20000} elevation={0} style={{display:'flex', alignItems:'center', flexDirection:'row', backgroundColor:'#f2f2f2'}}>
                            {item}
                        </Paper>
                    )
                })
            }
                <Button style={{marginTop:'20px'}} onClick={() => handleSubmit()}>Pay</Button>

            </Paper>
        </Paper>
        </Paper>
    )

}

export default SelectSeats;