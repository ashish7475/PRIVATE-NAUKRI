import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Contact = () => {
    useEffect(() => {
    window.scrollTo(0, 100); // Scroll window by 100 pixels on page load
  }, []);
  return (
   <>
   <Navbar/>
    <div className="contact_section layout_padding margin_top90" style={{backgroundImage: `url('/images/contact-bg.png')` }}>
         <div className="container">
            <h1 className="contact_taital">Contact Us</h1>
            
            <p className="contact_text">majority have suffered alteration in some form, by injected humour, or </p>
            <div className="contact_section_2 layout_padding">
               <div className="row">
                  <div className="col-md-6">
                     <div className="contact_main">
                        <input type="text" className="mail_text" placeholder="Full Name" name="Full Name"/>
                        <input type="text" className="mail_text" placeholder="Phone Number" name="Phone Number"/>
                        <input type="text" className="mail_text" placeholder="Email" name="Email"/>
                        <textarea className="massage-bt" placeholder="Messege" rows="5" id="comment" name="Message"></textarea>
                        <div className="send_bt"><a href="#">SEND</a></div>
                        
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="map_main">
                        <div className="map-responsive">
                            <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&amp;q=Greater+Kailash+Road,+Jammu" width="600" height="400" frameborder="0" style={{border:0, width: '100%' }}allowfullscreen></iframe>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
      </div>
      
      </>
  )
}

export default Contact
