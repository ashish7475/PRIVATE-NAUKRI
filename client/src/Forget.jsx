import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import './forget.css'


const Forget = () => {
  const [email,setEmail] = React.useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(email===''){
      toast.error(`Please enter a valid email !`)
    }
    else{
      axios.post('http://localhost:5000/forgotpassword',{email}).then((res,err)=>{
          if(err){
            toast.error(`${err}`)
          }
          else{
            if(res.status===404){
              toast.error(`${res.data.message}`)
            }
            else{
              toast.success(`${res.data.message}`)
            }
            
            
          }
      })
    }
    

  }
  const handleChange = (e)=>{
    setEmail(e.target.value)
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
                  <h2 class="text-center">Forgot Password?</h2>
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
                             mail
                            </span>
                         </span>
                          <input id="email" name="email" placeholder="email address" class="form-control"  type="email" value={email} onChange={handleChange}/>
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

export default Forget
