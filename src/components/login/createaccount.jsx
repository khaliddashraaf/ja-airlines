import React from "react";
import Icon from '../Icon/icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';


let idTest = '';

export class CreateAccount extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeuser_name = this.onChangeuser_name.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeconfirm_password = this.onChangeconfirm_password.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            users: [],
            user_name: '',
            password: '',
            confirm_password: '',
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
    onChangeconfirm_password(e) {
        this.setState({
            confirm_password: e.target.value
        })

    }
    //SearchUser?'+'Date='
    componentDidMount() {



        var passp = localStorage.getItem("PassportNumber")
        console.log(passp)
        axios.get('http://localhost:8000/users/getUserwithpassportno/' + passp)
            .then(res => {
                //console.log("hiii")

                this.setState({
                    Userid: res.data[0]._id,
                    // password: res.data[0].password,
                    // user_name: res.data[0].user_name
                })


                // this.state.Userid = res.data[0]._id
                // console.log(this.state.Userid)
                // console.log("da5al pas")
                // localStorage.setItem("userIdForPost", this.state.Userid)

                idTest = this.state.Userid
                //console.log(res.data[0])
                // console.log(this.state.password)

                console.log("inside " + this.state.Userid)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {

        e.preventDefault();

        const User = {
            user_name: this.state.user_name,
            password: this.state.password

        }



        console.log("outside " + idTest)
        //console.log(User);

        // localStorage.setItem("PassportNumber", this.state.passport_number)
        console.log(User)

        if (this.state.password == this.state.confirm_password) {
            //console.log(this.state.User + "d")
            var pid = this.state.Userid
            // const body = {
            //     user_name: this.state.user_name,
            //     password: this.state.password
            // }
            console.log(User)
            axios.post(`http://localhost:8000/users/createaccount/${pid}`, User)
                .then(res => console.log(res.data));
        }
        else {
            alert("Passwords don't match! Rewrite you")

        }





        this.state = {
            users: [],
            user_name: '',
            password: '',

        }
        window.location = '/';
    }

    //localStorage.getItem("PassportNumber");
    render() {
        return (
            <div className="base-container" ref={this.props.containerRef} >
                <div className="header">Create Account</div>
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
                                <input required type="text" name="username" placeholder="username" value={this.state.user_name} onChange={this.onChangeuser_name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input required type="password" name="password" placeholder="password" value={this.password} onChange={this.onChangepassword} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm password">Confirm Password</label>
                                <input required type="password" name="confirm password" placeholder="confirm password" value={this.state.confirm_password} onChange={this.onChangeconfirm_password} />
                            </div>
                            <div className="form-group">
                                <div className="footer">
                                    <button type="submit" className="btn">
                                        Create Account
             </button>
                                </div>
                                {/* <button type="submit" value="Create Account " className="btn btn-primary" /> */}
                            </div>
                        </div>
                    </form>

                </div>
                {/* <div className="footer">
                    <button type="button" className="btn">
                        Create Account
             </button>
                </div> */}
            </div>
        );
    }
}

