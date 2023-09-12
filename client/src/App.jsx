import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AdminComponents from './routes/admin'
import UserComponents from './routes/user'
import Teacher from './routes/teacher'
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID
  return (
    <>
    <Router>
<GoogleOAuthProvider clientId={clientId}>
    <Teacher/>
    <AdminComponents/>
    <UserComponents/>
    </GoogleOAuthProvider>
    </Router>
    </>
  )
}

export default App
