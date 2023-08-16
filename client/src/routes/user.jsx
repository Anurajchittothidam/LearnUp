import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/userComponents/LoginPage/Login'
import Signup from '../components/userComponents/SignupPage/Signup'
import Otp from '../components/userComponents/OtpPage/Otp'

function UserComponents() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/otp' element={<Otp/>} ></Route>
    </Routes>
    </>
  )
}

export default UserComponents