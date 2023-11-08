import React, { useState } from 'react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { getTeacherReport } from '../../../services/adminApi'
import NavBar from '../navBar/navBar'
import SideBar from '../sideBar/SideBar'

function Reports() {
  const [reports,setTeacherReport]=useState([])
  const [courseReport,setCourseReport]=useState([])
  const [studentReport,setStudentReport]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    getTeacherReport().then((res)=>{
      setTeacherReport(res.data.teacherReports)
      setCourseReport(res.data.courseReports)
      setStudentReport(res.data.studentReports)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <>
    
    <NavBar />

    <SideBar />
    <div
      id="main-content"
      className="h-full  bg-gray-50 relative overflow-y-auto lg:ml-64"
    >
     
          {isLoading ? (
            <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
              <i className="fas fa-circle-notch fa-spin fa-5x"></i>
            </span>
            </div>
          ) : (
            <>

             <main>
              <div className="pt-20 px-5 ">
              <div className="bg-gray-100">
                    <div className="w-full text-white bg-main-color">
                      <div className="container mx-auto my-5 p-5">
               

                 <div className="flex-initial mt-10 md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                  {reports.length === 0 ? (
                    <>
                      <div className=" bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg">
                      <div className="text-center">
                          <h3 className='text-black text-4xl mb-2 underline decoration-sky-500 font-medium'>Teacher Reports </h3>
                        </div>
                        <h3 className="text-4xl text-black text-center">No Reports Found</h3>
                        <img src="/images/noCourse.avif" alt="" />
                      </div>
                    </>
                  ) : (
                      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                        <div className="text-center">
                          <h3 className='text-black text-4xl mb-2 underline decoration-sky-500 font-medium'>Teacher Reports </h3>
                        </div>
                        {reports.map((result,index) => (<>
                        <div className="relative">
                          <p className="absolute flex w-full top-0 text-gray-800 font-semibold py-1 px-3 ">
                          <span className='text-black text-2xl font-semibold'>{index+1}.</span>
                            <span className='text-2xl '>Name  -</span> <span className='basis-4/6 text-2xl underline decoration-pink-500'>{result?.teacherName}</span>
                          </p>
                        </div>
                        <div className="flex flex-col mt-5">
                        <h1 className="mt-5 text-gray-800 text-2xl text-end cursor-pointer">
                         Reason - {result?.reason}
                        </h1>
                        <h2 className='text-black text-end'>Reported by -{result?.user}</h2>
                        </div>
                    </>))}
                      </div>
                  )}

{studentReport.length === 0 ? (
                    <>
                      <div className=" bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg">
                        <div className="text-center">
                          <h3 className='text-black text-4xl mb-2 underline decoration-sky-500 font-medium'>Student Reports </h3>
                        </div>
                        <h3 className="text-4xl text-black text-center">No Reports Found</h3>
                        <img src="/images/noCourse.avif" alt="" />
                      </div>
                    </>
                  ) : (
                      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                        <div className="text-center">
                          <h3 className='text-black text-4xl mb-2 underline decoration-sky-500 font-medium'>Student Reports </h3>
                        </div>
                        {studentReport.map((result,index) => (<>
                        <div className="relative">
                          <p className="absolute flex w-full top-0 text-gray-800 font-semibold py-1 px-3 ">
                          <span className='text-black text-2xl font-semibold '>{index+1}.</span>
                            <span className='text-2xl '>Name  -</span> <span className='basis-3/6 text-2xl underline decoration-pink-500'>{result?.studentName}</span>
                          </p>
                        </div>
                        <div className="flex flex-col mt-5">
                        <h1 className="mt-5 text-gray-800 text-2xl text-end cursor-pointer">
                         Reason - {result?.reason}
                        </h1>
                        <h2 className='text-black text-end'>Reported by -{result?.user}</h2>
                        </div></>))}
                      </div>
                  )}

{courseReport.length === 0 ? (
                    <>
                      <div className=" bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg">
                      <div className="text-center">
                          <h3 className='text-black text-4xl mb-2 underline decoration-sky-500 font-medium'>Course Reports </h3>
                        </div>
                        <h3 className="text-4xl text-black text-center">No Reports Found</h3>
                        <img src="/images/noCourse.avif" alt="" />
                      </div>
                    </>
                  ) : (
                      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                        <div className="text-center">
                          <h3 className='text-black text-4xl mb-2 underline decoration-sky-500 font-medium'>Course Reports </h3>
                        </div>
                        {courseReport.map((result,index) => (<>
                        <div className="relative">
                          <p className="absolute flex w-full top-0 text-gray-800 font-semibold py-1 px-3 ">
                          <span className='text-black text-2xl font-semibold '>{index+1}.</span>
                            <span className='text-2xl '>Name  -</span> <span className='basis-4/6 text-2xl underline decoration-pink-500'>{result?.courseName}</span>
                          </p>
                        </div>
                        <div className="flex flex-col mt-5">
                        <h1 className="mt-5 text-gray-800 text-2xl text-end cursor-pointer">
                         Reason - {result?.reason}
                        </h1>
                        <h2 className='text-black text-end'>Reported by -{result?.user}</h2>
                        </div>
                    </>))}
                      </div>
                  )}
                  </div>             
            </div>
            </div>
            </div>
              </div>

            </main>

            </>
          )}
       
      <ToastContainer/>
    </div>
    <link
  rel="stylesheet"
  href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
/>
  </>
  )
}

export default Reports