import React from 'react';
import Slide from "@mui/material/Slide";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn,
   MDBInput,
} from 'mdb-react-ui-kit';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Upcoming(props) {
   
  return (
    <>
    <MDBCard alignment='center'>
      <MDBCardHeader>{props.name} Reminders is still in making</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Interview Reminders via {props.name}</MDBCardTitle>
        <MDBCardText>Users ll be required to just fill up the phone numbers that they want to recieve the respective reminder at , and BOOOM!! you ll be getting the reminder at just the right time.</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>
       <p> Help us grow faster, and bring more features like this to you faster.</p>
        <br/>
        <p>Invite your friends</p>
        <MDBBtn onClick={props.handleClick}>Invite Friends</MDBBtn>
      </MDBCardFooter>
    </MDBCard>
     <Dialog
        open={props.open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Invite Friends</DialogTitle>
        <DialogContent>
    <form onSubmit={props.handleDialogSubmit}>
      <MDBInput wrapperClass='mb-4'  id='form4Example3' rows={4} label="Enter gmail address of you friends seperated by comma (,) " />
      <MDBBtn type='submit' className='mb-4' block>
        Invite
      </MDBBtn>
    </form>

        </DialogContent>
      </Dialog>
     
      </>
  );
}