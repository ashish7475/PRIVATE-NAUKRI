import React, { useEffect } from 'react'
import Footer from './components/Footer'
import Main from './components/Main'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FilterMenu from './components/FilterMenu';
import axios from 'axios';
import HomeIntro from './components/HomeIntro';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {
  const {userData} = React.useContext(UserContext)
  const [search,setSearch] =React.useState('')
  const [data,setData] = React.useState([])
  const [currentPageListing,setCurrentPageListings] = React.useState([])
  const [currentPage,setCurrentPage] = React.useState(1)
  const [totalRecords,setTotalRecords] = React.useState(0)
  const [filters,setFilters] = React.useState({
    type:'',
    companies:[],
    countries:[]
  })
  const navigate = useNavigate()
   const ErrorFallback = ({ error }) => {
    console.log(error)
    return (
      <div>
        <h2>Something went wrong:</h2>
        <p>{error.message}</p>
      </div>
    );
  };
  

  

  const handleChange=(e)=>{
    setSearch(e.target.value)
  }

  useEffect(()=>{
    
    axios.get('https://ggz.onrender.com/job-listings',{
      params:{
        q:search,
        page:currentPage,
        filters:{...filters}
      }
    }).then((res,err)=>{
     try {
       setData(res.data.data)
       setCurrentPageListings(res.data.data)
       setTotalRecords(res.data.totalListings)
     } catch (error) {
       console.log(error)
     }

   })
   },[])
   console.log(filters)

   useEffect(()=>{

    axios.get('https://ggz.onrender.com/job-listings',{
      params:{
        q:search,
        page:currentPage,
        filters,
      }
    }).then((res,err)=>{
     try {
      
       setData(res.data.data)
       setCurrentPageListings(res.data.data)
       setTotalRecords(res.data.totalListings)
       setCurrentPage(1)          
       //! if we dont do this if records are less than current pages length then screeen would be empty while their still be pages
     } catch (error) {
       console.log(error)
     }
   })
   },[search,filters])

   
   useEffect(()=>{

    axios.get('https://ggz.onrender.com/job-listings',{
      params:{
        q:search,
        page:currentPage,
        filters,
      }
    }).then((res,err)=>{
     try {
      
       setData(res.data.data)
       setCurrentPageListings(res.data.data)
       setTotalRecords(res.data.totalListings)         
       //! if we dont do this if records are less than current pages length then screeen would be empty while their still be pages
     } catch (error) {
       console.log(error)
     }
   })
   },[currentPage])

  


  return (
    <div className='OUTERMOST__DIV'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar
       data={data}
       />
      <HomeIntro/>
      <FilterMenu 
      from={'App'}
      totalRecords={totalRecords}
      data={data} 
      setCurrentPage={setCurrentPage} 
      currentPage={currentPage} 
      setCurrentPageListings={setCurrentPageListings}
      currentPageListings={currentPageListing}
      filters={filters}
      setFilters = {setFilters}
      search={search}
      handleSearch={handleChange}
      />

      <Main 
      data={data} 
      search={search} 
      style={{paddingBottom:'40px'}}
      currentPage={currentPage}
      currentPageListings={currentPageListing}
      setRecords={setCurrentPageListings}
      />

      <Footer/>
      </ErrorBoundary>
      

    </div>
  )
}

export default App
