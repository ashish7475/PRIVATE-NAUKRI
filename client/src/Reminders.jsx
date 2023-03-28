import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Reminders = () => {
    const navigate = useNavigate()
    useEffect(() => {
        
      const token = localStorage.getItem('token');
      if(token){

      }
      else{
        navigate('/meme')
      }
    
     
    }, [])
    
  return (
    <div>
      Reminders
    </div>
  )
}

export default Reminders
