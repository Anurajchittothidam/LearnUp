import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import Sidebar from './teacherSideBar/Sidebar'
import Navbar from './teacherNav/Navbar'
import { MdGroup } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Line,Doughnut } from "react-chartjs-2";
import { getTeacherDashboard } from '../../services/teacherApi'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

function Dashboard() {
  const [dashboardDetails,setDetails]=useState('')
    const location=useLocation()
    useEffect(()=>{
      if(location.state?.message){
        toast.error(location.state?.message)
      }
      getTeacherDashboard().then((res)=>{
        setDetails(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

     // chart js
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
  );

    const lineChartData={
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
          {
              label: 'Revenue based on month',
              data: dashboardDetails?.revanueDetails,
              backgroundColor: 'rgb(81,118,224)',
              borderColor: 'rgb(81,118,224)',
              borderWidth: 1,
          },
      ],
    }
    
    const PieChartData={
      labels:['Total Students','Orders'],
      datasets:[
        {
          label:'',
          data:[dashboardDetails?.students,dashboardDetails?.entrolledStudents],
          backgroundColor: ["rgb(54,185,204)", "rgb(28,200,138)"],
          borderWidth:1,
        }
      ]
    }
   
  return (
    <>
    
    <div>
 <Navbar/>
   <div class="flex overflow-hidden bg-white pt-16">
     <Sidebar/>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-medium mb-2">Dashboard</h1>
          </div>

        </div>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">


          <div className="flex items-center p-8 bg-white  rounded-lg shadow-lg ">
          <div className={`${"text-purple-600 bg-purple-100"} inline-flex flex-shrink-0 items-center justify-center h-16 w-16  rounded-full mr-6`}>
              {<MdGroup/>}
          </div>
          <div>
              <span className="block text-2xl font-bold">{dashboardDetails?.students}</span>
              <span className="block text-gray-500">{'Students'}</span>
          </div>
          </div>

          <div className="flex items-center p-8 bg-white  rounded-lg shadow-lg ">
          <div className={`${"text-blue-600 bg-blue-100"} inline-flex flex-shrink-0 items-center justify-center h-16 w-16  rounded-full mr-6`}>
              {<GiBookshelf />}
          </div>
          <div>
              <span className="block text-2xl font-bold">{dashboardDetails?.courses}</span>
              <span className="block text-gray-500">{'Courses'}</span>
          </div>
          </div>


          <div className="flex items-center p-8 bg-white  rounded-lg shadow-lg ">
          <div className={`${"text-green-600 bg-green-100"} inline-flex flex-shrink-0 items-center justify-center h-16 w-16  rounded-full mr-6`}>
              {<FaChalkboardTeacher />}
          </div>
          <div>
              <span className="block text-2xl font-bold">{dashboardDetails?.entrolledStudents}</span>
              <span className="block text-gray-500">{'Entrolled'}</span>
          </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-2 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100"></div>
            <div className="p-4 flex-grow">
              <Line data={lineChartData} />
            </div>
          </div>
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100">Orders</div>
            <div className="p-4 flex-grow">
              <Doughnut data={PieChartData} />
            </div>
          </div>
        </section>
            </div>
          </main>
      </div>
      </div>
      <ToastContainer/>
   </div>
    </>
  )
}

export default Dashboard