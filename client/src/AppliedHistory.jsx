import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';

  



export default function DenseTable() {

  const [list,setList] = React.useState([])

  useEffect(()=>{
     const token = sessionStorage.getItem('token');
     axios.get('http://localhost:5000/appliedhistory',{
      headers:{'x-access-token':token}
     }).then((res,err)=>{
       setList(res.data.appliedJobs)
       
     }) 
  },[])


  return (
    <>
    <Navbar/>
    {!list.length ? <h1>Not applied to anything yet !</h1> :<><h1 style={{marginTop:'40px'}}><span>Applied History</span></h1>
    <TableContainer style={{marginTop:'50px',}} component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell align="right">Job Id</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Applied At</TableCell>
            <TableCell align="right">Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.jobId}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.appliedAt}</TableCell>
              <TableCell align="right">{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></>}
    </>
  );
}