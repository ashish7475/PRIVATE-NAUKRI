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
import { Checkbox, FormControlLabel } from "@mui/material";
import './applied.css'
import './reminders.css'
import { toast } from "react-toastify";
import { Slide } from "@mui/material";
import RobotAnimated from "./components/Loading";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reminders = () => {
  const[color,setColor] = React.useState('yellow')
  const [open,setOpen] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
  const [user,setUser] = React.useState(null)
   const [search,setSearch] =React.useState('')
  const [currentPageListing,setCurrentPageListings] = React.useState([])
  const [currentPage,setCurrentPage] = React.useState(1)
   const [filters,setFilters] = React.useState({
    type:'',
    companies:[],
    countries:[]
  })
  const [jobId,setjobId] = React.useState('')
    const [reminders,setReminders] = React.useState([])
    const [total,setTotal] = React.useState([])
    const navigate = useNavigate()

    const handleResumeReminder = (e,jobId)=>{
      setLoading(true)
      setOpen(true)
      axios.post('https://ggz.onrender.com/resumereminder',{username:user.username,jobId}).then((res,err)=>{
        if(err){
          console.log(err);
        }
        else{
          if(res.status==202){
            toast.error(res.data.message);
            setLoading(false)
            setOpen(false)
          }
          else{
            toast.success(res.data.message)
            const changedReminders = reminders.map(rem=>{
              if(rem.jobId==jobId){
                rem.status='Active';
              }
              return rem;
            })
            console.log(reminders);
            setReminders(changedReminders)
            setLoading(false)
            setOpen(false)
          }
        }
      })
          
    }
    const handleStopReminder = (e,jobId)=>{
      setLoading(true)
      setOpen(true)
      axios.post('https://ggz.onrender.com/stopreminder',{username:user.username,jobId}).then((res,err)=>{
        if(err){
          console.log(err);
        }
        else{
          if(res.status==202){
            toast.error(res.data.message);
            setLoading(false)
            setOpen(false)
          }
          else{
            toast.success(res.data.message)
            const changedReminders = reminders.map(rem=>{
              if(rem.jobId==jobId){
                rem.status='Stopped';
              }
              return rem;
            })
            console.log(reminders);
            setReminders(changedReminders)
            setLoading(false)
            setOpen(false)
          }
        }
      })
    }
    const handleDeleteReminder = (e,jobId)=>{
       setLoading(true)
       setOpen(true)
      axios.post('https://ggz.onrender.com/deletereminder',{username:user.username,jobId}).then((res,err)=>{
        if(err){
          console.log(err);
        }
        else{
          if(res.status==202){
            toast.error(res.data.message);
            setLoading(false)
            setOpen(false)
          }
          else{
            toast.success(res.data.message)
            
           const changedReminders = reminders.filter(rem=>rem.jobId!=jobId);
            setTotal(total-1)
            setReminders(changedReminders)
            setLoading(false)
            setOpen(false)
          }
        }
      })
    }

const handleChange=(e)=>{
    setSearch(e.target.value)
  }

    useEffect(() => {
        
      const token = localStorage.getItem('token');
      const usr = JSON.parse(localStorage.getItem('User'));
      setUser(usr)
      if(token){
        axios.get('https://ggz.onrender.com/getreminders',{
          headers:{
            'x-access-token':token
          }
        })
        .then((res,err)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log(res.data)
            setReminders(res?.data?.reminders)
            setTotal(res?.data?.reminders?.length)
            setCurrentPage(1)
          }
        })
      }
      else{
        navigate('/meme')
      }
    
     
    }, [])
    
  return (
    <>
      <Navbar />
       {loading &&   <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        
      >
        
        <DialogContent>
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center'}}><ClimbingBoxLoader
        color={'black'}
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
        </DialogContent>
      </Dialog> }
      {!total ? (
        <h1 style={{marginLeft:'32%',marginTop:'50px'}} >No Reminders found!</h1>
      ) : (
        <div className="Table___outer">
          <h1 style={{marginLeft:'38%',marginTop:'38px',marginBottom:'20px'}} >
            <span >Interview Reminders</span>
          </h1>
          
      
          
          <TableContainer  component={Paper} >
            <Table sx={{ minWidth: 650 }}  aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right">Job Id</TableCell>
                  
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reminders.map((row, i) => (
                  <>
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.jobId}</TableCell>
                    
                    <TableCell align="right">{row.company}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{`${new Date(row.reminderDate).getDate()}/${new Date(row.reminderDate).getMonth()+1}/${new Date(row.reminderDate).getFullYear()}`}</TableCell>
                    <TableCell align="right">{row.reminderTime}</TableCell>
                    <TableCell align="right"><span className={row.status==='Active'
                        ? `badge badge-success`:'badge badge-danger'}>{row.status}</span></TableCell>
                    <TableCell align="right">
                      <div className="reminders_icons" style={{display:'flex',justifyContent:'flex-end'}}>

                          {row.status!='Active' && <span class={`material-symbols-outlined ${row.status!='Active'?'active':'disabled'}`} onClick={(e)=>{handleResumeReminder(e,row.jobId)}}>
                          play_arrow
                          </span>}
                          {row.status!='Stopped' && <span class={`material-symbols-outlined ${row.status!='Stopped'?'active':'disabled'}`} onClick={(e)=>{handleStopReminder(e,row.jobId)}}>
                          stop
                          </span>}
                          <span class="material-symbols-outlined" style={{color:'red'}} onClick={(e)=>{handleDeleteReminder(e,row.jobId)}}>
                          delete
                          </span>

                      </div>
                    </TableCell>
                  </TableRow>
                   </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
         
        </div>
      )}
      <Footer style={{marginTop:'120px'}}/>
    </>
  )
}

export default Reminders
