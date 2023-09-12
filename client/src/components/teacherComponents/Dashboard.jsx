import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Dashboard() {
    const navigate=useNavigate()
    function logout(){
        localStorage.removeItem('teacherJwtToken')
        navigate('/teachers/login')
    }
   
  return (
    <>
    <button onClick={logout}>logout</button>
    <button onClick={()=>navigate('/teachers/profile')}>profile</button>
    </>
  )
}

export default Dashboard