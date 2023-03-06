import React from 'react'
import { Link } from 'react-router-dom'
import './feedbacks.css'

const Feedbacks = () => {
  return (
    <div className='google__forms__container'>
      <Link to='/home'>
      <button className='btn btn-danger btn-outlined' style={{position:'fixed',right:'24px',bottom:'20px',zIndex:'10000'}}>Home</button>
      </Link>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeyiwZ_FAp7gKCz6djRxCJ2xJlLQCD7pCodg5BYutbSWNBWng/viewform?embedded=true" width="640"  frameborder="0" marginheight="0" marginwidth="0" style={{overflow:'hidden'}}>Loading…</iframe>
    </div>
  )
}

export default Feedbacks
