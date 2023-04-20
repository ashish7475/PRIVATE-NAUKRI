import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./description.css";

const Description = (props) => {
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pageData, setPageData] = React.useState("");
  const [prefQual, setPrefQual] = React.useState("");
  const [basicQual, setBasicQual] = React.useState("");
  const [applyUrl, setApplyUrl] = React.useState("");
  const jobId = window.location.search.slice(7, window.location.search.length);
  useEffect(() => {
    window.scrollTo(0, 100); // Scroll window by 100 pixels on page load
  }, []);
  useState(() => {
    axios
      .get("https://private-naukri-production.up.railway.app/jobdetails", {
        params: {
          jobId: parseInt(jobId),
        },
      })
      .then((res, err) => {
        if (err) {
          console.error(err);
        } else {
          setPageData(
            res.data.description.slice(12, res.data.description.length)
          );
          setTitle(res.data.title);
          setLocation(res.data.location);
          setBasicQual(res.data.basicQualification);
          setPrefQual(res.data.preferredQualificaton);
          setApplyUrl(res.data.applyUrl);
        }
      });
  }, []);
  return (
    <div className="description__container">
      <img className="description__background" src="/images/des.webp" />
      <Navbar />
      <div className="description__outer">
        {title && (
          <div>
            <h2 className="job__title">{title}</h2>
          </div>
        )}
        {location && (
          <span className="location__span">
            {location} | JOB ID: {jobId}
          </span>
        )}
        <div className="description__body">
          {pageData && <p> {pageData} </p>}
          {basicQual && <p>{basicQual}</p>}
          {prefQual && <p>{prefQual}</p>}
          {applyUrl && (
            <a href={`${applyUrl}`} target="_blank">
              <button className="btn btn-primary apply__btn">Apply</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
