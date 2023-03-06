import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Meme = () => {
    useEffect(()=>{
        toast.warning("Sorry bro !! I am smarter than you !")
    },[])
  return (
    <div>
        
      <img src ='/images/meme.gif' height='100%' width='100%'/>
    </div>
  )
}

export default Meme
