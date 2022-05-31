import React, { Component } from 'react';
import axios from 'axios';

export default class FormNodeMailer extends Component {


    state={
        name:'',
        lastname:'',
        email:'',
        message:'',
        sent:false,
    }
    // handle inputs
    handleName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    handleLastName=(e)=>{
        this.setState({
            lastname:e.target.value
        })
    }

    handleEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }

    handleMsg=(e)=>{
        this.setState({
            message:e.target.value
        })
    }

    resetForm=()=>{
        this.setState({
            name:'',
            lastname:'',
            email:'',
            message:'',
        })

        setTimeout(()=>{
            this.setState({
                
                sent:false,
            })
        },3000)      
    }

    formSubmit=(e)=>{
        e.preventDefault();
        let data = {
            name:this.state.name,
            lastname:this.state.lastname,
            email:this.state.email,
            msg:this.state.message
        }
        axios.post('http://localhost:8000/users/sendWithNodeMailer' ,data)
        .then(res=>{
            this.setState({
                sent:true
            },this.resetForm)
        }).catch(()=>{
            console.log("message sent")
        })
    }


    render() {
        return (
        <div className="container">
        <form onSubmit={this.formSubmit}>
            <div className='singleItem'>
                <label htmlFor='name'>name</label>
                <input type="text" name= "name" className='name' value={this.state.name} onChange={this.handleName}></input>
            </div>


            <div className='singleItem'>
                <label htmlFor='lastname'>lastname</label>
                <input type="text" name= "lastname" className='lastname' value={this.state.lastname} onChange={this.handleLastName}></input>
            </div>

            <div className='singleItem'>
                <label htmlFor='email'>email</label>
                <input type="text" name= "email" className='email' value={this.state.email} onChange={this.handleEmail}></input>
            </div>

            <div className='textArea singleItem'>
                <label htmlFor='message'>message</label>
                <input type="text" name= "message" className='message' value={this.state.message} onChange={this.handleMsg}></input>
            </div>

            <div className={this.state.sent ? 'msg msgAppear':'msg'}>Message has been sent</div>

            <div className='btn'>
                <button type='submit'>submit</button>
            </div>

            
        </form>

        </div>


        )
      }
    }

