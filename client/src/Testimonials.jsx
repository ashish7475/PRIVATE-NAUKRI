import React, { useEffect } from 'react'
import './testimonials.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from './components/Navbar';
import UserContext from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Testimonials = () => {
   const navigate = useNavigate()
   const userData = JSON.parse(sessionStorage.getItem('User'))
   const [test,setTest] = React.useState({
    testimonial:'',
    title:''
   })
   useEffect(()=>{
       if(!sessionStorage.getItem('token')){
         navigate('/meme')
       }
   },[])
   const handleChange = (e)=>{
      setTest((prev)=>({...prev,[e.target.name]:e.target.value}))
   }



  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/addtestimonial',{
      name:userData.name,
      username:userData.username,
      photoUrl:userData.profilePhotoUrl,
      testimonial:test.testimonial,
      title:test.title

    },{
      headers:{
        'x-access-token':sessionStorage.getItem('token')
      }
    }).then((res,err)=>{
      if(err){
        toast.error(err)
      }else{
        if(res.data.status=='ok'){
          toast.success(res.data.message)
        }
        else{
          toast.error(res.data.message)
        }
        setTest({
          testimonial:'',
          title:''
        })
      }

    })
  }

  const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
  return (
    <><Navbar/>
    <div className='testimonials'>
     
<Card sx={{ minWidth: 275 }}>
      <CardContent>
         <form onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" name='title' onChange={handleChange} value={test.title} class="form-control" id="title" placeholder="Title..."/>
  </div>
  
  <div class="form-group">
    <label for="testimonial">Testimonial</label>
    <textarea class="form-control"  onChange={handleChange} name='testimonial' value={test.testimonial} id="testimonial" rows="3"></textarea>
  </div>
  <button type="submit" className='btn btn-primary'>Submit</button>
</form>
      </CardContent>
      
    </Card>
    </div>
    </>
  )
}

export default Testimonials







