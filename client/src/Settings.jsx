
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './settings.css'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import UserContext from './UserContext'
import { Slide } from "@mui/material";
import RobotAnimated from "./components/Loading";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
    const [open,setOpen] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const { userData, isLoggedIn ,setUserData,image,setImage} = React.useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('User'))
   const navigate = useNavigate()
   const [pass,setPass] = React.useState({
        oldpassword:'',
        newpassword:'',
        confirmPassword:'',
    })
    useEffect(() => {
        const token = localStorage.getItem('token')
       if(!token){
            toast.error('Invalid Request !');
            setTimeout(()=>{navigate('/loginsignup')},1000);
        }
    }, [])
    

    const handlePasswordChange = (e)=>{
         setPass((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handlePasswordSubmit = async (e)=>{
        e.preventDefault()
        const token = localStorage.getItem('token')
       if(!token){
            toast.error('Invalid Request !');
            setTimeout(()=>{navigate('/loginsignup')},1000);
        }
        else if(pass.oldpassword.length===0){
            toast.error('Old Password is empty !!')
        }
        else if(pass.newpassword !== pass.confirmPassword){
            toast.error('New passwords dont match !!')
        }
        else if(pass.oldpassword===pass.newpassword){
            toast.error('Old password and new password cannot be same !')
        }
        else{
            setLoading(true)
            setOpen(true)
            axios.post('http://localhost:5000/changepassword',{...pass},{
                headers:{'x-access-token':token}
            }).then((res,err)=>{
                if(err){
                    toast.error(`${err}`)
                }
                else{
                   if(res.status===202){
                    toast.error(`${res.data.message}`)
                   }
                   else if(res.status===200){
                    toast.success(`${res.data.message}`)
                    const user = JSON.parse(localStorage.getItem('User'));
                    user.password = res.data.password;
                    localStorage.setItem('User',JSON.stringify(user))
                    setPass({oldpassword:'',newpassword:'',confirmPassword:''})
                    setLoading(false)
                    setOpen(false)
                   }
                   else{
                    toast.error(`${res.data.message}`)
                    setLoading(false)
                    setOpen(false)
                   }
                }
            })
        }

    }

  return (
    <>
    <Navbar/>
    {loading &&   <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Hang on a moment. Crafting your request</DialogTitle>
        <DialogContent>
          <div style={{marginLeft:'12%'}}><RobotAnimated  /></div>
        </DialogContent>
      </Dialog> }
    <section className='settings'>
		<div class="container" style={{marginTop:'20px'}}> 
			<h1 class="mb-5">Account Settings</h1>
			<div class="bg-white shadow rounded-lg d-block d-sm-flex">
				<div class="profile-tab-nav border-right">
					<div class="p-4">
						<div class="img-circle text-center mb-3">
							<img src={userData.profilePhotoUrl!==""?`http://localhost:5000/${userData.profilePhotoUrl}`:'/images/avatar.png'} alt="Image" class="shadow"/>
						</div>
						<h4 class="text-center">{user.name}</h4>
					</div>
					<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<a class="nav-link active" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
							<i class="fa fa-key text-center mr-1"></i> 
							Password
						</a>
					</div>
				</div>
				<div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
					<div class="tab-pane fade show active" id="password" role="tabpanel" aria-labelledby="password-tab">
                        <form onSubmit={handlePasswordSubmit} id='password'>
						<h3 class="mb-4">Password Settings</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Old password</label>
								  	<input type="password" name='oldpassword' value={pass.oldpassword} class="form-control" onChange={handlePasswordChange}/>
								</div>
							</div>
						</div>
						<div class="row">
                            
							<div class="col-md-6">
								<div class="form-group">
								  	<label>New password</label>
								  	<input type="password" name='newpassword' value={pass.newpassword} class="form-control" onChange={handlePasswordChange} />
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Confirm new password</label>
								  	<input type="password" name='confirmPassword' class="form-control" value={pass.confirmPassword} onChange={handlePasswordChange} />
								</div>
							</div>
                            <div className='settings-btn'>
							<button class="btn btn-primary" type='submit'>Update</button>
							<button class="btn btn-light">Cancel</button>
						</div>
                            
						</div>
                      </form>  
					</div>
				</div>
			</div>
		</div>
	</section>
    <Footer/>
    </>
  )
}

export default Settings
