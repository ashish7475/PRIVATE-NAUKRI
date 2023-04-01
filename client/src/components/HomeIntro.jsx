import React from "react";

import "./HomeIntro.css";
import styled from "styled-components";

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
        color: white;
      }
    }
    @media screen and (max-width: 768px) {
      span {
        display: flex;
        font-family: "Courier New", Courier, monospace;
        font-weight: bolder;
        font-size: 1.4rem;
        position: relative;
        top: 60px;
        left: 9%;
        color: white;
      }
    }
  `;

const HomeIntro = () => {

  return (
    <div className="home_intro">
      
      <img className="home__intro" src="/images/intro.gif" />
    </div>
  );
};

export default HomeIntro;
