import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
export default class ChangeFlight extends Component {
 
  constructor(props) {
    super(props);
    
    this.onChangeDate=this.onChangeDate.bind(this);
    this.onChangeCabin=this.onChangeCabin.bind(this);
    
    this.onChangeDate2=this.onChangeDate2.bind(this);
    this.onChangeCabin2=this.onChangeCabin2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
        this.state = {

          FlightsList:[],
             From:'',
             To:'',
             Date:'',
             Seats:1,
             Cabin:'',
             Date2:'',
             Cabin2:'',
             CabinOld:'',
             index:0
            
    }
  }
  onChangeDate(e) {
    this.setState({
    
      Date:e.target.value
      
    })
  }
  onChangeCabin(e) {
    this.setState({
     
      Cabin:e.target.value
      
    })
  }
  onChangeDate2(e) {
    this.setState({
    
      Date2:e.target.value
      
    })
    //console.log(this.state.Date2);
   
  }
  onChangeCabin2(e) {
    this.setState({
     
      Cabin2:e.target.value
      
    })
  }
  componentDidMount(){
    
    
    var id = window.location.pathname.split("/")[2]
    axios.get('http://localhost:8000/Flights/FindMyFlight?ID='+id)
    .then(res=>{
      //console.log("res "+res.data.From)
        this.setState({
           
    From: res.data.From,
    To: res.data.To,
    
   Seats:1,
    Date: res.data.Date,
    Fid:res.data._id,
     userID:id,
    Price:res.data.Price
    
        
        })
        console.log("date fe el component did mount"+this.state.Date)
       
     //  localStorage.setItem("",this.state.To);

     axios.get('http://localhost:8000/Users/get-user/'+localStorage.getItem("CurrentUserID"))
     .then(res => {
       //console.log("res.data.cabin types  " +res.data.flights)
       this.setState({
         cabinTypes:res.data.cabinTypes,
         NumberOfSeats:res.data.seats,
         Flights:res.data.flights,
         Prices:res.data.prices
 
       })
       var i =0;
       for(i=0;i<this.state.Flights.length;i++){
         if(this.state.Flights[i]==this.state.Fid){
          this.setState({
            index:i,
            Cabin:this.state.cabinTypes[this.state.index]
          })
          break;
          
         }

       
       }
       //console.log(this.state.index)
       localStorage.setItem("OldFlight",this.state.Fid)
       localStorage.setItem("OldPrice",this.state.Price[this.state.index])
      //  localStorage.setItem("NumberOfSeats",this.state.NumberOfSeats[this.state.index]);
      //  localStorage.setItem("CabinType",this.cabinTypes[this.state.index] );
      
       
       this.setState({
         SeatsCount:this.state.NumberOfSeats[this.state.index],
         CabinOld:this.state.cabinTypes[this.state.index]
        
       })
      
      //  localStorage.setItem("NewFlight",)

      if(this.state.Date2==''){
        console.log("gowa el if condition "
        )
        this.setState({
          Date:this.state.Date 
        })
      }
       else 
       {
         console.log(this.state.Date2);
         this.setState({
           Date:this.state.Date2
         })
        //  console.log(this.state.Date1)
       }
          console.log("bara el else "+this.state.Date)
        //  this.setState({
        //    CabinOld:this.state.cabinTypes[this.state.index]
        //  })
    
    
    
          if(this.state.Cabin2==''){
            this.setState({
              Cabin:this.state.Cabin
            })
          }
           else 
           {
             this.setState({
               Cabin:this.state.Cabin2
             })
           }
        
          // var from44=localStorage.getItem("FromMyFlights");
          // var to44=localStorage.getItem("ToMyFlights");
       
     })
     
    
      
       //console.log("Cabin Typesssss  "+this.state.index)
   
         }    
      );

   
    
    
};
FlightList() {
    return this.state.FlightsList.map(currentflight => {
        return <Flight flight={currentflight} key={currentflight._id} />;
    })
  }

onSubmit(e) {
  
  
  e.preventDefault();
  console.log("Date fe el on submit "+this.state.Date)
  console.log("Date2 fe el on submit fe el awl"+this.state.Date2)
  var id = window.location.pathname.split("/")[2]
    axios.get('http://localhost:8000/Flights/FindMyFlight?ID='+id)
    .then(res=>{
      //console.log("res "+res.data.From)
        this.setState({
           
    From: res.data.From,
    To: res.data.To,
    
   Seats:1,
    Date: res.data.Date,
    Fid:res.data._id,
     userID:id,
    Price:res.data.Price
    
        
        })
        console.log("date fe el component did mount"+this.state.Date)
       
     //  localStorage.setItem("",this.state.To);

     axios.get('http://localhost:8000/Users/get-user/'+localStorage.getItem("CurrentUserID"))
     .then(res => {
       //console.log("res.data.cabin types  " +res.data.flights)
       this.setState({
         cabinTypes:res.data.cabinTypes,
         NumberOfSeats:res.data.seats,
         Flights:res.data.flights,
         Prices:res.data.prices
 
       })
       var i =0;
       for(i=0;i<this.state.Flights.length;i++){
         if(this.state.Flights[i]==this.state.Fid){
          this.setState({
            index:i,
            Cabin:this.state.cabinTypes[this.state.index]
          })
          break;
          
         }

       
       }
       //console.log(this.state.index)
       localStorage.setItem("OldFlight",this.state.Fid)
       localStorage.setItem("OldPrice",this.state.Price[this.state.index])
      //  localStorage.setItem("NumberOfSeats",this.state.NumberOfSeats[this.state.index]);
      //  localStorage.setItem("CabinType",this.cabinTypes[this.state.index] );
      
       
       this.setState({
         SeatsCount:this.state.NumberOfSeats[this.state.index],
         CabinOld:this.state.cabinTypes[this.state.index]
        
       })
      
      //  localStorage.setItem("NewFlight",)

      if(this.state.Date2==''){
        console.log("gowa el if condition "
        )
        this.setState({
          Date:this.state.Date 
        })
      }
       else 
       {
         console.log(this.state.Date2);
         this.setState({
           Date:this.state.Date2
         })
        //  console.log(this.state.Date1)
       }
          console.log("bara el else "+this.state.Date)
        //  this.setState({
        //    CabinOld:this.state.cabinTypes[this.state.index]
        //  })
    
    
    
          if(this.state.Cabin2==''){
            this.setState({
              Cabin:this.state.Cabin
            })
          }
           else 
           {
             this.setState({
               Cabin:this.state.Cabin2
             })
           }
        
          // var from44=localStorage.getItem("FromMyFlights");
          // var to44=localStorage.getItem("ToMyFlights");
       
     })
     
    
      
       //console.log("Cabin Typesssss  "+this.state.index)
   
         }    
      );

   
    
    
   // console.log("cABIN 2 "+this.state.cabin2)
     if(this.state.Date2==''){
    this.setState({
      Date:this.state.Date 
    })
  }
   else 
   {
     console.log(this.state.Date2);
     this.setState({
       Date:this.state.Date2
     })
    //  console.log(this.state.Date1)
   }
      console.log("bara el else "+this.state.Date)
    //  this.setState({
    //    CabinOld:this.state.cabinTypes[this.state.index]
    //  })



      if(this.state.Cabin2==''){
        this.setState({
          Cabin:this.state.Cabin
        })
      }
       else 
       {
         this.setState({
           Cabin:this.state.Cabin2
         })
       }
    
      // var from44=localStorage.getItem("FromMyFlights");
      // var to44=localStorage.getItem("ToMyFlights");
      
  //console.log("from "+this.state.From);
  console.log(this.state)
  console.log('http://localhost:8000/Flights/SearchUser?'+'Date='+this.state.Date2+'&To='+
  this.state.To+'&From='+this.state.From+'&Cabin='+this.state.Cabin+'&Seats='+ this.state.SeatsCount);

     axios.get('http://localhost:8000/Flights/SearchUser?'+'Date='+this.state.Date2+'&To='+
     this.state.To+'&From='+this.state.From+'&Cabin='+this.state.Cabin,{ params: { Seats: this.state.SeatsCount } }) 
        
     .then(res => {
       console.log("SUCCEEEEEEEED")
     // console.log(JSON.stringify (res.data))
     
      
    this.setState({
      FlightsList:res.data
    
    }) 
    
   
  
  });
};

 
render() {
    return (
      <div>
        <h3>Change Flight by </h3>
        <form onSubmit={this.onSubmit}>
        <label> Date: </label>
            <input  type="text"
                
               className="form-control"
                value={this.state.Date2}
                onChange={this.onChangeDate2}
                style={{width: "170px",margin:10}}
                />
        <label>Cabin: </label>
          <select name="Class" id="selectList"
          value={this.state.Cabin2}
          className="form-control"
          onChange={this.onChangeCabin2}
         
          // optionkey selected="selected" 
        >
   <option value="Economy" value="Economy">Economy</option>
   <option value="FirstClass">FirstClass</option>
 <option value="Business">Business</option>
 
</select>
<div className="form-group">
          <input type="submit" value=" Show Flight" className="btn btn-primary" />
        </div>
        </form>
       

<div>
<table className="table">
     {/* <tr> */}
       <th></th>
       <th>Flight Number</th>
       <th>DepartureTime</th>
       <th>ArrivalTime</th>
       <th>From</th>
       <th>To</th>
       <th>Duration</th>
       <th>Price</th>
       
       
       {/* <th>Business Seats</th>
       <th>First Class Seats</th>  */}
       <th>Date</th>
     {/* </tr> */}
   
   <tbody>
             {this.FlightList()}
         </tbody>



  
 </table>
 </div>
 </div>

        )
  }
}
