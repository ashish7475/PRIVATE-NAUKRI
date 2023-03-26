import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios'
import './unsubscribe.css'


const Unsubscribe = () => {
    const [message, setmessage] = useState(sessionStorage.getItem('message')?sessionStorage.getItem('message'):null)
    const navigate  = useNavigate()
    const location = useLocation();
    const [email,setEmail] = useState('')
  
 
  useEffect(()=>{
   
  const emailQuery = window.location.pathname.slice(13)
      setEmail(emailQuery)
      
      console.log(email)
  },[])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:5000/unsubscribe`,{email})
        .then((res,err)=>{
            setmessage(res.data.message)
            sessionStorage.setItem('message',res.data.message)
        }) 
    }
    console.log(message)
  return (
    
    <div className='unsub__outer'>
    {message ?<div className='message__outer'><h4 className='message'>{message}</h4></div> : email && email!==null &&<form onSubmit={handleSubmit}><div class="unsub__container">
        <img className='dont__go' src='/images/dontGo.gif'></img>

<div class="text1">
	<div class="wrapper1">
		<div id="L" class="letter1">U</div>
		<div class="shadow1">U</div>
	</div>
	<div class="wrapper1">
		<div id="I" class="letter1">N</div>
		<div class="shadow1">N</div>
	</div>
	<div class="wrapper1">
		<div id="G" class="letter1">S</div>
		<div class="shadow1">S</div>
	</div>
	<div class="wrapper1">
		<div id="H" class="letter1">U</div>
		<div class="shadow1">U</div>
	</div>
	<div class="wrapper1">
		<div id="T" class="letter1">B</div>
		<div class="shadow1">B</div>
	</div>
	<div class="wrapper1">
		<div id="N" class="letter1">S</div>
		<div class="shadow1">S</div>
	</div>
	<div class="wrapper1">
		<div id="E" class="letter1">C</div>
		<div class="shadow1">C</div>
	</div>
	<div class="wrapper1">
		<div id="S" class="letter1">R</div>
		<div class="shadow1">R</div>
	</div>
	<div class="wrapper1">
		<div id="Stwo" class="letter1">I</div>
		<div class="shadow1">I</div>
	</div>
    <div class="wrapper1">
		<div id="Stwo" class="letter1">B</div>
		<div class="shadow1">B</div>
	</div>
    <div class="wrapper1">
		<div id="Stwo" class="letter1">E</div>
		<div class="shadow1">E</div>
	</div>
</div>
		<p className='unsub__p'>We're sorry to see you go. If you no longer want to receive emails from us, please click the button below to unsubscribe:</p>
		<p><button type='submit' className="unsub__button">Unsubscribe</button></p>
		<p className='unsub__p footer__p'>If you believe you have received this email in error, or if you have any questions or concerns, please reply to this email and let us know.</p>
        
	</div></form>}
    </div>
    
  )
}

export default Unsubscribe
