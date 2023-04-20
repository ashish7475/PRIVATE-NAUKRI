import React, { Component, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import {toast }from 'react-toastify'
import './viewTest.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ViewTestimonials = () => {
  const [testimonials,setTestimonials] = useState(null)
  

  useEffect(()=>{
    axios.get('https://private-naukri-production.up.railway.app/testimonials').then((res,err)=>{
      if(err){
        toast.error(`${err}`);
      }
      else{
        
        setTestimonials(res.data)
      }
    })
       
  },[])
  return (
    <div className='testOuter'>
    <Navbar/>
    <img className='testBack' src='/images/bgT.webp' />
    <div className='carouselContainer'  style={{marginTop:'100px'}}>
    <Carousel>
              {testimonials && testimonials.map(testimonial=>(
                 <div className='testimonials__container'>
                    <img className='avatar__test' style={{height:'60px',width:'60px',borderRadius:'50%'}} src={`https://private-naukri-production.up.railway.app/${testimonial.photoUrl}`} />
                    <span className='name__test'>{testimonial.name}</span>
                    <div className='testimonial__content'>
                        <h3 className='title__test'>{testimonial.title}</h3>
                        <p className='test__test'>{testimonial.testimonial}</p>
                    </div>
                    
                </div>
              ))  }
                
    </Carousel>
    </div>
    <Footer/>
    </div>
  )
}

export default ViewTestimonials
