import React, { useEffect } from "react";
import "./main.css";
import GridComponent from "./GridComponent";
import { CircularProgress } from "@mui/material";
import RobotAnimated from "./Loading";

export default function Main(props) {
  return (
    <>
      {!props.currentPageListings?.length ? (
        <div style={{marginLeft:'40%',paddingBottom:'170px'}}><RobotAnimated /></div>
      ) : (
        props.currentPageListings && (
          <div className="main__container">
            <GridComponent
              records={props.currentPageListings}
              setRecords={props.setRecords}
            />
          </div>
        )
      )}
    </>
  );
}
