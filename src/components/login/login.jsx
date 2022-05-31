import React from "react";
import loginimg from "../../login.svg";
import Icon from '../Icon/icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';


let idTest = '';
let Pass = '';
let UserName = ''
var flag = "false";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeuser_name = this.onChangeuser_name.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            users: [],
            user_name: '',
            password: '',
            pass: '',
            Userid: ''

        }

    }

    onChangeuser_name(e) {
        this.setState({
            user_name: e.target.value
        })

    }
    onChangepassword(e) {
        this.setState({
            password: e.target.value
        })

    }

    //SearchUser?'+'Date='
    componentDidMount() {


    }

    onSubmit(e) {

        e.preventDefault();
        //console.log("gdf")

        const User = {
            password: this.state.password

        }
        var username = this.state.user_name
        //console.log(username)
        axios.get('http://localhost:8000/users/getpassword/' + username)

            .then(res => {
                this.setState({
                    pass: res.data[0].password,
                    Userid: res.data[0]._id,
                    //userName: res.data[0].user_name
                    // password: res.data[0].password,
                    // user_name: res.data[0].user_name
                })
                idTest = this.state.Userid
                Pass = this.state.pass
                UserName = this.state.userName
                localStorage.setItem("Pass", Pass)
                localStorage.setItem("CurrentUserID", idTest)
                //localStorage.setItem("CurrentUserName", UserName)

                console.log(Pass + "inside")

                axios.post('http://localhost:8000/users/login/' + this.state.pass, User)
                    .then(res => {
                        this.state = {
                            users: [],
                            user_name: '',
                            password: '',
                            Userid: '',

                        }

                        if (res.data == "Logged Successfuly") {
                            window.location = '/Home';
                        }
                        else {
                            // <p style="color:red"> Login Failed. Please try again. </p>
                            // <span id="login failed"></span>
                            // <div class="alert alert-dannger" role="alert">
                            //         A simple danger alert-check it out!
                            // </div>
                            // document.getElementById("login_failed").innerHTML = "Login Failed.";
                            alert("Wrong Password!")
                            //window.location = '/JaAirlines';



                        }


                    })
                    .catch(function (error) {
                        console.log(error)
                    })







            })
            .catch((error) => {
                console.log(error);
                alert("Wrong Username!")
            })
        //console.log(idTest)


        // console.log(localStorage.getItem("Pass") + "outtt")
        // var passcode = localStorage.getItem("Pass")

        //console.log(localStorage.getItem("CurrentUserID") )
        //console.log('http://localhost:8000/users/login/' + pass)
        //var name= localStorage.getItem("CurrentUserName")





        // axios.post('http://localhost:8000/users/login/' + passcode, User)
        // .then(res => console.log(res.data))
        // .catch(function (error) {
        //     console.log(error)
        // })


        // window.location = '/User';
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    {/* <div className="image">
                        <img src={loginimg} />
                    </div> */}
                    <Box mt={1.8} ml={5} display='flex'>
                        <Icon sx={{}}></Icon>
                    </Box>
                    <Typography variant='h5' style={{ fontFamily: 'Monospace', color: '#111111', marginLeft: '25px' }}>
                        JA Airlines
                    </Typography>
                    <form onSubmit={this.onSubmit}>


                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input required type="text" name="username" value={this.state.user_name}
                                    onChange={this.onChangeuser_name} placeholder="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input required type="password" name="password" value={this.state.password}
                                    onChange={this.onChangepassword} placeholder="password" />
                            </div>
                            <div className="form-group">
                                <div className="footer">
                                    <button type="submit" className="btn">
                                        Login
             </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                {/* <div className="footer">
                    <button type="button" className="btn">
                        Login
             </button>
                </div> */}
            </div>
        );
    }
}
export default Login;