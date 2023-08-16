import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AdminComponents from './routes/admin'
import UserComponents from './routes/user'

function App() {
  return (
    <>
    <Router>
    <AdminComponents/>
    <UserComponents/>
    </Router>
    </>
  )
}

export default App
