// import React, { Component } from 'react';
// import {
//   Router,
//   Route
// } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from 'react';
import "./App.scss"

import Booking from './components/booking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightsList from './components/delete-flight';
import Search from './components/Search';
import CreateFlight from './components/CreateFlight';
import FlightDetails from './components/flight-details';
import UpdateFlights from './components/update-flight';
import FlightsList2 from './components/flights_list';
import Home from './components/home';
// import Login from './components/login';
import ViewFlights from './components/viewFlights';
import AdminRoute from './components/adminRoute';
import MyProfileList from './components/edit-userProfile';
import EditAction from './components/editaction-userProfile';
import EditPassword from './components/editPassword';

// import UserDash from './components/UserDashBoard';
// import Userlog from './components/UserLogin';
import ReservedFlights from './components/user_flights';
import Confirm_cancel from './components/confirm-cancel';
import MailTest from './components/mailTest';
import UserSearch from './components/UserSearch';
import SelectFlight from './components/SelectFlight';

import ReturnFlight from './components/ShowReturnFlights';
import OneReturnFlight from './components/SelectReturnFlight';
import SummaryFlight from './components/SummaryFlight';
//import { Login, Register, CreateAccount } from "./components/login/index";
import { Index } from "./components/login/indexxx";

import { CreateAccount } from "./components/login/createaccount";
// import Index from './components/index';



import CheckoutWithStripe from "./components/stripePayment";

import FormNodeMailer from "./components/testnodemailer";
import Send_Email_For from "./components/send_Email_ForITen";



// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_test_51KFF0bJRBpyojyQVkWhibqEFUBKNDp8Kq3D5ox3a33V0PQ8ckPTOTEHaZi3obvqQ6ltAYF93BWdYFcQUFscixWfQ00uVoZpGKO");
import BookedFlights from './components/BookedFlights';
import ChangeFlight from './components/ChangeFlight';
import  EditFlights from './components/ChooseEditCriteria';
import  EditDate from './components/EditDate';
import  EditCabin from './components/EditCabin';
import  EditBoth from './components/EditBoth';
import EditSeats from './components/EditSeats'
import  SelectNewFlight from './components/SelectNewFlight.js';
import SummaryNewFlight from'./components/SummaryNewFlight.js';
import ChargeChangedFlight from './components/charge_for_change.js';
import SelectSeats from "./components/SelectSeats";
// import flightList from "./components/delete-flight";

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isLogginActive: true
    // };
  }

  // componentDidMount() {
  //   //Add .right by default
  //   this.rightSide.classList.add("right");
  // }

  // changeState() {
  //   const { isLogginActive } = this.state;

  //   if (isLogginActive) {
  //     this.rightSide.classList.remove("right");
  //     this.rightSide.classList.add("left");
  //   } else {
  //     this.rightSide.classList.remove("left");
  //     this.rightSide.classList.add("right");
  //   }
  //   this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  // }

  render() {
  return (
    <Router>
       {/* <h1>hiiiiiiiiiiiii</h1> */}
      
       <div>
      
      <Routes>

      {/* <Route path='/User' exact element={<UserDash />} /> */}
        <Route path='/Home' exact element={<Home/>}/>
        {/* <Route path='/login' exact element={<Login />}/> */}
        <Route path='/admin' element={<AdminRoute/>}/>
        <Route path="/flights" exact element={<ViewFlights/>} />
      <Route path="/booking" exact element={<Booking/>} />
      <Route path="/delete" exact element={<FlightsList/>} />
      <Route path="/Search" element={<Search />}></Route>
      <Route path="/UserSearch" element={<UserSearch />}></Route>
      <Route path="/SelectFlight/:id" element={<SelectFlight />}></Route>
      <Route path="/ShowReturnFlights" element={<ReturnFlight />}></Route>
      <Route path="/SummaryFlight" element={<SummaryFlight />}></Route>
      <Route path="/MyFlights" element={<BookedFlights />}></Route>
      <Route path="/ChangeFlight/:id" element={<ChangeFlight />}></Route>
      <Route path="/ChooseEditCriteria/:id" exact element={<EditFlights />} />
      <Route path="/EditDate" exact element={<EditDate />} />
      <Route path="/EditCabin" exact element={<EditCabin />} />
      <Route path="/EditBoth" exact element={<EditBoth/>} />
      <Route path="/SelectNewFlight/:id" exact element={<SelectNewFlight/>} />
      <Route path="/SummaryNewFlight" exact element={<SummaryNewFlight/>} />
      <Route path="/SeatsNewFlight" exact element={<SelectSeats/>} />

      {/* <Route path="/ShowAllMyFlights" element={<ShowFlights />}></Route> */}
      <Route path="/SelectReturnFlight/:id" element={<OneReturnFlight />}></Route>
      <Route path="/CreateFlights" element={<CreateFlight />}></Route>
      {/* <Route path="/get-flight/:id" render={(props) => <FlightDetails {...props} />} /> */}
      {/* <Route path="/" exact element={<FlightsList/>} /> */}
      <Route path="get-flight/:id" element={<FlightDetails/>} />
      <Route path="/update/:id" exact element={<UpdateFlights />}></Route>
      <Route path="/update" exact element={<FlightsList2 />} />
      {/* <Route path="get-flights/" exact element={<FlightsList/>} /> */}


      {/* route for showing the flights */}
      <Route path="/user-flights/:id" exact element={<ReservedFlights />} />
      <Route path="conf-flight/:id/:Uid" element={<Confirm_cancel/>} />
      <Route path="mailTest" element={<MailTest/>} />
      <Route path="/editseats" element={<EditSeats/>} />

      <Route path="myProfile-edit/:id" element={<EditAction />} />

          <Route path="/myProfile/:id" exact element={<MyProfileList />} ></Route>
          <Route path="/charge" exact element={<CheckoutWithStripe />} ></Route>

          <Route path="/nodMailer" exact element={<FormNodeMailer />} ></Route>
          <Route path="/sendEmailForITen/:id/:Fid" exact element={<Send_Email_For />} ></Route>

          <Route path="/chargeForChange" exact element={<ChargeChangedFlight />} ></Route>

          // for sign and log
          <Route path="myPassword-edit/:id" element={<EditPassword />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/" element={<Index />} />
      </Routes>



      </div>
     
     

  </Router>
  
  
  );
}
}
// const RightSide = props => {
//   return (
//     <div
//       className="right-side"
//       ref={props.containerRef}
//       onClick={props.onClick}
//     >
//       <div className="inner-container">
//         <div className="text">{props.current}</div>
//       </div>
//     </div>
//   );
// };

export default App;