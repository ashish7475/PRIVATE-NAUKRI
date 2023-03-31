import React, { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './interview.css'
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const InterviewReminder = () => {
  const navigate = useNavigate()
    const [selectedValue,setSelectedValue] = React.useState('')
   
    const [email,setEmail] = React.useState('')
     const [time, setTime] = React.useState('');
     const [phone,setPhone] = React.useState('')
    const [date, setDate] = React.useState(new Date());
    const [company,setCompany] = React.useState('')
    const [type,setType] = React.useState('')
    const [interviews,setInterviews] = React.useState([])
    const [interview,setInterview] = React.useState('')

    const handleCompanyChange = (e)=>{
      setCompany(e.target.value)
    }
    const handleTypeChange = (e)=>{
      setType(e.target.value)
    }

    dayjs.extend(customParseFormat);
    

    const onChange = (time, timeString) => {
     setTime(timeString)
    };
    const handleSelect = (e)=>{
       setSelectedValue(e.target.value)
    }
    const handleChangeInterview = (e)=>{
        setInterview(e.target.value)
    }
    const handleEmailChange = (e)=>{
       setEmail(e.target.value)
    }
    
    
    const handleSubmit = (e)=>{
      e.preventDefault()
        if(email==''){
          toast.error('Please enter a valid email address.');
          return
          
        }
        else if(company==='' || company==='Company'){
          toast.error('Please select a valid company.')
          return
          
        }
        else if(type==='' || type==='Type'){
          toast.error('Please select a valid type of job');
          return
         
        }
        else if(interview=='' || interview=='Job Interview'){
          toast.error('Please select a valid job interview.')
          return
        }
        else if(time===''){
          toast.error('Please choose a valid time.')
          return
          
        }
        
        
        
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = String(currentDate.getFullYear()).slice(-2);
        const formattedDate = `${day} ${month} ${year}`;

        const reminderDate = date;
        const day1 = String(reminderDate.getDate()).padStart(2, '0');
        const month1 = String(reminderDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year1 = String(reminderDate.getFullYear()).slice(-2);
        
        const reminderFormattedDate= `${day1} ${month1} ${year1}`;
       
       if(formattedDate>reminderFormattedDate){
        
        toast.error('Reminder Date must be equal or greater current Date.')
       }
       else if(formattedDate==reminderFormattedDate){
        const date1 = new Date(new Date().getTime());
        const hours = date1?.getUTCHours().toString().padStart(2, '0');
        const minutes = date1?.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date1?.getUTCSeconds().toString().padStart(2, '0');
        let formattedTime = `${hours}:${minutes}:${seconds}`;
          
        let updatedSelectedTime=time;
        let updatedCurrentTime=formattedTime;
        const [selhrs,selmin,selsec]= time.split(':')
        if(selhrs=='00'){
          updatedSelectedTime = `24:${selmin}:${selsec}`
        }
        if(hours =='00'){
          updatedCurrentTime = `24:${minutes}:${seconds}`
        }
        if(updatedSelectedTime<updatedCurrentTime){
            toast.error('Reminder Time must be greater than current time.')
        }
        else{
          if(selectedValue==='email'){
            const user = JSON.parse(localStorage.getItem('User'));
           axios.post('http://localhost:5000/setinterviewreminder',
           {
            company,
            email:user.email
            ,jobId:interview
            ,phone
            ,choice:selectedValue
            ,date
            ,time,
            username:user.username,
          }
           ,{
            headers:
            {
              'x-access-token':localStorage.getItem('token')
            }

           }).then((res,err)=>{
            if(err){
              console.log(err);
            }
            else{
              if(res.status===203){
                toast.error(res.data.message)
              }
              else if(res.status===200){
                toast.info(res.data.message)
                setInterview('') 
              }
              else{
                toast.error('An error has occured please try again!')
              }
            }
           })
        }
        else if(selectedValue==='textmessage'){
            if(phone.toString().length!==10){
              toast.error('Phone Number must be exactly 10 characters.');
            }
        }
        else{

        }
       //! toast.success('Reminder Set.')
       }
       }
       else{
        toast.success('Reminder Set.')
       }
       
       
       
    }
    

    useEffect(() => {
      const user = localStorage.getItem('User')
      if(user.length){
        setEmail((JSON.parse(user)).email)
      }
      else{
        navigate('/meme')
      }
    }, [])

    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('User'));
      if(company!=='' || type!==''){
         axios.post('http://localhost:5000/getinterviews',
             {
               username:user.username
               ,company
               ,type
             },
             {
               headers:{
                 'x-access-token': localStorage.getItem('token')
               }
             }
             ).then((res,err)=>{
               console.log(res)
               if(err){
                 toast.error('An error has occured',err);
               }
               else{
                 if(res.status===202){
                   toast.error(res.data.message);
                   setInterviews([])
                   setInterview('')
                 }
                 else{
                   setInterviews(res.data.jobs)
                 }
       
               }
             })
      
      }
      
    
    },[type,company])
    
    
  return (
    <><Navbar/>
  <div class="wrapper">
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:'30px'}}>
     <h2 style={{textAlign:'center',marginBottom:'15px',fontFamily:'cursive'}}>Interview Reminder</h2>
      <label for="choice" class="form-label">Reminder Method</label>
  <select value={selectedValue} id='choice' class="form-select" style={{width:'50%'}} aria-label="Select Reminder Method" onChange={handleSelect}>
  <option selected>Select Reminder Method</option>
  <option value="email">Email</option>
  <option value="textmessage">Text Message</option>
  <option value="voicecall">Voice Call</option>
