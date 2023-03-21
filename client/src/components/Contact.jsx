import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios'
import {toast} from 'react-toastify'

const Contact = () => {

  const [ formData,setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    message:''
  })
  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/contactus',{...formData}).then((res,err)=>{
      if(err){
        toast.error(`${err}`)
      }
      else if(res.status===400){
        toast.error(`${res.data.message}`)
      }
      else{
        toast.success(`${res.data.message}`)
        setFormData({
          name:'',
          email:'',
          subject:'',
          message:''
        })
      }
    })
  }

  useEffect(() => {

    window.scrollTo(0, 100); // Scroll window by 100 pixels on page load
    const user  = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')):null;
    if(user){

      setFormData((prev)=>({
        ...prev,
        name:user.name,
        email:user.email,

      }))
    }
  }, []);
  
  
  return (
    <>
      <Navbar />
      <div
        className="contact_section layout_padding margin_top90"
        style={{ backgroundImage: `url('/images/contact-bg.png')` }}
      >
        <div className="container">
          <h1 className="contact_taital">Contact Us</h1>

          <p className="contact_text">
            We here you and We are here for you !
          </p>
          <div className="contact_section_2 layout_padding">
            <div className="row">
              <div className="col-md-6">
                <div className="contact_main">
                  <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  
                  <input
                    type="email"
                    className="mail_text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <textarea
                    className="massage-bt"
                    placeholder="Messege"
                    rows="5"
                    id="comment"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="send_bt">
                    <button type="submit" className="btn btn-primary">SEND</button>
                  </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="map_main">
                  <div className="map-responsive">
                    <iframe
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&amp;q=Greater+Kailash+Road,+Jammu"
                      width="600"
                      height="400"
                      frameborder="0"
                      style={{ border: 0, width: "100%" }}
                      allowfullscreen
                    ></iframe>
                    <span style={{color:'white',fontSize:'1.2rem'}}>Phone No: +917889644025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
