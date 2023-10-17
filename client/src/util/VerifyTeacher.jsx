import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { verifyTeacher } from '../services/teacherApi'

function VerifyTeacher() {
  const [auth,setAuth]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    setIsLoading(true)
    verifyTeacher().then((res)=>{
      console.log(res)
      setAuth(true)
    }).catch((err)=>{
      console.log(err)
      setAuth(false)
    }).finally(()=>{
      setIsLoading(false)
    })
  },[])
  if(auth===null) return
  return (
   <>
   {isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
        </div>
      ) : (
        auth===true?<Outlet/>:<Navigate to="/teachers/" state={{message:'Your account is not verified yet'}}/>
      )}
    <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
   </>
  )
}

export default VerifyTeacher