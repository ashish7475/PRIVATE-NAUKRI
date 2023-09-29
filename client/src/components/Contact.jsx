import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios'
import {toast} from 'react-toastify'
import { Slide } from "@mui/material";
import RobotAnimated from "./Loading";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = () => {
  const [email,setEmail] = React.useState('')
  const [name,setName] = React.useState('')
const [open,setOpen] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
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
    setLoading(true)
    setOpen(true)
    axios.post('https://ggz.onrender.com/contactus',{...formData}).then((res,err)=>{
      if(err){
        toast.error(`${err}`)
      }
      else if(res.status===400){
        toast.error(`${res.data.message}`)
        setLoading(false)
        setOpen(false)
      }
      else{
        toast.success(`${res.data.message}`)
        setLoading(false)
        setOpen(false)
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

  }, []);
  
  
  return (
    <>
      <Navbar />
      {loading &&    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        
      >
        
        <DialogContent>
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center'}}><ClimbingBoxLoader
        color={'black'}
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
        </DialogContent>
      </Dialog> }
      <div
        className="contact_section layout_padding margin_top90"
        style={{ backgroundImage: `url('/images/contact-bg.png')` }}
      >
        <div className="container">
          <h1 className="contact_taital">Contact Us</h1>

          <p className="contact_text">
            We hear you and We are here for you !
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
                    placeholder="Message"
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
