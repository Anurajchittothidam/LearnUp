import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/userComponents/LoginPage/Login'
import Signup from '../components/userComponents/SignupPage/Signup'
import Otp from '../components/OTP/Otp'

function UserComponents() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/otp' element={<Otp data={'user'}/>} ></Route>
        <Route path='/user-forgot/otp' element={<Otp data={'user-forgot'}/>} ></Route>
    </Routes>
    </>
  )
}

export default UserComponents