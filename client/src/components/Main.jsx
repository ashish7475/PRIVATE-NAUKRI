import React, { useEffect } from "react";
import "./main.css";
import GridComponent from "./GridComponent";
import { CircularProgress } from "@mui/material";
import RobotAnimated from "./Loading";

export default function Main(props) {
  return (
    <>
      {!props.currentPageListings?.length ? (
        <RobotAnimated />
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
