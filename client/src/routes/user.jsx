import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/user/LoginPage/Login'
import Signup from '../components/user/SignupPage/Signup'
import Otp from '../components/OTP/Otp'
import Landing from '../components/user/Landing/Landing'
import Category from '../components/user/Categories/Category'
import CourseDetails from '../components/user/CourseDetails'
import PrivateRoute from '../util/PrivetRoutes'
import CheckOut from '../components/user/CheckOut'
import OrderSuccess from '../components/user/OrderSuccess'
import OrderFailed from '../components/user/OrderFailed'
import EntrolledCourses from '../components/user/EntrolledCourses'
import Learn from '../components/user/Learn/Learn'
import Profile from '../components/user/Profile'
import EditProfile from '../components/user/EditProfile'
import Cart from '../components/user/Cart'

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
        <Route path='/course-payment' element={<CheckOut/>}></Route>
        <Route path='/order-success' element={<OrderSuccess/>}></Route>
        <Route path='/order-failed' element={<OrderFailed/>}></Route>
        <Route path='/my-entrollments' element={<EntrolledCourses/>}></Route>
        <Route path='/course/learn/:courseId' element={<Learn/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/editProfile' element={<EditProfile/>}></Route>
        <Route path='/my-cart' element={<Cart/>}></Route>
        </Route>
    </Routes>

    </>
  )
}

export default UserComponents