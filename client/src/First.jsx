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
import UserContext from "./UserContext";
import Profile from "./Profile";
import Meme from "./Meme";

import Testimonials from "./Testimonials";
import ViewTestimonials from "./ViewTestimonials";
import DenseTable from "./AppliedHistory";
import Forget from "./Forget";
import Reset from "./Reset";
import ApplyStats from "./ApplyStats";
import Reminder from "./Reminder";
import Settings from "./Settings";
import Unsubscribe from "./Unsubscribe";
import InterviewReminder from "./InterviewReminder";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [image,setImage] = React.useState(null)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      setUserData(user);
    }
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      setUserData(user);
    }
    if (token) {
      setIsLoggedIn(true);
    }
  }, [image]);
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
      <UserContext.Provider
        value={{ userData, isLoggedIn, setUserData, setIsLoggedIn,image,setImage }}
      >
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
          <Route path="/meme" element={<Meme />} />
          <Route path="/appliedhistory" element={<DenseTable />} />
          <Route path="/testimonial" element={<Testimonials />} />
          <Route path="/viewtestimonial" element={<ViewTestimonials />} />
          <Route path='/forgetpassword' element={<Forget/>} />
          <Route path='/resetpassword' element={<Reset/>}/>
           <Route path='/applystats' element={<ApplyStats/>}/>
           <Route path='/reminder' element={<Reminder/>}/>
           <Route path='/settings' element={<Settings/>}/>
           <Route path="/unsubscribe/:email" element={<Unsubscribe/>}/>
           <Route path ='/interviewreminder' element={<InterviewReminder/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Main;
