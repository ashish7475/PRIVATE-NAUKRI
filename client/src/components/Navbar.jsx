import React from 'react'
import './navbar.css'
import * as mdb from 'mdb-ui-kit'; // lib
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';


const Navbar = (props) => {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.clear()
    setUserData(null)
    navigate('/loginsignup')
  }
  const { userData,isLoggedIn,setUserData } = React.useContext(UserContext);
 

  return (
    <div className="bg-success p-2 text-dark bg-opacity-10">
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar__">
        <div className='container-fluid'>
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <Link to='/aboutus'>
        <Link to = '/home'>
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img src="/images/PRivate.png" style={{height:'60px', width:'180px', borderRadius:'20%'}}/>
      </a>
      </Link>
     </Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav_left">
        
        
        <li className='nav-item'><Link to='/aboutus'><li class="menu__item"><a class="menu__link" href="#">About Us</a></li></Link>
        </li>
        <li className='nav-item'><Link to='/contactus'><li class="menu__item"><a class="menu__link" href="#">Contact</a></li></Link>
        </li>
        <li className='nav-item'><Link to='/aboutme'><li class="menu__item"><a class="menu__link" href="#">Founder</a></li></Link>
        </li>
        <li className='nav-item'><Link to='/aboutme'><li class="menu__item"><a class="menu__link" href="#">Testimonials</a></li></Link>
        </li>
        <li className='nav-item'><Link to='/'><li class="menu__item"><a class="menu__link" href="#">Steve Jobs</a></li></Link>
        </li>
        
      </ul>

      
      
    </div>
    

    
    <div className="d-flex align-items-center">
       
      
      {userData ? userData && <div className="dropdown">
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          {userData && <img
            src={`http://localhost:5000/${userData.profilePhotoUrl}`}
            className="rounded-circle"
            height="80px !important"
            width="80px !important"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />}
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <Link to='/profile'><a className="dropdown-item" href="#">My profile</a></Link>
          </li>
          <li>
            <a className="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <Link to='/' ><a href='#'  className="dropdown-item">Applied History</a></Link>
          </li>
          <li>
            <Link to='/' ><a href="#"  className="dropdown-item">Add Testimonial</a></Link>
          </li>
          <li>
            <button className="dropdown-item btn" onClick={handleLogout}><span style={{color:'red'}}>Logout</span></button>
          </li>
        </ul>
      </div>:
      <div className="dropdown">
          <Link to='/loginsignup'>
                 <button href="#" class="btn btn-danger btn-rounded" tabIndex="-1" aria-disabled="true">Login / Signup</button>
          </Link>
      </div>
        }
    </div>
    </div>
</nav>
 </div>
  )
}

export default Navbar


{/*
// Applied History 

<li className="nav-item">
          {
          props.isLoggedIn? 
          props.isLoggedIn && <Link to='/'><li class="menu__item"><a class="menu__link" href="#">Applied History</a></li></Link>
          :
          <> 
          <Link to='/'><li class="menu__item"><a class="menu__link" href="#" data-mdb-toggle="modal" data-mdb-target="#staticBackdrop">Applied History</a></li></Link>
          

          
          <div
            className="modal fade"
            id="staticBackdrop"
            data-mdb-backdrop="static"
            data-mdb-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">OOOOPSSS!</h5>
                    <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body"><span>You can only access this feature if you are logged in !</span></div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Understood</button>
                  </div>
                </div>
              </div>
        </div>
        </>
        }
        </li>
*/}