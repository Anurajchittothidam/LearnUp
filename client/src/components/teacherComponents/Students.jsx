import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import Navbar from './teacherNav/Navbar'
import Sidebar from './teacherSideBar/Sidebar'
import { getAllStudents } from '../../services/teacherApi'

function Students() {
    const [isLoading,setIsLoading]=useState(false)
    const [userData,setData]=useState([])
    const navigate=useNavigate()
    const {courseId}=useParams()

    useEffect(()=>{
        setIsLoading(true)
        getAllStudents(courseId).then((res)=>{
            if(res.data.users){
                console.log(res.data.users)
               //  toast.error(res.data.message)
                setData(res.data.users)
            }else{
            // toast.success(res.data.message)
                console.log(res.data)
            }
        }).catch((err)=>{
            toast.error(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[courseId])



   
  return (
    <>
    {isLoading?(
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
        </div>
    ):(
    <div>
  <Navbar/>
   <div class="flex overflow-hidden bg-white pt-16">
      <Sidebar/>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
        <section class="container mx-auto p-6 font-mono">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
               
              {userData?.length===0?
              (
                <>
                
                <h1>No Students Entrolled</h1>
                
                </>
              ):(
                <>
                <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Name</th>
                  <th class="px-4 py-3">Email</th>
                  {/* <th class="px-4 py-3">Price</th>
                  <th class="px-4 py-3">Actions</th> */}
                </tr>
              </thead>
                {userData.map((result)=>(
                    <tbody class="bg-white">
                      <tr class="text-gray-700">
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-sm">
                            <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                              <img class="object-cover w-full h-full rounded-full" src='https://lh3.googleusercontent.com/a/AAcHTtf72DF4pHnyr2ezjRenA6_cGfVoPKgu0WbR7H_CEgx_=s96-c' alt="" loading="lazy" />
                              <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                            </div>
                            <div>
                              <p class="font-semibold text-black">{result?.user?.name}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">{result?.user?.email}</td>
                        {/* <td class="px-4 py-3 text-ms font-semibold border">{(result?.entrolled).length}</td>
                        <td class="px-4 py-3 text-ms font-semibold border">{result?.price}</td> */}
                        
                      </tr>
                    </tbody>
                    ))}
                    </table>
                    </>
              )}
              
          </div>
        </div>
      </section>
      </div>
      </main>
      </div>
      </div>
      </div>
    )}
    <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
    <ToastContainer/>
    </>
  )
}

export default Students