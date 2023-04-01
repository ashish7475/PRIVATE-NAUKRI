import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from 'axios'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {toast} from 'react-toastify'
import RobotAnimated from "./components/Loading";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Invite = () => {

    const [open,setOpen] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const handleClose=()=>{
        setOpen(false);
    }
    

  const [ emails,setEmails] = useState('')
  const handleChange = (e)=>{
    setEmails(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    setOpen(true)
    const user = JSON.parse(localStorage.getItem('User'));
    const userEmail = user.email
    axios.post('http://localhost:5000/invite',{emails,userEmail}).then((res,err)=>{
      if(err){
        toast.error(`${err}`)
        setLoading(false)
        setOpen(false)
      }
      else if(res.status===202){
        toast.error(res.data.message)
        setLoading(false)
        setOpen(false)
      }
      else{
        toast.success(`${res.data.message}`)
        setEmails('')
        setLoading(false)
        setOpen(false)
      }
    })
  }

  useEffect(() => {

    window.scrollTo(0, 100); // Scroll window by 100 pixels on page load

  }, []);
  
  
  return (
    <>
      <Navbar />
      {loading &&   <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Hang on a moment. Crafting your request</DialogTitle>
        <DialogContent>
          <div style={{marginLeft:'12%'}}><RobotAnimated  /></div>
        </DialogContent>
      </Dialog> }
    
      <div
        className="contact_section layout_padding margin_top90"
        style={{ backgroundImage: `url('/images/contact-bg.png')` }}
      >
        <div className="container">
          <h1 className="contact_taital">Invite Friends</h1>

          <p className="contact_text">
            Help us grow faster and bring more features to you ASAP.
          </p>
          <div className="contact_section_2 layout_padding">
            <div className="row">
              <div className="col-md-6">
                <div className="contact_main">
                  <form onSubmit={handleSubmit}>          
                  <textarea
                    className="massage-bt"
                    placeholder="Enter Gmail adresses of your friends seperated by comma."
                    rows="10"
                    id="comment"
                    name="message"
                    value={emails}
                    onChange={handleChange}
                    style={{height:'100%'}}
                  ></textarea>
                  <div className="send_bt">
                    <button type="submit" className="btn btn-primary">Invite</button>
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

export default Invite;
