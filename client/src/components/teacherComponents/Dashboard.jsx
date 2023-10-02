import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Sidebar from './teacherSideBar/Sidebar'
import Navbar from './teacherNav/Navbar'

function Dashboard() {
    
   
  return (
    <>
    
    <div>
 <Navbar/>
   <div class="flex overflow-hidden bg-white pt-16">
     <Sidebar/>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
            </div>
          </main>
      </div>
      </div>
   </div>
    </>
  )
}

export default Dashboard