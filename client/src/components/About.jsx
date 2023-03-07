import React, { useEffect } from "react";
import "../aboutcss/style.css";
import "../aboutcss/responsive.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div class="about_section layout_padding">
        <div class="container">
          <h1 class="about_taital">About Us</h1>
          <p class="about_text">
            Private Naukri is a platform that brings together job listings from
            various MNCs into single bucket.
          </p>
          <div class="about_section_2">
            <div class="row">
              <div class="col-lg-6">
                <div class="about_image">
                  <img src="images/about-img.png" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="about_taital_main">
                  <p class="lorem_text">
                    There are many products out their which you might think are
                    same as us. However,
                    <b>
                      {" "}
                      the difference between us and our competetors is that our
                      solution does not require the companies to post any new
                      listings on our website themselves.
                    </b>{" "}
                    By just their formal permission our website lists all the
                    listings.Its a dynamic solution because the
                    <b> listings are updated everyday</b>.We are still in
                    developing phase and have just implemented the solution for
                    some companies, however there's more to come in future.Job
                    seekers can start with our website as a guest, however their
                    are additional features that require user to be logged In.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
