import React from "react";
//import loginImg from "../../login.svg";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '../Icon/icon';
import axios from 'axios';



class Register extends React.Component {
    constructor(props) {
        super(props);

        this.onChangefirst_name = this.onChangefirst_name.bind(this);
        this.onChangelast_name = this.onChangelast_name.bind(this);
        this.onChangehome_address = this.onChangehome_address.bind(this);
        this.onChangecountry_code = this.onChangecountry_code.bind(this);
        this.onChangetelephone_number = this.onChangetelephone_number.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassport_number = this.onChangepassport_number.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            users: [],
            first_name: '',
            last_name: '',
            home_address: '',
            country_code: '',
            telephone_number: '',
            email: '',
            passport_number: '',
            Fid: '',
        }

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
    onChangehome_address(e) {
        this.setState({
            home_address: e.target.value
        })

    }
    onChangecountry_code(e) {
        this.setState({
            country_code: e.target.value
        })

    }
    onChangetelephone_number(e) {
        this.setState({
            telephone_number: e.target.value
        })

    }
    onChangeemail(e) {
        this.setState({
            email: e.target.value
        })

    }
    onChangepassport_number(e) {
        this.setState({
            passport_number: e.target.value
        })

    }
    componentDidMount() {
        // axios.get('http://localhost:8000/users/add/')
        //     .then(response => {
        //         //if (response.data.length > 0) {
        //         this.setState({
        //             users: response.data.map(User => User.first_name),
        //             first_name: '',
        //             last_name: '',
        //             home_address: '',
        //             country_code: '',
        //             telephone_number: '',
        //             email: '',
        //             passport_number: '',

        //         })
        //         //  } 
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

    onSubmit(e) {

        e.preventDefault();

        const User = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            home_address: this.state.home_address,
            country_code: this.state.country_code,
            telephone_number: this.state.telephone_number,
            email: this.state.email,
            passport_number: this.state.passport_number,

        }
        console.log(User);

        localStorage.setItem("PassportNumber", this.state.passport_number)

        axios.post('http://localhost:8000/users/add', User)
            .then(res => console.log(res.data));

        this.state = {
            users: [],
            first_name: '',
            last_name: '',
            home_address: '',
            country_code: '',
            telephone_number: '',
            email: '',
            passport_number: '',
        }
        window.location = '/CreateAccount';
    }
    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <Box mt={1.8} ml={5} display='flex'>
                        <Icon sx={{}}></Icon>
                    </Box>
                    <Typography variant='h5' style={{ fontFamily: 'Monospace', color: '#111111', marginLeft: '25px' }}>
                        JA Airlines
                    </Typography>
                    {/* <div className="image">
                        <img src={loginImg} />
                    </div> */}
                    <form onSubmit={this.onSubmit}>

                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="first name">First Name</label>
                                <input required type="text" name="first name" value={this.state.first_name}
                                    onChange={this.onChangefirst_name} placeholder="first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last name">Last Name</label>
                                <input required type="text" name="last name" value={this.state.last_name}
                                    onChange={this.onChangelast_name} placeholder="last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="home address">Home Address</label>
                                <input required type="text" name="home address" value={this.state.home_address}
                                    onChange={this.onChangehome_address} placeholder="home address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country code">Country Code</label>
                                <input required type="text" name="country code" value={this.state.country_code}
                                    onChange={this.onChangecountry_code} placeholder="country code" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telephone number">Telephone Number</label>
                                <input required type="text" name="telephone number" value={this.state.telephone_number}
                                    onChange={this.onChangetelephone_number} placeholder="telephone number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input required type="text" name="email" value={this.state.email}
                                    onChange={this.onChangeemail} placeholder="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passport number">Passport Number</label>
                                <input required type="text" name="passport number" value={this.state.passport_number}
                                    onChange={this.onChangepassport_number} placeholder="passport number" />
                            </div>

                            <div className="form-group">
                                <div className="footer">
                                    <button type="submit" className="btn">
                                        Register
          </button>
                                </div>
                                {/* <button type="submit" value="Register " className="btn btn-primary" /> */}
                            </div>

                        </div>
                    </form>


                </div>
                {/* <div className="footer">
                    <button type="button" className="btn">
                        Register
          </button>
                </div> */}

            </div>
        );
    }
}
export default Register;