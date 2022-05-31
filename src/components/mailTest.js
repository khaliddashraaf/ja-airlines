import emailjs from 'emailjs-com' ;
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';




// const Details = props => (
//     <tr>
      
    
//       {/* <td>{props.f.FlightNumber}</td>
//       <td>{props.f.DepartureTime}</td> */}
      
//       <td>
//          {/* <a href="#" onClick={() => { props.deleteFlight(props.f._id) }}>delete</a>| */}
//          {/* <a href="#" onClick={() => { props.confirmDelete(props.f._id) }}>delete???</a> */}
//          {/* <Link to={"/get-flight/"+props.f._id}>details</Link> */}
//          {/* <a href="#" onClick={() => { props.deleteFlight(props.f._id) }}>delete</a>| */}
//       </td>
//     </tr>
//   )


    
  
  


export default class MailTest extends Component {
    constructor() {
        super();

        
            this.state = {
              fromName:'alia',
              message:'hii',
              fromEmail:'alia.mahmoud1723@gmail.com'
            }
            
           
        
    }


     
    onChangeFN(e) {
        this.setState({
            fromName: e.target.value
        })
    }
    onChangemail(e) {
        this.setState({
            fromEmail: e.target.value
        })
    }
    onChangemsg(e) {
        this.setState({
            message: e.target.value
        })
    }

    

  



    render(){
        return (
          <div>
            <article>
              <form method="post" onClick={this.sendEmail} action="#">
                <div className="field half first">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" value={this.state.fromName} onChange={this.onChangeFN}/>
                </div>
                <div className="field half">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" value={this.state.fromEmail} onChange={this.onChangemail}/>
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" rows="4" value={this.state.message} onChange={this.onChangemsg}
                    placeholder = "..."></textarea>
                </div>
                <ul className="actions">
                  <li>
                    <input type="submit" value="Send Message" className="special"/>
                  </li>
                </ul>
              </form>
            </article>
          </div>
        )
      }

      sendEmail(event) {
        
        event.preventDefault();
        
        const serviceId='gmail'
        const templateId='template_tewog94'
        const userId='user_SrelKQpvWC9Iqm6txwOtO'

        const data = {
            service_id: 'service_gfkf4pn',
            template_id: 'template_tewog94',
            user_id: 'user_SrelKQpvWC9Iqm6txwOtO',
            template_params: {name: "john doe",email:"alia.mahmoud1723@gmail.com",message:"hello alia"}
        };

        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            
            body: JSON.stringify(data)
        })
        console.log(data);
       
        // event.target.reset();
      }
    
    }
    

