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


const InterviewReminder = () => {
    const [selectedValue,setSelectedValue] = React.useState('')
    const [interview,setInterview] = React.useState('')
    const [email,setEmail] = React.useState('')
     const [time, setTime] = React.useState('10:00');
     const [phone,setPhone] = React.useState('')
    const [date, setDate] = React.useState(new Date());
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
    
    console.log(new Date(), date)
    const handleSubmit = (e)=>{
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
       e.preventDefault()
       if(formattedDate>reminderFormattedDate){
        
        toast.error('Reminder Date must be equal or greater current Date.')
       }
       else if(formattedDate==reminderFormattedDate){
        const date1 = new Date(new Date().getTime());
        const hours = date1?.getUTCHours().toString().padStart(2, '0');
        const minutes = date1?.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date1?.getUTCSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        
        if(time<formattedTime){
            toast.error('Reminder Time must be greater than current time.')
        }
        else{
        toast.success('Reminder Set.')
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
    }, [])
    console.log(phone)
    
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
    <input type="email" class="form-control" id="inputEmail4" value={email} onChange={handleEmailChange}/>
  </div>
  
  <div class="col-12">
    <label for="interview" class="form-label">Select Job Interview</label>
     <select value={interview} class="form-select" id='interview'  aria-label="Select Job Interview" onChange={handleChangeInterview}>
  <option selected>Select Job Interview</option>
  <option value="email">Email</option>
  <option value="textmessage">Text Message</option>
  <option value="voicecall">Voice Call</option>
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
  {selectedValue==='textmessage' && <ul class="items">
    <li class="item">
      <div class="inner">
        <div className='int__outer'>
    <form class="row g-3 form3" onSubmit={handleSubmit}>
       
  <div class="col-md-12">
    <label for="phone" class="form-label">Phone Number</label>
    <input type="number" class="form-control" id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}
    />
  </div>
  
  <div class="col-12">
    <label for="interview" class="form-label">Select Job Interview</label>
     <select value={interview} class="form-select" id='interview'  aria-label="Select Job Interview" onChange={handleChangeInterview}>
  <option selected>Select Job Interview</option>
  <option value="email">Email</option>
  <option value="textmessage">Text Message</option>
  <option value="voicecall">Voice Call</option>
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


/*<ul class="items">
    <li class="item">
      <div class="inner">
        <div className='int__outer'>
    <form class="row g-3 form3">
        <h3>Interview Reminder</h3>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4"/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Phone Number</label>
    <input type="password" class="form-control" id="inputPassword4"/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity"/>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip"/>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
        </div>
      </div>
    </li>
    
  </ul> */