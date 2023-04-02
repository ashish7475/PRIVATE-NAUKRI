import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'

import './intro.css'


const Intro = () => {


  return (
    <div className="intro__page">
      <img
        src={`/images/job-back.webp`}
        className="job_back"
      />
      <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Typewriter words={['Looking for a job 🧑‍🎓','You are at the right place 🕺','Top MNCs all at one place 🤟🏻','Checkout the latest jobs 👇🏻']} loop typeSpeed={50} deleteSpeed={80} delaySpeed={500} cursorStyle='/'/>
        <Link to='/home'>
      <button className="home-btn">Lets Begin</button>
      </Link>
      </div>
      
      
    </div>
  );
};

export default Intro;
