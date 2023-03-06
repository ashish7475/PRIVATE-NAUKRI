import React from 'react'
import './aboutme.css'
import '../aboutcss/style.css'
import '../aboutcss/responsive.css'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Typical from 'react-typical'
import styled from "styled-components";

const Aboutme = () => {
      const Division = styled.div`
  span {
    display: flex;
    color:black;
    font-family: "Courier New", Courier, monospace;
    font-weight: bolder;
    font-size: 1rem;
    position: relative;
    float: left;
    
  }
    @media screen and (max-width:1179px)  and (min-width: 763px){
      span {
      display: flex;
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 1rem;
      position: absolute;
      top:80px;
      left: 9%;
      color: black;
    }
    }
  @media screen and (max-width: 768px) {
   
    span {
      display: flex;
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 1rem;
      position: relative;
      top:60px;
      left: 9%;
      color: black;
    }
  }
`;


    const texts = ["Click Me","Ashish Kumar", "Founder and CEO of Private Naukri","Full Stack Developer"];
   
  const [currentTextCounter, setCurrentTextCounter] = React.useState(0);
  const handleTypist = ()=>{
    if (currentTextCounter < texts.length - 1) { setCurrentTextCounter(currentTextCounter + 1)
  }
  else{
    setCurrentTextCounter(0)
    
  }
}
  return (
    <div class="about_section layout_padding">
      <Navbar/>
        <div className='socials'>
      <a class="social-icon__link" target='_blank' href="https://www.facebook.com/profile.php?id=100008709068075">
          <ion-icon name="logo-facebook" style={{color:'#FF0303'}}></ion-icon>
        </a>
      <a class="social-icon__link" target='_blank' href="https://twitter.com/ashishk7475">
          <ion-icon name="logo-twitter" style={{color:'#FF0303'}}></ion-icon>
        </a>
      <a class="social-icon__link" target='_blank' href="https://www.linkedin.com/in/ashish-kumar-19bb3611b/">
          <ion-icon name="logo-linkedin" style={{color:'#FF0303'}}></ion-icon>
        </a>
      <a class="social-icon__link" target='_blank' href="https://github.com/ashish7475">
          <ion-icon name="logo-github" style={{color:'#FF0303'}}></ion-icon>
        </a>
    
      <Link to='/feedbacks'> 
          <a className='feedback__anchor' href='#' style={{marginLeft:'4px',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <span class="material-symbols-outlined" style={{fontSize:'2rem' ,color:'#FF0303'}}>add_comment</span>
          </a>

      </Link>
      </div>
         <div class="container">
            <h1 class="about_taital">About Me</h1>
            <div className='aboutme__subheading' onClick={handleTypist}>
                 <Division>
          <Typical
            steps={[
              "Ashish Kumar",
              1000,
              "Founder and CEO Private Naukri",
              1000,
              "Web Developer",
              1000
            ]}
            loop={Infinity}
            wrapper="span"
          />
        </Division>
            </div>
            <div class="about_section_2">
               <div class="row">
                  <div class="col-lg-6">
                     <div class="about_image"><img class="aboutme_image" src="images/ashish2.png"/></div>
                  </div>
                  <div class="col-lg-6">
                     <div class="about_taital_main">
                        <p class="lorem_text">There are many products out their which you might think are same as us. However,<b> the difference between us and our competetors is that our solution does not require the companies to post any new listings on our website themselves.</b> By just their formal permission our website lists all the listings.Its a dynamic solution because the<b> listings are updated everyday</b>.We are still in developing phase and have just implemented the solution for some companies, however there's more to come in future.Job seekers can start with our website as a guest, however their are additional features that require user to be logged In.</p>
                        
                     </div>
                  </div>
               </div>
            </div>
         </div>
        
      </div>
  )
}

export default Aboutme
