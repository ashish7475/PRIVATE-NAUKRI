import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
  

  return (
    <div>
        {data && <h2>Total Applied Jobs : {data.appliedJobs.length}</h2>}
      {data && <h2>Applied : {data.applied.length}</h2>}
      {data && <h2>Interview : {data.interview.length}</h2>}
      {data && <h2>Placed : {data.placed.length}</h2>}
      {data && <h2>Rejected : {data.rejected.length}</h2>}
    </div>
  )
}

export default ApplyStats
