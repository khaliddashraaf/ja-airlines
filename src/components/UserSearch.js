import "bootstrap/dist/css/bootstrap.min.css";
import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlightsList from './delete-flight';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table'
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
           <Link to={"/SelectFlight/" + props.flight._id}> Select</Link>  
          {/* <button onClick={() => this.SelectFlight(this.state._id)}>
                     Select
            </button> */}


      </td>
  </tr>
)
var flag=false;

export default class Search extends Component {
  
  constructor(props) {
    super(props);
    
    this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
     this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeDepartureAirport = this.onChangeDepartureAirport.bind(this);
    this.onChangeArrivalAirport = this.onChangeArrivalAirport.bind(this);
    this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
    this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
    this.onChangeEconomySeats = this.onChangeEconomySeats.bind(this);
    this.onChangeBusinessSeats = this.onChangeBusinessSeats.bind(this);
    this.onChangeDate= this.onChangeDate.bind(this);
    this.onChangeReturnDate=this.onChangeReturnDate.bind(this);
    this.onChangeCabin=this.onChangeCabin.bind(this);
    this.onChangeSeats=this.onChangeSeats.bind(this);


    this.onSubmit = this.onSubmit.bind(this);
   


    this.state = {
        
        // FlightNumber: '',
        FlightsList:[],
        flNumber:'',
        To2:'',
        From2:'',
        DepartureTime2:'',
        ArrivalTime2:'',
        DepartureAirport2:'',
        ArrivalAirport2:'',
        EconomySeats2:'',
        BusinessSeats2:'',
        Date2:'',
        Cabin2:'Economy',
        ReturnDate2:'',
        Seats2:0,
        Fid:''
        

        
    
    }
  }
  componentDidMount() {
    // if(FlightsList.length!=0){
    //   const i=0;
    //   while(i<FlightsList.length){
       
    //     i++;
    //   }
    // }
    var x = localStorage.getItem("CurrentUserID")
    localStorage.setItem("UserIDH",x);
    console.log("from search"+localStorage.getItem("UserIDH"))
  }
  onChangeFlightNumber(e) {
    this.setState({
     // FlightNumber: e.target.value,
      flNumber:e.target.value
      
    })

  }

  
 //*********************************************** */
 onChangeReturnDate(e) {
  this.setState({
   // FlightNumber: e.target.value,
    ReturnDate2:e.target.value
    
  })
}
onChangeCabin(e) {
  this.setState({
   // FlightNumber: e.target.value,
    Cabin2:e.target.value
    
  })
}
onChangeSeats(e) {
  this.setState({
   // FlightNumber: e.target.value,
    Seats2:e.target.value
    
  })
}
  onChangeTo(e) {
    this.setState({
    To2: e.target.value
    })
    
  }
  onChangeFrom(e) {
    this.setState({
      From2: e.target.value
    })
  }
  onChangeDepartureAirport(e) {
    this.setState({
      DepartureAirport2: e.target.value
    })
  }
  onChangeDepartureTime(e) {
    this.setState({
      DepartureTime2: e.target.value
    })
  }
  onChangeArrivalAirport(e) {
    this.setState({
      ArrivalAirport2: e.target.value
    })
  }
  onChangeArrivalTime(e) {
    this.setState({
      ArrivalTime2: e.target.value
    })
    
  }
  onChangeEconomySeats(e) {
    this.setState({
      EconomySeats2: e.target.value
    })
    
  }
  onChangeBusinessSeats(e) {
    this.setState({
      BusinessSeats2: e.target.value
    })
    
  }
  
  onChangeDate(e) {
    this.setState({
      Date2: e.target.value
    })
    
  }
//*************************************************** */

