import React from "react";
import Typical from "react-typical";
import "./HomeIntro.css";
import styled from "styled-components";

const HomeIntro = () => {
  const Division = styled.div`
    span {
      display: flex;
      color: white;
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 3rem;
      position: absolute;
      z-index: 20;
      left: 20%;
    }
    @media screen and (max-width: 1179px) and (min-width: 763px) {
      span {
        display: flex;
        font-family: "Courier New", Courier, monospace;
        font-weight: bolder;
        font-size: 1rem;
        position: absolute;
        top: 80px;
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
        top: 60px;
        left: 9%;
        color: black;
      }
    }
  `;
  return (
    <div className="home_intro">
      <Division>
        <Typical
          steps={[
            "Looking for a job 🤕",
            1000,
            "You are at the right place 😀",
            1000,
            "Top MNC'S all in one place 👌🏼",
            1000,
            "Checkout the latest jobs 👇🏼",
            1000,
          ]}
          loop={Infinity}
          wrapper="span"
        />
      </Division>
      <img className="home__intro" src="/images/intro.gif" />
    </div>
  );
};

export default HomeIntro;
