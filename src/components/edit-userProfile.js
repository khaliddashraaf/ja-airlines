import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table'
const Users = props => (

    <tr>
        <td>{props.users.first_name}</td>
        <td>{props.users.last_name}</td>
        <td>{props.users.email}</td>
        {/* <td>{props.users.password}</td> */}
        <td>{props.users.passport_number}</td>
        <td>{props.users.password}</td>

        {/* <td>{props.users.flights}</td> */}



    </tr>
)

export default class MyProfileList extends Component {
    constructor(props) {
        super(props);

        //this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {
            users: [],
            first_name: '',
            last_name: '',
            email: '',
            passport_number: '',
            password: '',
            Fid: '',
        };
    }

    componentDidMount() {
        //console.log(localStorage.getItem("CurrentUserID") )

        var id = localStorage.getItem("CurrentUserID")
        axios.get(`http://localhost:8000/users/get-user/${id}`)
            .then(response => {
                this.setState({
                    users: response.data,

                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    passport_number: response.data.passport_number,
                    password: response.data.password,
                    Fid: id,

                })


            })
            .catch((error) => {
                console.log(error);
            })
        console.log(this.state.first_name)


    }


    myProfilePage() {
        return this.state.users.map(currentuser => {
            return <Users users={currentuser} key={currentuser._id} />;
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

<Box sx={{pt:'75px', pl:'200px', fontFamily:'monospace',color:'#ffffff',}} display='inline-grid' alignItems='center'>
<Typography variant='h3' style={{fontFamily:'monospace', color:'#111111'}}>
          
                 {/* textAlign:'middle',  , textAlign:'middle'*/}
        </Typography>
        <Box sx={{pt:'75px', pl:'300px',backgroundColor:'#ffff',  fontFamily:'monospace',color:'#ffffff',position:'relative',left:200,width:500,height:400}} display='inline-grid' alignItems='center'>
            <h1 style={{fontFamily:'monospace', color:'#111111',position:'relative',left:-160,top:-10}}> My Profile </h1>
                <h4 style={{color:'#111111',position:'relative',left:-185}}   x><b > First Name:  </b>{this.state.first_name}</h4>
                <h4 style={{color:'#111111',position:'relative',left:-185}}><b> Last Name: </b> {this.state.last_name}</h4>
                <h4 style={{color:'#111111',position:'relative',left:-185}}><b> Email: </b>{this.state.email}</h4>
                <h4 style={{color:'#111111',position:'relative',left:-185}}><b> Passport Number: </b>{this.state.passport_number}</h4>

                 <table classname="table">
                    <tbody>
                        <td>
                            <Link style={{position:'relative',left:-185}}to={"/myProfile-edit/" + this.state.Fid}>Edit My Profile</Link>
                        </td>
                        <td>
                                <Link style={{position:'relative',left:-160}} to={"/myPassword-edit/" + this.state.Fid}>Edit My Password</Link>
                            </td>
                    </tbody>
                </table>
                </Box>
                </Box>

        </Paper>
            </div>
        )
    }
}