import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AdminComponents from './routes/admin'
import UserComponents from './routes/user'
import Teacher from './routes/teacher'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import dotenv from 'dotenv'
// dotenv.config()

function App() {
  return (
    <>
    <Router>
<GoogleOAuthProvider clientId="772053784600-ita1acjc8oldc77hh2r0v5hndvj2kkbh.apps.googleusercontent.com">
    <Teacher/>
    <AdminComponents/>
    <UserComponents/>
    </GoogleOAuthProvider>
    </Router>
    </>
  )
}

export default App
