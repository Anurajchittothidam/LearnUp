import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/userComponents/LoginPage/Login'
import Signup from '../components/userComponents/SignupPage/Signup'
import Otp from '../components/OTP/Otp'
import Landing from '../components/userComponents/Landing/Landing'
import Category from '../components/userComponents/Categories/Category'
import CourseDetails from '../components/userComponents/CourseDetails'
import PrivateRoute from '../util/PrivetRoutes'
import CheckOut from '../components/userComponents/CheckOut'
import OrderSuccess from '../components/userComponents/OrderSuccess'
import OrderFailed from '../components/userComponents/OrderFailed'
import EntrolledCourses from '../components/userComponents/EntrolledCourses'
import Learn from '../components/userComponents/Learn/Learn'
import Profile from '../components/userComponents/Profile'
import EditProfile from '../components/userComponents/EditProfile'

function UserComponents() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/otp' element={<Otp data={'user'}/>} ></Route>
        <Route path='/user-forgot/otp' element={<Otp data={'user-forgot'}/>} ></Route>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/category' element={<Category/>}></Route>
        <Route path='/course-details/:id' element={<CourseDetails/>}></Route>

        <Route element={<PrivateRoute route={'/login'} role={'user'}/>}>
        <Route path='/course-payment/:id' element={<CheckOut/>}></Route>
        <Route path='/order-success' element={<OrderSuccess/>}></Route>
        <Route path='/order-failed' element={<OrderFailed/>}></Route>
        <Route path='/my-entrollments' element={<EntrolledCourses/>}></Route>
        <Route path='/course/learn/:courseId' element={<Learn/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/editProfile' element={<EditProfile/>}></Route>
        </Route>
    </Routes>

    </>
  )
}

export default UserComponents