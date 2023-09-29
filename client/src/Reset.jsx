import React from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './forget.css'

const Reset = () => {
    const navigate = useNavigate()
    const location = useLocation();
    
    const [pass,setPass] = React.useState({
        password:'',
        confirmPassword:''
    })

    const handleChange = (e)=>{
         setPass((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit = (e)=>{
         e.preventDefault()
         if(pass.password.length<6){
            toast.warning('Password must be atleast 6 characters long ')
         }
         else if(pass.password !== pass.confirmPassword){
            toast.error(`Passwords don't match !`)
         }
         else if(pass.password===''){
            toast.error('Empty password !')
         }
         else{
            const token = new URLSearchParams(location.search).get("token");
            if(!token){
                toast.error('Reset password token not found !')
            }
            else{
                axios.post('https://ggz.onrender.com/resetpassword',{token,newPassword:pass.password})
            .then((res,err)=>{
                if(err){
                    toast.error(`${err}`)
                }else{
                    if(res.status===500){
                        toast.error(`${res.data.message}! Please try again `);
                        setTimeout(() => {
                            navigate('/loginsignup')
                        }, 2000);
                    }
                    else{
                        toast.info(`${res.data.message}`)
                        setTimeout(() => {
                            navigate('/loginsignup')
                        }, 2000);
                    }
                    
                }
            })
            }
            
         }
    }
     
  return (
    <>
    <div class="form-gap"></div>
<div class="container">
	<div class="row inner__row">
		<div class="col-md-4 col-md-offset-4 inner___container">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="text-center">
                  <h3><i class="fa fa-lock fa-4x"></i></h3>
                  <h2 class="text-center">Reset Password</h2>
                  <p>You can reset your password here.</p>
                  <div class="panel-body">
    
                    <form 
                    id="register-form" 
                    role="form" 
                    autocomplete="off" 
                    class="form" 
                    onSubmit={handleSubmit}>
    
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon" style={{display:'flex',alignItems: 'center',border: '1px solid gray',borderRadius: '4px 0 0 4px'}}>
                            <span class="material-symbols-outlined">
                            lock_open
                            </span>
                         </span>
                          <input id="password" name="password" placeholder="New password" class="form-control"  type="password" value={pass.password} onChange={handleChange}/>
                        </div>
                        <div class="input-group" style={{marginTop:'10px'}}>
                          <span class="input-group-addon" style={{display:'flex',alignItems: 'center',border: '1px solid gray',borderRadius: '4px 0 0 4px',}}>
                            <span class="material-symbols-outlined">
                            lock_open
                            </span>
                         </span>
                          <input id="confirmpassword" name="confirmPassword" placeholder="Confirm Password" class="form-control"  type="password" value={pass.confirmPassword} onChange={handleChange}/>
                        </div>
                      </div>
                      <div class="form-group">
                        <input name="recover-submit" class="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit"/>
                      </div>
                      
                      <input type="hidden" class="hide" name="token" id="token" value=""/> 
                    </form>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
	</div>
</div>
</>
  )
}

export default Reset
