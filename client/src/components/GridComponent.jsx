import React from 'react';
import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';
import { Button, Checkbox, DialogActions, DialogContent, Fab, FormControlLabel, FormGroup, Grid, Pagination } from '@mui/material';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardHeader
} from 'mdb-react-ui-kit';
import './gridComp.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const GridComponent = ({ records }) => {
  const username = JSON.parse(sessionStorage.getItem('User')).username
  const rows = [];
  const navigate =  useNavigate()
  const [openItemId, setOpenItemId] = React.useState(null);
  const handleCloseDialog = () => {
  setOpenItemId(null);
};
const handleOpenDialog = (itemId) => {
  setOpenItemId(itemId);
};
  const handleChangeStatus = async (e,record)=>{
   
    const data =  await axios.post('http://localhost:5000/addappliedhistory',{record},{
      headers:{'x-access-token':sessionStorage.getItem('token')}
    })
     setOpenItemId(null);
     console.log(data.data)
     
     toast.success(data.data.message)
  setTimeout(()=>window.location.reload(),1500)
 
  }
  console.log(records)

  // Divide records into rows of 4
  for (let i = 0; i < records.length; i += 4) {
    const row = records.slice(i, i + 4);
    rows.push(row);
  }

  // Create JSX elements for each row and record
  const gridElements = rows.map((row, index) => (
     <>
   { records &&<MDBRow key={index}  style={{margin:'0 !important',marginTop:'10px',padding:'0 10px'}}>
      {row.map((record,i) => (
        <MDBCol sm='6' lg='3' style={{marginTop:'10px'}} key={record._id}>
        <MDBCard className='card' >
          <MDBCardHeader style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
            {record.companyName==='Amazon'?<img height='30xp' src='/images/amazon.webp' alt='Amazon'/>
            :<img height='30xp' src='/images/flipkart.png' alt='Amazon'/>}

         {sessionStorage.getItem('token') &&<span className={record.applied.find((ele)=>ele.username===username)?'badge badge-success':'badge badge-danger'}>{record.applied.find((ele)=>ele.username===username)?`Applied`:'Not Applied'}</span>} 
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle className='card__title'>{record.title}</MDBCardTitle>
            <MDBCardText className='card__text'>
              {`Location: ${record.location} `}
               <br/>
              {`Job ID: ${record.jobId}`}
              <br/>
              {`Type: ${record.type}`}
            </MDBCardText>
            <Link to={{pathname:'/description',search:`?jobId=${record.jobId}`}}>
            <MDBBtn>See more</MDBBtn>
            </Link>
           
      {!record.applied.find((ele)=>ele.username===username) && sessionStorage.getItem('token')  && <Button variant="outlined" color="error" onClick={() => handleOpenDialog(record._id)}>
        Action
      </Button>}
      <Dialog  open={openItemId === record._id} onClose={handleCloseDialog}>
         
        <DialogTitle>Change Apply Status</DialogTitle>
       
        <DialogContent >
        Click on the submit button if you want to change the status to applied.
        Note: Once the status is changed to applied it cannot be undone.
        </DialogContent>
         <div style={{display:'flex',alignItems:'center',justifyContent:'center',paddingBottom:'30px'}}>
          <Button style={{marginLeft:'10px'}} onClick={handleCloseDialog} class="btn btn-danger">
            Close
          </Button>
          <Button style={{marginLeft:'10px'}} onClick={(e)=>handleChangeStatus(e,record)} class="btn btn-success">
            Submit
          </Button>
          </div>
      </Dialog>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      ))}
    </MDBRow>
}
   </>
    
  ));

  return <div className="grid">{gridElements}</div>;
};

export default GridComponent