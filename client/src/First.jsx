
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginSignup from "./LoginSignup";
import Feedbacks from "./components/Feedbacks";
import About from "./components/About";
import Contact from "./components/Contact";
import Aboutme from "./components/Aboutme";
import Description from "./components/Description";
import Intro from "./components/Intro";
import { ToastContainer } from "react-toastify";
import AnimatedCursor from "react-animated-cursor";
import UserContext from './UserContext';
import Profile from "./Profile";
import Meme from "./Meme";
import AppliedHistory from "./AppliedHistory";
import Testimonials from "./Testimonials";
import ViewTestimonials from "./ViewTestimonials";


const Main = () => {
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
    const [userData,setUserData] = React.useState(null)
    
  useEffect(()=>{
     const token = sessionStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem('User'))
     if(user){
        setUserData(user);
     }
     if(token){
        setIsLoggedIn(true)
     }
  },[])
  return (
     <BrowserRouter>
    <div>
      <ToastContainer
        position="top-center"
        style={{ width: "80%", fontSize: "1.1rem" }}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <AnimatedCursor
        innerSize={20}
        outerSize={10}
        color="0, 0, 0"
        outerAlpha={0.2}
        innerScale={0.5}
        outerScale={5}
      />
    </div>
    <UserContext.Provider value={{ userData, isLoggedIn,setUserData,setIsLoggedIn }}>
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/loginsignup" element={<LoginSignup />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/feedbacks" element={<Feedbacks />} />
      <Route path="/home" element={<App />} />
      <Route path="/contactus" element={<Contact />} />
      <Route path="/aboutme" element={<Aboutme />} />
      <Route path="/description" element={<Description />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/meme" element={<Meme/>}/>
      <Route path='/appliedhistory' element={<AppliedHistory/>}/>
      <Route path='/testimonial' element={<Testimonials/>}/>
      <Route path='/viewtestimonial' element={<ViewTestimonials/>}/>
    </Routes>
    </UserContext.Provider>
  </BrowserRouter>
  )
}

export default Main
