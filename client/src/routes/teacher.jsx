import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../pages/teacherSide/Login'
import Signup from '../pages/teacherSide/Signup'
import Otp from '../pages/teacherSide/Otp'
import Dashboard from '../components/teacherComponents/Dashboard'
import Profile from '../pages/teacherSide/Profile'
import PrivateRoute from '../util/PrivetRoutes'
import EditProfile from '../components/teacherComponents/EditProfile'

function Teacher() {
  return (
    <Routes>
 
      <Route element={<PrivateRoute role={'teacher'} route={'/teachers/login'}/>}>
      <Route path='/teachers/' element={<Dashboard/>}></Route>
      <Route path='/teachers/profile' element={<Profile/>}></Route>
      <Route path='/teachers/editProfile' element={<EditProfile/>}></Route>
      </Route>

      <Route path='/teachers/login' element={<Login/>}></Route>
      <Route path='/teachers/signup' element={<Signup data={'teacher'}/>}></Route>
      <Route path='/teachers/otp' element={<Otp data={'teacher'}/>}></Route>
      <Route path='/teachers/forgot' element={<Otp data={'teacher-forgot'}/>}></Route>
    </Routes>
  )
}

export default Teacher