import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from '../components/adminComponents/dashboard/Dashboard.jsx'
import Login from '../components/adminComponents/Login/Login.jsx'

function AdminComponents() {
  return (
    <Routes>
        <Route path='/admin' element={<Dashboard/>}></Route>
        <Route path='/admin/login' element={<Login/>}></Route>
    </Routes>
  )
}

export default AdminComponents