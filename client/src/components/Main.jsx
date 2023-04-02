import React, { useEffect } from "react";
import "./main.css";
import GridComponent from "./GridComponent";
import Slide from "@mui/material/Slide";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Main(props) {
  return (
    <>
      {props?.currentPageListings?.length===0 ? (
       
          <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <ClimbingBoxLoader
        color={'brown'}
        loading={true}
        size={45}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
       
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
