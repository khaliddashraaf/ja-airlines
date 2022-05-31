import React, { Component } from 'react';
import axios from 'axios';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table'
// import ReactDOM from 'react-dom'
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";


export default class EditAction extends Component {
    constructor(props) {
        super(props);

        this.onChangefirst_name = this.onChangefirst_name.bind(this);
        this.onChangelast_name = this.onChangelast_name.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        //this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangepassport_number = this.onChangepassport_number.bind(this);
        //this.onChangeflights = this.onChangeflights.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            passport_number: '',
            // Flight_Number: [],
            users: [],

        }
    }


    componentDidMount() {
        var id = window.location.pathname.split("/")[2]
        //console.log(id)
        axios.get(`http://localhost:8000/users/get-user/${id}`)
            .then(response => {
                this.setState({

                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    passport_number: response.data.passport_number,
                    oldPassNo: response.data.passport_number,
                    flights: response.data.flights

                })

            })
            .catch(function (error) {
                console.log(error);
            })


    }


    onChangefirst_name(e) {
        this.setState({
            first_name: e.target.value
        })
    }

    onChangelast_name(e) {
        this.setState({
            last_name: e.target.value
        })
    }
    onChangeemail(e) {
        this.setState({
            email: e.target.value
        })
    }
    // onChangepassword(e) {
    //     this.setState({
    //         password: e.target.value
    //     })
    // }
    onChangepassport_number(e) {
        this.setState({
            passport_number: e.target.value
        })
    }
    // onChangeflights(e) {
    //     this.setState({
    //         flights: e.target.value
    //     })
    // }



    onSubmit(e) {
        e.preventDefault();

        const userUpdate = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            //password: this.state.password,
            passport_number: this.state.passport_number,
            // flights: this.state.flights,

        }
        const flightUpdate = {
            PassportNumber: this.state.passport_number
        }

        console.log(userUpdate);
        var pid = window.location.pathname.split("/")[2]
        //console.log(pid)



        axios.post(`http://localhost:8000/users/myProfile/${pid}`, userUpdate)
            .then(res => console.log(res.data));


        // axios.get(`http://localhost:8000/users/user-flights/${pid}`)
        //     .then(response => {
        //         console.log(response.data);
        //         this.setState({

        //             Flight_Number: response.data.Flight_Number,
        //         })
        //         var Flightarr = this.state.Flight_Number;
        //         //console.log(this.state.Flight_Number);


        //     });


        console.log(this.state.flights);
        console.log(this.state.oldPassNo);
        console.log(this.state.passport_number);

        var arrayLength = this.state.flights.length;
        for (var i = 0; i < arrayLength; i++) {
            console.log(this.state.flights[i]);
            axios.post('http://localhost:8000/flights/update/' + this.state.flights[i] + '/' + this.state.oldPassNo, flightUpdate)
                .then(res => console.log(res.data));
        }




       alert('Your profile has been updated Sucssesfully')
        window.location = '/Home';

        //?
        // axios.post('http://localhost:8000/database/update/' + this.state.FlightNumber, FlightSchedule1)
        //     .then(res => console.log(res.data));
        // window.location = '/';
        //window.location.reload();

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

<Box sx={{pt:'75px', pl:'300px', fontFamily:'monospace',color:'#ffffff'}} display='inline-grid' alignItems='center'>
<Typography variant='h2' style={{fontFamily:'monospace', color:'#111111',position:'relative',left:-300}}>
          
              Edit My Profile
        </Typography>
                {/* <h1>Edit My Profile</h1> */}
                </Box>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{color:'#ffff'}}><b>First Name:</b> </label>
                        <input style={{width:'250px'}} type="text"
                            required
                            className="form-control"
                            value={this.state.first_name}
                            onChange={this.onChangefirst_name}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{color:'#ffff'}}><b>Last Name: </b></label>
                        <input  style={{width:'250px'}}type="text"
                            required
                            className="form-control"
                            value={this.state.last_name}
                            onChange={this.onChangelast_name}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{color:'#ffff'}}><b>Email: </b></label>
                        <input style={{width:'250px'}} type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeemail}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangepassword}
                        />
                    </div> */}
                    <div className="form-group">
                        <label style={{color:'#ffff'}}> <b>Passport Number: </b></label>
                        <input  style={{width:'250px'}}type="text"
                            required
                            className="form-control"
                            value={this.state.passport_number}
                            onChange={this.onChangepassport_number}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>flights: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.flights}
                            onChange={this.onChangeflights}
                        />
                    </div> */}

                    {/* <Button href='/myProfile/61bb2148a980df1b12a93b09' style={{ backgroundColor: '#f2f2f2', border: '1px solid #d2a600', borderRadius: '50px', color: '00435e', paddingInline: '30px', marginRight: '100px' }} variant="outlined">View My Profile</Button> */}
            
                    <div className="form-group">
                        <input style={{position:'relative',top:30 , left:30}}type="submit" value="Edit My Profile" className="btn btn-primary" />
                    </div>
                </form>
                </Paper>
            </div>
        )
    }
}