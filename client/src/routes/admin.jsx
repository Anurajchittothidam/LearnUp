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
import Reports from '../components/adminComponents/Reports/Reports.jsx'

function AdminComponents() {
  return (
    <Routes>
      <Route element={<PrivateRoute role={'admin'} route={'/admin/login'}/>}>
        <Route path='/' element={<AdminDashboard/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/teachers' element={<Teachers/>}></Route>
        <Route path='/teachers/add' element={<Signup data={'admin'}/>}></Route>
        <Route path='/teachers/otp' element={<Otp data={'admin'}/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/reports' element={<Reports/>}></Route>
      </Route>
       
        <Route path='/*' element={<Error/>}></Route>

        <Route path='/login' element={<AdminLogin/>}></Route>

    </Routes>
  )
}

export default AdminComponents