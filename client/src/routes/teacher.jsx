import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../pages/teacherSide/Login'
import Signup from '../pages/teacherSide/Signup'
import Otp from '../pages/teacherSide/Otp'
import Dashboard from '../components/teacherComponents/Dashboard'
import Profile from '../pages/teacherSide/Profile'
import PrivateRoute from '../util/PrivetRoutes'
import EditProfile from '../components/teacherComponents/EditProfile'
import AddCoursePage from '../pages/teacherSide/AddCoursePage'
import CoursesPage from '../pages/teacherSide/CoursesPage'
import EditCoursePage from '../pages/teacherSide/EditCoursePage'
import Questions from '../components/teacherComponents/Questions'
import ReplyQuestions from '../components/teacherComponents/ReplyQuestions'

function Teacher() {
  return (
    <Routes>
 
      <Route element={<PrivateRoute role={'teacher'} route={'/teachers/login'}/>}>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/editProfile' element={<EditProfile/>}></Route>
      <Route path='/courses' element={<CoursesPage/>}></Route>
      <Route path='/addCourse' element={<AddCoursePage/>}></Route>
      <Route path='/editCourse/:id' element={<EditCoursePage/>}></Route>
      <Route path='/questions' element={<Questions/>}></Route>
      <Route path='/questions/reply/:courseId' element={<ReplyQuestions/>}></Route>
      </Route>

      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup data={'teacher'}/>}></Route>
      <Route path='/otp' element={<Otp data={'teacher'}/>}></Route>
      <Route path='/forgot' element={<Otp data={'teacher-forgot'}/>}></Route>
    </Routes>
  )
}

export default Teacher