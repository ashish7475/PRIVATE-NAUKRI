import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import FilterMenu from './components/FilterMenu'
import Footer from "./components/Footer";
import { Checkbox, Dialog, DialogTitle, FormControlLabel } from "@mui/material";
import './applied.css'
import { toast } from "react-toastify";

export default function DenseTable() {
  const navigate = useNavigate();
  const [list, setList] = React.useState([]);
  
  const [search,setSearch] =React.useState('')
  const [currentPageListing,setCurrentPageListings] = React.useState([])
  const [currentPage,setCurrentPage] = React.useState(1)
  const [totalRecords,setTotalRecords] = React.useState(0)
  const [total,setTotal] =React.useState(0)
const [open, setOpen] = React.useState(false);
const [openItemId, setOpenItemId] = React.useState(null);
const [currentRecordStatus,setCurrentRecordStatus] = React.useState({
  applied:false,
  interview:false,
  placed:false,
  rejected:false
})
  const [filters,setFilters] = React.useState({
    type:'',
    companies:[],
    countries:[]
  })
  const [jobId,setjobId] = React.useState('')
 
  const handleChange=(e)=>{
    setSearch(e.target.value)
  }
   const handleChangeStatus = (e, status) => {
    setCurrentRecordStatus({applied:false,interview:false,placed:false,rejected:false})
    setCurrentRecordStatus((prev) => {
    const obj =
      status === "Applied"
        ? { applied: !prev.applied }
        : status === "Interview"
        ? { interview: !prev.interview }
        : status === "Rejected"
        ? { rejected: !prev.rejected }
        : { placed: !prev.placed };
        return { ...prev, ...obj };
  });
    
  }
  const handleSubmit = (e)=>{
      e.preventDefault();
      
      const st = currentRecordStatus.applied
    ? "Applied"
    : currentRecordStatus.interview
    ? "Interview"
    : currentRecordStatus.rejected
    ? "Rejected"
    : "Placed";
    
      axios.post('http://localhost:5000/updateapplystatus',{jobId,status:st},{
        headers:{'x-access-token':localStorage.getItem('token')}
      }).then((res,err)=>{
        if(err){
          toast.error(`${err}`);
        }
        else{
          toast.success(`${res.data.message}`)
          setOpenItemId(null);
          setCurrentRecordStatus({
          applied: false,
          interview: false,
          placed: false,
          rejected: false,
        });
        const updatedList = list.map((item) => {
          if (item.jobId === jobId) {
            return { ...item, status: st };
          }
          return item;
        });
        setList(updatedList);
        if(st!=='Applied'){
           setTimeout(()=>{toast.info(st==='Interview'?'All the best for the interview !':st==='Placed'?'Your hard work has paid off!! Great Job':'Rejection is protection for something greater that is to come.')},1000)
        }
        
        }
      })
      setOpen(false);
      

  }
   const handleClickOpen = (e,status,jobId,itemId) => {
    console.log(status)
   const obj =  status==='Applied'?{applied:true}:(status==='Interview'?{interview:true}:(status==='Rejected'?{rejected:true}:{placed:true}))
    setCurrentRecordStatus((prev)=>({...prev,...obj}))
    setjobId(jobId)
    setOpenItemId(itemId);
    
  };

  const handleClose = () => {
    setOpenItemId(null);
    setCurrentRecordStatus({applied:false,interview:false,placed:false,rejected:false})
  };
  const statuses = ['Applied','Interview','Placed','Rejected']

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/meme");
    }
    axios
      .get("http://localhost:5000/appliedhistory", {
        headers: { "x-access-token": token },
        params:{
          q:search,
          currentPage,
          filters:{...filters}
        }

      })
      .then((res, err) => {
        setList(res.data.appliedJobs);
        setTotal(res.data.totalApplied)
        setCurrentPageListings(res.data.appliedJobs)
        setTotalRecords(res.data.totalAppliedQuery)
        
      });
    
  }, []);

 

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/meme");
    }
    axios
      .get("http://localhost:5000/appliedhistory", {
        headers: { "x-access-token": token },
        params:{
          q:search,
          currentPage,
          filters:{...filters}
        }

      })
      .then((res, err) => {
        setList(res.data.appliedJobs);
        setTotal(res.data.totalApplied)
        setCurrentPageListings(res.data.appliedJobs)
        setTotalRecords(res.data.totalAppliedQuery)
      });
  }, [currentPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/meme");
    }
    axios
      .get("http://localhost:5000/appliedhistory", {
        headers: { "x-access-token": token },
        params:{
          q:search,
          currentPage,
          filters:{...filters}
        }

      })
      .then((res, err) => {
        setList(res.data.appliedJobs);
        setTotal(res.data.totalApplied)
        setCurrentPageListings(res.data.appliedJobs)
        setCurrentPage(1)
        setTotalRecords(res.data.totalAppliedQuery)
      });
  }, [filters,search]);

      useEffect(() => {
     window.scrollBy(0,100) // Scroll window by 100 pixels on page load
  }, []);
  
  
  return (
    <>
      <Navbar />
      
      {!total ? (
        <h1 style={{marginLeft:'32%',marginTop:'50px'}} >Not applied to anything yet !</h1>
      ) : (
        <div className="Table___outer">
          <h1 style={{marginLeft:'38%',marginTop:'8px'}} >
            <span >Applied History</span>
          </h1>
      <FilterMenu
             from={'Applied'}
             totalRecords={totalRecords}
             data={list} 
             setCurrentPage={setCurrentPage} 
             currentPage={currentPage} 
             setCurrentPageListings={setCurrentPageListings}
             currentPageListings={currentPageListing}
             filters={filters}
             setFilters = {setFilters}
             search={search}
             handleSearch={handleChange}
          />
          
          <TableContainer  component={Paper} >
            <Table sx={{ minWidth: 650 }}  aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right">Job Id</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Applied At</TableCell>
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row, i) => (
                  <>
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.jobId}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.appliedAt}</TableCell>
                    <TableCell align="right">{row.company}</TableCell>
                    <TableCell align="right">{
                    <span
                      onClick={(e)=>{handleClickOpen(e,row.status,row.jobId,row._id)}}
                      className={row.status==='Applied'
                        ? `badge badge-primary`
                        :(row.status==='Interview'?'badge badge-warning':(row.status==='Rejected'?'badge badge-danger':'badge badge-success'))}
                    >
                      {row.status==='Applied'
                        ? `Applied`
                        :(row.status==='Interview'?'Interview':(row.status==='Rejected'?'Rejected':'Placed'))}
                    </span>
                  }</TableCell>
                  </TableRow>
                   <Dialog key={i}  open={openItemId === row._id} onClose={handleClose}>
        <DialogTitle>
          <span>Current Status : {row.status}</span>
        </DialogTitle>
        
        <form key={i} onSubmit={handleSubmit} className="status__change__form">
          {statuses.filter(st=>st!==row.status).map(ele=>(
            <FormControlLabel
              label={ele}
              control={
                <Checkbox
                  name={ele}
                  checked={currentRecordStatus[ele.toLowerCase()]}
                  onChange={(e)=>{handleChangeStatus(e,ele)}}
                  value={ele}
                  
                />
              }
            />
          ))}
          <button className="btn btn-danger" type="submit">Change Status</button>
        </form>

      </Dialog></>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
         
        </div>
      )}
      <Footer style={{marginTop:'120px'}}/>
    </>
  );
}
