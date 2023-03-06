import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/style.css'
import Footer from './components/Footer'
import FormData from 'form-data'
import { toast } from 'react-toastify'
import axios from 'axios'
import UserContext from './UserContext'


const LoginSignup = () => {

    const {setUserData,setIsLoggedIn} = React.useContext(UserContext);
  const [image,setImage] = React.useState(null)
  const [userSignupData,setUserSignupData] = React.useState({
    name:'',
    username:'',
    password:'',
    confirmPassword:'',
    email:'',
  })
  const [userLoginData,setUserLoginData] = React.useState({
    username:'',
    password:''
  })
  const navigate = useNavigate()
  const handleSignupChange = (e)=>{
      setUserSignupData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleLoginChange = (e)=>{
    setUserLoginData((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  
  
  const handleSignup = (e)=>{
    e.preventDefault()
   if(userSignupData.password != userSignupData.confirmPassword){
        toast.error("Passwords dont match!")
    }
    else if(userSignupData.password.length<6){
        toast.warning("Password must be atlest 6 characters !");
    }
    else{
        const formData = new FormData()
        formData.append('name',userSignupData.name)
        formData.append('username',userSignupData.username)
        formData.append('email',userSignupData.email)
        formData.append('password',userSignupData.password)
        formData.append('image',image)
        axios.post('http://localhost:5000/signup',formData,{

        }).then((res,err)=>{
            if(err){
                toast.error(err);
            }
            else{
                res.data.status===400?toast.error(res.data.message):toast.success(res.data.message)
                if(res.data.status!==400){
                     setUserSignupData({
                        username:'',
                        name:'',
                        email:'',
                        password:'',
                        confirmPassword:'',
                     })
                     window.scrollTo(0, 1100);
                }
            }
        })
    }
   
    

    
    //! check if current username and email is avaliable or already taken */
  }
  const handleLogin = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/login',userLoginData)
    .then((res,err)=>{
        if(err){
            toast.error(err);
        }
        else{
            console.log(res.data)
            if(res.data.status==='error'){
                toast.error(res.data.message)
            }
            else{
                toast.success(res.data.message)
                console.log(res.data)
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('User',JSON.stringify(res.data.user))
                setIsLoggedIn(true)
                setUserData(res.data.user)
                setTimeout(()=>{navigate('/home')})
            }
        }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 200); // Scroll window by 100 pixels on page load
  }, []);

  return (
    
<div className="main">


        <section className="signup" id='sign-up'>
            <div className="container login">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form  onSubmit={handleSignup}  className="register-form" id="register-form">
                             <div className="form-group">
                                <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" onChange={handleSignupChange} name="name"  placeholder="Name" value={userSignupData.name}/>
                            </div>
                            <div className="form-group">
                                <label for="username"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" onChange={handleSignupChange} name="username"  placeholder="Username" value={userSignupData.username}/>
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" onChange={handleSignupChange} name="email" id="email" placeholder="Your Email" value={userSignupData.email}/>
                            </div>
                            <div className="form-group">
                                <label for="password"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" onChange={handleSignupChange} name="password" id="password" placeholder="Password" value={userSignupData.password}/>
                            </div>
                            <div className="form-group">
                                <label for="confirmpassword"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" onChange={handleSignupChange} name="confirmPassword" id="confirmPassword" value={userSignupData.confirmPassword} placeholder="Confirm Passoword"/>
                            </div>
                            <div className='form-group'>
                                <label for="photo">
                                    <span>Profile Photo</span>
                                </label>
                                <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
                            </div>
                            
                            <div className="form-group form-button">
                                
                                <button style={{height:'40px',padding:'8px 25px'}} type="submit"  className="form-submit">Register</button>

                                <Link to='/home'>
                                    <button className='btn btn-danger btn-outlined' style={{cursor:'pointer !important',marginTop:'5px',marginLeft:'10px'}}>
                                        Guest Entry
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image1">
                        <figure><img style={{width:'400px',height:'400px',borderRadius:'50%'}} src="/images/PRivate1.png" alt="sing up image"/></figure>
                        <a href="#sign-in" className="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="sign-in" id="sign-in">
            <div className="container login">
                <div className="signin-content">
                    <div className="signin-image1">
                        <figure><img src="/images/Private Naukri.gif" style={{borderRadius:'50%'}} alt="sing up image"/></figure>
                        
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <form onSubmit={handleLogin}  className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="username"><i className="zmdi zmdi-account material-icons-name"></i></label>

                                <input 
                                type="text" 
                                name="username" 
                                value={userLoginData.username} 
                                onChange={handleLoginChange} 
                                id="username" 
                                placeholder="Username"
                                />

                            </div>
                            <div className="form-group">
                                <label for="password"><i className="zmdi zmdi-lock"></i></label>
                                <input
                                 type="password" 
                                 name="password" 
                                 id="passoword" 
                                 placeholder="Password"
                                 value={userLoginData.password} 
                                 onChange={handleLoginChange} 
                                 />
                            </div>
                            
                            <div className="form-group form-button" style={{display:'flex',alignItems:'start',flexDirection:'column',justifyContent:'center'}}>
                                <input type="submit" className="form-submit" value="Log in" />
                                <Link to='/home'>
                                    <button className='btn btn-danger btn-outlined' style={{cursor:'pointer !important',marginTop:'5px'}}>Guest Entry
                                    </button>
                                </Link>
                                <a href="#" className="signup-image-link" style={{marginTop:'5px'}}>Create an account</a>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
    <Footer/>
    
    </div>

  )
}

export default LoginSignup
