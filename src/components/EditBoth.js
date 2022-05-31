import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table'
// test UI 
//import * as React from 'react';
// import { useNavigate } from 'react-router-dom'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// //import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import backgd from './images/backgd.jpeg'
//const theme = createTheme();

const Flight = props => (
    <tr>
      <td></td>
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.DepartureTime}</td>
        <td>{props.flight.ArrivalTime}</td>
        <td>{props.flight.From}</td>
        <td>{props.flight.To}</td>
        <td>{props.flight.Duration}</td>
        <td>{props.flight.Price}</td> 
       
        {/* <td>{props.flight.EconomySeats}</td> */}
        {/* <td>{props.flight.BusinessSeats}</td> */}
        {/* <td>{props.flight.FirstClassSeats}</td> */}
  
        <td>{props.flight.Date}</td>
  
        <td>
             <Link to={"/SelectNewFlight/" + props.flight._id}> Select</Link>  
            {/* <button onClick={() => this.SelectFlight(this.state._id)}>
                       Select
              </button> */}
  
  
        </td>
    </tr>
  )
 
export default class EditBoth extends React.Component {
    
  
  constructor(props) {
    super(props);
    
    this.onChangeDate=this.onChangeDate.bind(this);
    this.onChangeCabin=this.onChangeCabin.bind(this);
    
   

    this.onSubmit = this.onSubmit.bind(this);
        this.state = {

         
             Date:'',
             FlightsList:[],
             Cabin:'Economy'
            
    }
  }
  
  onChangeDate(e) {
    this.setState({
    
      Date:e.target.value
      
    },()=>
    console.log(this.state.Date))
  }
  onChangeCabin(e) {
    this.setState({
     
      Cabin:e.target.value
      
    })
    // console.log(this.state.Cabin)
  }
  componentDidMount(){
 console.log('yhbhbdsjvsdjk')
 
  }
 onSubmit(e){
     
    e.preventDefault();
    console.log("hiii")
    var a=localStorage.getItem("Cabin22");
    var b=localStorage.getItem("Seats22");
    var c=localStorage.getItem("From22");
    var d=localStorage.getItem("To22");
    var e=localStorage.getItem("Date22");
    // var a=localStorage.getItem("Cabin22");
    if(this.state.Cabin=='')
     this.setState({Cabin:'Economy'})
    console.log('http://localhost:8000/Flights/SearchUser?'+'Date='+this.state.Date+'&To='+
    d+'&From='+c+'&Cabin='+this.state.Cabin+'&Seats='+b )

    axios.get('http://localhost:8000/Flights/SearchUser?'+'Date='+this.state.Date+'&To='+
     d+'&From='+c+'&Cabin='+this.state.Cabin,{ params: { Seats: b } }) 
        
     .then(res => {
       console.log("SUCCEEEEEEEED")
     console.log(JSON.stringify (res.data))
      localStorage.setItem("Cabin22",this.state.Cabin)
      
    this.setState({
      FlightsList:res.data
    
    }) 
    if(res.data.length==0){
      alert(" There are no flights with those dates and destination  please try again with another search values ");
    }
   
  
  });


 }


 FlightList() {
    return this.state.FlightsList.map(currentflight => {
        return <Flight flight={currentflight} key={currentflight._id} />;
    })
  }

render() {
    return (
      
        <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
        <ElevateAppBar/>
        <Paper style={{backgroundImage: `url(${backgd})`,
          backgroundSize:'cover',
          height: '1000px',
          display:'block',
          width: '100%'
      }}>
         {/* <Paper style={{backgroundColor: `#ffff`,
          left:'500px',
          right:'200px',
          height: '300px',
          display:'block',
          width: '800px'
      }}> */}
        {/* marginBottom: '500 px', */}
        {/* <Box sx={{backgroundColor:'#ffff',pt:'75px', pl:'300px', textAlign:'middle', fontFamily:'monospace'}} display='inline-grid' alignItems='center' ></Box> */}
        <Typography variant='h2' style={{ fontFamily:'monospace', color:'#ffff',pt:'250px'}}>
        Select A New Flight
        </Typography>
        <div>   </div>
        <form onSubmit={this.onSubmit}>
        <Typography  style={{fontFamily:'monospace',fontSize:'23px', color:'#ffff'}}>
       
          Date 
       
        </Typography>
            <input  type="text"
                
               className="form-control"
                value={this.state.Date}
                onChange={this.onChangeDate}
                required
                style={{width: "170px",margin:10}}
                />
         <Typography  style={{fontFamily:'monospace',fontSize:'23px', color:'#ffff'}}>
       
       Cabin
    
     </Typography>
          <select name="Class" id="selectList"
          value={this.state.Cabin}
          className="form-control"
          required
          style={{width: "200px",margin:10}}
          onChange={this.onChangeCabin}
         
          // optionkey selected="selected" 
          defaultValue={'Economy'}>
           
        
             <option selected="selected" value="Economy" value="Economy">Economy</option>
   <option value="FirstClass">FirstClass</option>
 <option value="Business">Business</option>
 
</select>
<div className="form-group">
          <input type="submit" value="Show Results" className="btn btn-primary" />
          
        </div>
        </form>
        
       
        {/* <Typography variant='h4' style={{fontFamily:'monospace', color:'#ffffff'}}>
          JA AIRLINES
        </Typography> */}
        <Box sx={{pt:'50px', pl:'80px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} width='1300px' display='inline-grid' alignItems='center'>
{/* <div style={{width:'800px',textAlign:'center',alignSelf:'center'}}> */}
<Table striped bordered hover variant='light' style={{backgroundColor:'#ffff'}}className="table">
    
       <th></th>
       <th>Flight Number</th>
       <th>DepartureTime</th>
       <th>ArrivalTime</th>
       <th>From</th>
       <th>To</th>
       <th>Duration</th>
       <th>Price</th>
       
       
     
       <th>Date</th>
 
   
   <tbody>
             {this.FlightList()}
         </tbody>



  
         </Table>
            </Box>
            </Paper>     
 </div>
 

//  </div>

        )
  }
}


/* 
 <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
      <ElevateAppBar/>
      <Paper style={styles.paperContainer}>
        <Box sx={{pt:'400px', pl:'750px', textAlign:'right', fontFamily:'monospace'}} display='inline-grid' alignItems='center'>
      
        <Typography variant='h1' style={{fontFamily:'monospace', color:'#ffffff'}}>
          JA AIRLINES 
        </Typography>
        </Box>

    </Paper>
    <Box>
    
    </Box>
    */
   /* 
   const styles = {
    paperContainer: {
        backgroundImage: `url(${backgd})`,
        backgroundSize:'cover',
        height: '700px',
        display:'block',
        width: '100%'
    }
    */

   