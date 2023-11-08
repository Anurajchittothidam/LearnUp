import React, { useState } from 'react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from './teacherNav/Navbar'
import Sidebar from './teacherSideBar/Sidebar'

function Reports() {
  const [reports,setReport]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    getCourseReport().then((res)=>{
      setReport(res.data.reports)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <>
    
    <Navbar />

    <Sidebar />
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
                        <h3 className="text-4xl text-black">No Reports Found</h3>
                        <img src="/images/noCourse.avif" alt="" />
                      </div>
                    </>
                  ) : (
                    reports.map((result) => (
                      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                        <div className="relative">
                          
                          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                            Teacher- {result?.teacherName}
                          </p>
                        </div>
                        <div className="flex mt-4">
                        <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                          {result?.reason}-Reported by {result?.user}
                        </h1>
                        <h2> </h2>
                        </div>
                      </div>
                    ))
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