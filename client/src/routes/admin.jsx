import React from 'react'
import {Routes,Route} from 'react-router-dom'
import AdminDashboard from '../pages/adminSide/dashboard.jsx'
import AdminLogin from '../pages/adminSide/adminLogin.jsx'
import Users from '../pages/adminSide/Users.jsx'
import Teachers from '../pages/adminSide/Teachers.jsx'
import Error from '../pages/adminSide/Error.jsx'
import Categories from '../pages/adminSide/categories.jsx'
import Signup from '../components/SignUp/Signup.jsx'
import Otp from '../components/OTP/Otp'
import PrivateRoute from '../util/PrivetRoutes.jsx'

function AdminComponents() {
  return (
    <Routes>
      <Route element={<PrivateRoute role={'admin'} route={'/admin/login'}/>}>
        <Route path='/admin' element={<AdminDashboard/>}></Route>
        <Route path='admin/users' element={<Users/>}></Route>
        <Route path='admin/teachers' element={<Teachers/>}></Route>
        <Route path='admin/teachers/add' element={<Signup/>}></Route>
        <Route path='admin/teachers/otp' element={<Otp data={'admin'}/>}></Route>
        <Route path='/admin/categories' element={<Categories/>}></Route>
      </Route>
       
        <Route path='/admin/*' element={<Error/>}></Route>

        <Route path='admin/login' element={<AdminLogin/>}></Route>

    </Routes>
  )
}

export default AdminComponents