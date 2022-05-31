import React, { Component } from 'react';
import axios from 'axios';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
// import ReactDOM from 'react-dom'
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

let Checkerpassword = '';
export default class EditPassword extends Component {
    constructor(props) {
        super(props);


        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeOldpassword = this.onChangeOldpassword.bind(this);

        //this.onChangeflights = this.onChangeflights.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            oldPassword: '',
            password: '',
            users: [],

        }
    }


    componentDidMount() {
        var id = window.location.pathname.split("/")[2]
        //console.log(id)
        axios.get(`http://localhost:8000/users/get-user/${id}`)
            .then(response => {
                this.setState({
                    Checkerpassword: response.data.password

                })
                console.log(this.state.Checkerpassword)
                localStorage.setItem("CheckPass", this.state.Checkerpassword)


            })
            .catch(function (error) {
                console.log(error);
            })


    }




    onChangepassword(e) {
        this.setState({
            password: e.target.value
        })
    } onChangeOldpassword(e) {
        this.setState({
            oldPassword: e.target.value
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
            password: this.state.password,
            // flights: this.state.flights,

        }

        //console.log(userUpdate);
        var pid = window.location.pathname.split("/")[2]
        //console.log(pid)

        var flag = localStorage.getItem("CheckPass")
        console.log(this.state.oldPassword + " OLD PASS")
        console.log(flag + " Flag")

        if (this.state.oldPassword == flag) {


            axios.post(`http://localhost:8000/users/editPassword/${pid}`, userUpdate)
                .then(res => {
                    this.state = {
                        oldPassword: '',
                        password: '',
                        Userid: '',

                    }
                    console.log(res.data)
                    window.location = '/Home';


                    // if (res.data == 'Password Successfully Changed') {
                    //     console.log.log("hnaa")
                    //     window.location = '/User';
                    // }
                    // else {
                    //     // <p style="color:red"> Login Failed. Please try again. </p>
                    //     // <span id="login failed"></span>
                    //     // <div class="alert alert-dannger" role="alert">
                    //     //         A simple danger alert-check it out!
                    //     // </div>
                    //     // document.getElementById("login_failed").innerHTML = "Login Failed.";
                    //     //alert("Wrong Old Password!")
                    //     //window.location = '/JaAirlines';



                    // }


                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        else {
            alert("Wrong Old Password!")

        }





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
                <Typography variant='h2' style={{ fontFamily:'monospace', color:'#ffff',pt:'250px',position:'relative',left:250,top:10}}>
                Edit My Password 
</Typography>


                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{ color:'#ffffff'}} ><b>Old Password:</b> </label>
                        <input style={{width:180}} type="text"
                            required
                            className="form-control"
                            value={this.state.OldPassword}
                            onChange={this.onChangeOldpassword}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ color:'#ffffff'}}><b>New Password:</b> </label>
                        <input style={{width:180 }} type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangepassword}
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
                        <input type="submit" value="Edit My Password" className="btn btn-primary" />
                    </div>
                </form>
                </Paper>
            </div>
        )
    }
}