  onSubmit(e) {
    e.preventDefault();
    
    const Flights = {
     FlightNumber: this.state.flNumber,
      To:this.state.To2,
      From:this.state.From2,
      DepartureTime:this.state.DepartureTime2,
      ArrivalTime:this.state.ArrivalTime2,
      DepartureAirport:this.state.DepartureAirport2,
      ArrivalAirport:this.state.ArrivalAirport2,
      EconomySeats:this.state.EconomySeats2,
      BusinessSeats:this.state.BusinessSeats2,
      Date:this.state.Date2,
      ReturnDate:this.state.ReturnDate2,
      Cabin:this.state.Cabin2,
      Seats:this.state.Seats2
      
     
    }

   
  
  console.log('http://localhost:8000/Flights/SearchUser?'+'Date='+Flights.Date+'&To='+
  Flights.To+'&From='+Flights.From+'&Cabin='+Flights.Cabin+'&Seats='+Flights.Seats);
 // if(Flights.Cabin.normalize=='Economy'){
    console.log('gowa el if');
     axios.get('http://localhost:8000/Flights/SearchUser?'+'Date='+Flights.Date+'&To='+
     Flights.To+'&From='+Flights.From+'&Cabin='+Flights.Cabin,{ params: { Seats: Flights.Seats } }) 
  //+'&Seats='+Flights.Seats
     .then(res => {
      console.log(JSON.stringify (res.data))
     if(res.data.length==0){
     
        alert(" There are no flights with those dates and destination  please try again with another search values ");
       // flag=false;
        
     }
      
    this.setState({
      FlightsList:res.data
          // FlightNumber:res.data[0].FlightNumber,
    // DepartureTime: res.data[0].DepartureTime,
    // ArrivalTime: res.data[0].ArrivalTime,
    // From: res.data[0].From,
    // To: res.data[0].To,
    // DepartureAirport: res.data[0].DepartureAirport,
    // ArrivalAirport: res.data[0].ArrivalAirport,
    // EconomySeats: res.data[0].EconomySeats,
    // BusinessSeats: res.data[0].BusinessSeats,
    // FirstClassSeats: res.data[0].FirstClassSeats,
    // Date: res.data[0].Date,
    // Fid:res.data[0]._id

    
    // details:this.state.details.filter(el => el._id == id),  
    }) 
    console.log('Cabin'+this.state.Cabin2)
    localStorage.setItem("FID", this.state.Fid);
    localStorage.setItem("From", this.state.To2);
    localStorage.setItem("To", this.state.From2);
    localStorage.setItem("ReturnDate", this.state.ReturnDate2);
    localStorage.setItem("Cabin", this.state.Cabin2);
    localStorage.setItem("Seats", this.state.Seats2);
    localStorage.setItem("depID", this.state.Fid);
    //console.log(this.state.FlightNumber+"  "+i)
    //test for the log in 
    
   
  
  });
//   }
// else {
//   axios.get('http://localhost:8000/Flights/SearchUser?'+'Date='+Flights.Date+'&To='+
//      Flights.To+'&From='+Flights.From+'&Cabin=Business'+'&BusinessSeats='+Flights.Seats) 
  
//      .then(res => {
//       console.log(JSON.stringify (res.data[0]))
//     this.setState({
//     FlightNumber:res.data[0].FlightNumber,
//     DepartureTime: res.data[0].DepartureTime,
//     ArrivalTime: res.data[0].ArrivalTime,
//     From: res.data[0].From,
//     To: res.data[0].To,
//     DepartureAirport: res.data[0].DepartureAirport,
//     ArrivalAirport: res.data[0].ArrivalAirport,
//     EconomySeats: res.data[0].EconomySeats,
//     BusinessSeats: res.data[0].BusinessSeats,
//     FirstClassSeats: res.data[0].FirstClassSeats,
//     Date: res.data[0].Date,
//    // Fid:id,

//     ToDB: res.data[0].To,
//     FromDB: res.data[0].From,
//     DateDB: res.data[0].Date,
//     // details:this.state.details.filter(el => el._id == id),  
//     }) 
//   });
// }
//   }
  
}
SelectFlight(ID3){

  console.log(ID3);  
   
    console.log('///////')
    console.log(localStorage.getItem("FlightNumber"));

  
  
  window.location='/SelectFlight';
  
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
  <Box sx={{pt:'75px', pl:'300px', textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
<Typography variant='h3' style={{fontFamily:'monospace', color:'#ffffff'}}>
         Search Flights
        </Typography>
           

      
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">  */}
            {/* <label>Flight Number: </label>
            <input  type="text"
                required
                 
               className="form-control"
                value={this.state.flNumber}
                onChange={this.onChangeFlightNumber}
                style={{width: "150px",margin:10}}/>
            */}
           {/* <div>  */}
           <label style={{color:'#111111'}}>From: </label>
            <input  type="text"
                required
                className="form-control"
                height="100px"
                value={this.state.From}
                onChange={this.onChangeFrom}
                style={{position:'relative',left:0,width:170}}
                />
      {/* </div> */}
         {/* // <div className="form-group">   */}
             <label 
             style={{color:'#111111',position:'relative',left:190,width:170, top:-60, right: 10}}
             >To: </label>
            <input  type="text"
                required
                 className="form-control"
                value={this.state.To}
                onChange={this.onChangeTo}
                style={{position:'relative',left:190,width:170, top:-60, right: 10}}
                />
        
        
             <label style={{color:'#111111',position:'relative',left:380,width:170, top:-120, right: 10}}>Departure Date: </label>
            <input  type="text"
                required
               className="form-control"
                value={this.state.Date}
                onChange={this.onChangeDate}
                style={{position:'relative',left:380,width:170, top:-120, right: 10}}
                />
           {/* </div>  */}
          {/* <div className="form-group">   */}
             <label
             style={{color:'#111111',position:'relative',left:590,width:170, top:-180, right: 10}}> Return Date: </label>
            <input  type="text"
                required
                 className="form-control"
                value={this.state.ReturnDate}
                onChange={this.onChangeReturnDate}
                style={{position:'relative',left:590,width:170, top:-180, right: 10}}
                />
                     <label  style={{position:'relative',left:800,width:170, top:-240, right: 10,color:'#111111'}}  >Seats: </label>
            <input style={{position:'relative',left:800,width:170, top:-240, right: 10,}} type="number"
                required
         
                className="form-control"
                value={this.state.Seats}
                onChange={this.onChangeSeats}
            
                />
        
          <label style={{position:'relative',left:1000,width:170, top:-300, right: 10,color:'#111111'}}>Cabin : </label>
          <select style={{position:'relative',left:1000,width:170, top:-300, right: 10,color:'#111111'}} name="Class" id="selectList"
          value={this.state.Cabin}
          className="form-control"
          onChange={this.onChangeCabin}
          defaultValue={'Economy'}>
   <option selected="selected" key="Economy" value="Economy">Economy</option>
   <option value="FirstClass">FirstClass</option>
 <option value="Business">Business</option>
 
</select>
       
         
          <div className="form-group">
          <input style={{position:'relative',left:410,width:170, top:-280, right: 10,color:'#FFFF'}}type="submit" value=" Show Flight" className="btn btn-primary" />
        </div>
        </form>
        </Box>
           <div>
           <Box sx={{ textAlign:'middle', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
           <Table style={{position:'relative',left:300,width:1000, top:-240, right: 10,color:'#111111'}} striped bordered hover variant='light' className="table">
                {/* <tr> */}
                  <th></th>
                  <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                  Flight Number
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                 Departure Time
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                  ArrivalTime
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                From
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                  To
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                 Duration
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                Price
        </Typography></th>
        <th><Typography style={{fontFamily:'monospace', color:'#000000',backgroundColor:'#ffffff'}}>
                Date
        </Typography></th>
                {/* </tr> */}
              
              <tbody>
                        {this.FlightList()}
                    </tbody>
              {/* <td>{this.state.FlightNumber}</td> */}
              {/* <td>{this.state.DepartureTime}</td>
              <td>{this.state.ArrivalTime}</td>
              <td>{this.state.From}</td>
              <td>{this.state.To}</td>
              {/* <td>{this.state.DepartureAirport}</td> */}
              {/* <td>{this.state.ArrivalAirport}</td> */}
              {/* <td>{this.state.EconomySeats}</td> */}
              {/* <td>{this.state.BusinessSeats}</td> */}
              {/* <td>{this.state.FirstClassSeats}</td> */}
              {/* <td>{this.state.Date}</td> */}
              {/* <td> */}
            {/* <Link to={"/Select/" + props.flight._id}> Select</Link>  */}
            {/* <button onClick={() => this.SelectFlight()}>
              Select
               </button> */}
 
            {/* <Link to={"/Select/" + this.state.FlightNumber}>Select</Link>
        
        </td> */}

             
      </Table>
      </Box>
          
       </div>
      </Paper>
      </div>
    )
  }
}
