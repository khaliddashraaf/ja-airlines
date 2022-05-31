import React, { useState , useEffect} from "react";
import axios from "axios";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { Button, Paper , Typography } from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import ElevateAppBar from './Appbar/UserNavBar'

const EditSeats = () => {
    let location = useLocation();
    const search = location.search.replace('?','');
    const flightID = search.split('/')[0];
    const magicIndex = search.split('/')[1];
    const userID = '61d88b8a60b9a0246948acc6';
    let cabin = '';
    const [seats, setSeats] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [flight, setFlight] = useState({});
    // let user = {};
    const [user, setUser] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    
    const [cabinStr,setCabinStr] = useState('');
    const [cabinStr2,setCabinStr2] = useState('');
    

    
    

    const getData = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/flights/get-flight/' + flightID);
        setFlight(res.data);
        const res2 = await axios.get('http://localhost:8000/users/get-user/'+ userID);
        setUser(res2.data);
        setSeats(res2.data.seats[magicIndex])
        console.log(res2.data);
        cabin = res2.data.cabinTypes[magicIndex];
        console.log(cabin)
        // let arr = []
        // for (let index = 0; index < seatz.length; index++) {
        //     const element = seatz[index];
        //     let arr2 = [];
        //     for (let ii = 0; ii < element; ii++) {
        //         arr2.push(ii)
                
        //     }
        //     arr.push(arr2);
        // }
        // user.seatNumbers = arr
        // console.log(user.seatNumbers);

        setSelectedSeats(user.seatNumbers[magicIndex]);

        if (cabin === "Economy") {
            setCabinStr("resEconomySeats");
            setCabinStr2("EconomySeats")
        }
        else if (cabin === "Business") {
            setCabinStr("resBusinessSeats");
            setCabinStr2("BusinessSeats")

        }
        else {
            setCabinStr("resFirstClassSeats");
            setCabinStr2("FirstClassSeats")
    
        }
        const arrBooked = flight[cabinStr];
        const arrSelected = selectedSeats;
        for (let index = 0; index < arrSelected.length; index++) {
            const element = arrSelected[index];
            if(arrBooked.includes(element))
                arrBooked.splice(arrSelected.indexOf(element), 1)
        }
        setBookedSeats(arrBooked);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    },[]);

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

    const renderSeats = () => {
        let render = [];
        
        let seats = [];
        let maxSeats = 0;
        let seatCt = flight[cabinStr2]
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

    const handleSubmit = () =>{

        const newDep = flight[cabinStr].concat(selectedSeats)
        flight[cabinStr] = newDep

        // user.seatNumbers[magicIndex] = selectedSeats
        if(selectedSeats.length === seats){
            console.log(user);

            // axios.post('http://localhost:8000/flights/update/' + flight._id, flight)
            // .then(res => console.log(res.data))
            // .catch(err => console.log(err));
        
            // axios.post('http://localhost:8000/user/editseats/' + userID, { user })
            // .then(res => console.log(res))
            // .catch(err => console.log(err))
            // alert('Seats Reserved');
            // window.location = '/user-flights/' + userID
        }
        else {
            alert('Select ' + seats + ' seats')
        }
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
            </Paper>
            <Button onClick={() => handleSubmit()}>Submit</Button>
        </Paper>
        </Paper>
    )        

}

export default EditSeats;