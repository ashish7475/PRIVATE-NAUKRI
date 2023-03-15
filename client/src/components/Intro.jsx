import React from "react";
import { Link } from "react-router-dom";
import Typical from "react-typical";
import styled from "styled-components";
import './intro.css'


const Intro = () => {

  const ran = Math.ceil(Math.random()*11)
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
      top: 20%;
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
      left: 25%;
      color: yellow;
      margin-top: 3%;
    }
    @media screen and (max-width: 1179px) and (min-width: 763px) {
      span {
        display: flex;
        font-family: "Courier New", Courier, monospace;
        font-weight: bolder;
        font-size: 3rem;
        position: relative;
        top: 20px;
        left: 15%;
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
        top: 18%;
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
        top: 10px;
        left: 9%;
        color: yellow;
      }
    }
  `;
  return (
    <div className="intro__page">
      <img
        src={`/images/msd${ran}.webp`}
        className="steve_jobs"
      />
      <Division>
        <Typical
          steps={[
            "Till the fullstop comes,",
            1000,
            "The sentence is not over",
            1000,
            "Mahendra Singh Dhoni",
            1000,
          ]}
          loop={Infinity}
          wrapper="span"
        />
        <pre className="postClass">
          {`
               
            `}
        </pre>

        <Link to="/home">
          <button className="ContactMe">Lets Begin !</button>
        </Link>
      </Division>
    </div>
  );
};

export default Intro;