</select>
</div>
{selectedValue==='email' && <ul class="items">
    <li class="item">
      <div class="inner">
        <div className='int__outer'>
    <form class="row g-3 form3" onSubmit={handleSubmit}>
       
  <div class="col-md-12">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4" placeholder='Email...' value={email} onChange={handleEmailChange}/>
  </div>
   <div class="col-6">
    <label for="companies" class="form-label">Company</label>
     <select value={company} class="form-select" id='companies'  aria-label="Company" onChange={handleCompanyChange}>
  <option selected>Company</option>
  <option value="Google">Google</option>
  <option value="Amazon">Amazon</option>
  <option value="Flipkart">Flipkart</option>
</select>
  </div>
  <div class="col-6">
    <label for="Type" class="form-label">Type</label>
     <select value={type} class="form-select" id='Type'  aria-label="Type" onChange={handleTypeChange}>
  <option selected>Type</option>
  <option value="Full Time">Full Time</option>
  <option value="Internship">Internship</option>
</select>
  </div>
  <div class="col-12">
    <label for="interview" class="form-label">Job Interviews</label>
     <select value={interview} class="form-select" id='interview'  aria-label="Job Interview" onChange={handleChangeInterview}>
  <option selected>Job Interview</option>
  {interviews?.length && interviews.map(interview=>(
      <option key={interview.jobId} value={interview.jobId}>
     <p> Title: <b>{interview.title}</b> | Job ID: <span><i>{interview.jobId}</i></span> </p>
      </option>
    ))}
</select>
  </div>
  
  <div class="col-md-6">
    <label for="date" class="form-label">Date</label>
    <DatePicker selected={date} onChange={(date) => setDate(date)} />
  </div>
 <div class="col-md-6">
    <label for="time" class="form-label">Time</label>
   <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
</div>
  
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Set Reminder</button>
  </div>
</form>
        </div>
      </div>
    </li>
    
  </ul> }
  {(selectedValue==='textmessage' || selectedValue==='voicecall') && <ul class="items">
    <li class="item">
      <div class="inner">
        <div className='int__outer'>
    <form class="row g-3 form3" onSubmit={handleSubmit}>
       
  <div class="col-md-12">
    <label for="phone" class="form-label">Phone Number</label>
    <input type="number" class="form-control" id="phone" placeholder='Phone no...' value={phone} onChange={(e)=>{setPhone(e.target.value)}}
    />
  </div>
  <div class="col-6">
    <label for="companies" class="form-label">Company</label>
     <select value={company} class="form-select" id='companies'  aria-label="Company" onChange={handleCompanyChange}>
  <option selected>Company</option>
  <option value="Google">Google</option>
  <option value="Amazon">Amazon</option>
  <option value="Flipkart">Flipkart</option>
</select>
  </div>
  <div class="col-6">
    <label for="Type" class="form-label">Type</label>
     <select value={type} class="form-select" id='Type'  aria-label="Type" onChange={handleTypeChange}>
  <option selected>Type</option>
  <option value="Full Time">Full Time</option>
  <option value="Internship">Internship</option>
</select>
  </div>
  <div class="col-12">
    <label for="interview" class="form-label">Job Interviews</label>
     <select value={interview} class="form-select" id='interview'  aria-label="Job Interview" onChange={handleChangeInterview}>
  <option selected>Job Interview</option>
  {interviews && interviews.map(interview=>(
      <option key={interview.jobId} value={interview.jobId}>
     <p> Title: <b>{interview.title}</b> | Job ID: <span><i>{interview.jobId}</i></span> </p>
      </option>
    ))}
</select>
  </div>
  

  
  <div class="col-md-6">
    <label for="date" class="form-label">Date</label>
    <DatePicker selected={date} onChange={(date) => setDate(date)} />
  </div>
 <div class="col-md-6">
    <label for="time" class="form-label">Time</label>
   <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
</div>
  
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Set Reminder</button>
  </div>
</form>
        </div>
      </div>
    </li>
    
  </ul> }
</div>
<Footer/>
</>)
}

export default InterviewReminder
