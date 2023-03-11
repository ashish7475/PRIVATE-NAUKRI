import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './stats.css'

ChartJS.register(ArcElement, Tooltip, Legend);


const ApplyStats = () => {
    const [data, setData] = useState(null)
  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        axios.get('http://localhost:5000/getappliedstats',{
        headers:{'x-access-token':token}
      }).then(res=>{
        setData(res.data)
      })
      }
      
  },[])
  console.log(data)
  
const data1 = {
  labels: ['Applied', 'Interview', 'Placed', 'Rejected'],
  datasets: [
    {
      label: '# of Jobs',
      data: [data && data.applied.length, data && data.interview.length,data && data.placed.length,data && data.rejected.length],
      backgroundColor: [
        
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',

      ],
      borderColor: [

        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

const data2 = {
  labels: ['Amazon', 'Google', 'Apple', 'Netflix'],
  datasets: [
    {
      label: '# of Jobs',
      data: [data && data.amazon.length, data && data.google.length,data && data.apple.length,data && data.netflix.length],
      backgroundColor: [
        
        'rgba(54, 22, 235, 0.2)',
        'rgb(204, 218, 70,0.6)',
        'rgb(254, 152, 1,0.4)',
        'rgb(40, 42, 58,0.4)',

      ],
      borderColor: [

        'rgba(54, 22, 235, 1)',
        'rgb(204, 218, 70)',
        'rgb(254, 152, 1)',
        'rgb(40, 42, 58)',
      ],
      borderWidth: 1,
    },
  ],
};

const data3 = {
  labels: ['Full Time','Internships'],
  datasets: [
    {
      label: '# of Jobs',
      data: [data && data.fulltime.length, data && data.internship.length],
      backgroundColor: [
        
        'rgb(225, 238, 221,0.4)',
        'rgb(255, 123, 84,0.3)',

      ],
      borderColor: [

        'rgb(70, 78, 46)',
        'rgb(255, 123, 84)',
      ],
      borderWidth: 1,
    },
  ],
};

                            

  return (
    <>
    <Navbar/>
    <div className='pie__outer'>
      <h2 className='stats__heading'>Applied Jobs Statstics</h2>
      <div className='pie__container row'>
        <div className='pie__inner col-lg-4 col-md-6 col-sm-6'>
          <h4 className='stats__heading'><span>Jobs by Status</span></h4>
          <Pie data={data1} />
        </div>
        <div className='pie__inner col-lg-4 col-md-6 col-sm-6'>
          <h4 className='stats__heading'><span>Jobs by Company</span></h4>
          <Pie data={data2} />
       </div>
       <div className='pie__inner col-lg-4 col-md-6 col-sm-6'>
          <h4 className='stats__heading'><span>Jobs by Type</span></h4>
          <Pie data={data3} />
       </div>
       
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ApplyStats






