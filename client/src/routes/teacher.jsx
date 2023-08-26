import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../pages/teacherSide/Login'
import Signup from '../pages/teacherSide/Signup'
import Otp from '../pages/teacherSide/Otp'

function Teacher() {
  return (
    <Routes>
      <Route path='/teachers/login' element={<Login/>}></Route>
      <Route path='/teachers/signup' element={<Signup data={'teacher'}/>}></Route>
      <Route path='/teachers/otp' element={<Otp data={'teacher'}/>}></Route>
      <Route path='/teachers/forgot' element={<Otp data={'teacher-forgot'}/>}></Route>
    </Routes>
  )
}

export default Teacher