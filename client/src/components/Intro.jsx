import React from 'react'
import { Link } from 'react-router-dom';
import Typical from 'react-typical'
import styled from "styled-components";

const Intro = () => {
    const Division = styled.div`
  color: grey;
  z-index: 100;
  display: flex;
  flex-direction: column;
  pre {
    font-family: "Festive", cursive;
    font-size: 2rem;
    position: absolute;
    top: 7%;
    float: left;
    opacity: 10%;
  }
  h1 {
    display: flex;
    color: white;
    font-family: "Courier New", Courier, monospace;
    font-weight: bolder;
    font-size: 4rem;
    position: relative;
    float: left;
    top: 40%;
    left: 40%;
  }
  .preClass {
    text-align: left;
    justify-content: left;
    color: #f9f871;
  }

  .postClass {
    text-align: left;
    justify-content: left;
    color: #f9f871;
    float: left;
    top: 63%;
  }

  .ContactMe {
    position: absolute;
    display: flex;
    flex-direction: row;
    float: left;
    top: 47%;
    padding: 0.5rem;
    margin: 0 1% 0 1%;
    border: 2px solid yellow;
    background-color: transparent;
    color: #f9f871;
    left: 54%;
  }

  .ContactMe:hover {
    background-color: yellow;
    color: black;
    font-weight: bold;
  }
  span {
    display: flex;
    color: white;
    font-family: "Courier New", Courier, monospace;
    font-weight: bolder;
    font-size: 4rem;
    position: relative;
    float: left;
    left: 55%;
    color: yellow;
    margin-top: 11%;
  }
    @media screen and (max-width:1179px)  and (min-width: 763px){
      span {
      display: flex;
      
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 3rem;
      position: relative;
      top:80px;
      left: 55%;
      color: yellow;
    }
    }
  @media screen and (max-width: 768px) {
    
    h1 {
      display: flex;
      color: white;
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 2rem;
      position: relative;
      float: left;
      top: 35%;
      left: 7%;
    }
    

    .postClass {
      text-align: left;
      justify-content: left;
      color: #f9f871;
      float: left;
      top: 55%;
    }

    .ContactMe {
      position: absolute;
      display: flex;
      flex-direction: row;
      float: left;
      top: 40%;
      padding: 0.5rem;
      border: 2px solid yellow;
      background-color: transparent;
      color: #f9f871;
      left: 57%;
    }

    .ContactMe:hover {
      background-color: yellow;
      color: black;
      font-weight: bold;
    }
    span {
      display: flex;
      color: white;
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 2rem;
      position: relative;
      top:100px;
      left: 49%;
      color: yellow;
    }
  }
`;
  return (
    <div className='intro__page'>
    <img src='/images/jobseek.webp' width='100%' height='750px' style={{position:'absolute', zIndex:'-20'}} /> 
     <Division>
          <Typical
            steps={[
              "Stay Hungry",
              1000,
              "Stay Foolish",
              1000,
              "--Steve Jobs",
              1000
            ]}
            loop={Infinity}
            wrapper="span"
          />
          <pre className="postClass">
            {`
                </h1>
            `}
          </pre>

          <Link to='/home'><button className="ContactMe">Lets Begin !</button></Link>
        </Division>

    </div>
  )
}

export default Intro
