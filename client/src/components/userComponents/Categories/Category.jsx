import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { allCourses } from '../../../services/userApi';
import Navbar from '../Navbar';

function Category() {
    const [open, setOpen] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);

    const [courses,setCourses]=useState([])
    const [isLoading,setIsLoading]=useState(false)
const navigate=useNavigate()
    useEffect(()=>{
        setIsLoading(true)
        allCourses().then((res)=>{
          if(res.data.block==='true'){

          }else{
            setCourses(res.data.courses)
          }
        }).catch((err)=>{
            toast.error(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])


   
  return (
    <>
<div className="min-h-screen">
<Navbar/>
<div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center py-20">
  <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
    {courses.map((result)=>(
        <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      {/* <h3 className="mb-3 text-xl font-bold text-indigo-600"></h3> */}
      <div className="relative">
        <img onClick={()=>navigate(`/course-details/${result._id}`)} style={{width:'330px',height:'140px',objectFit:'cover'}} className="w-full rounded-xl" src={result?.image} alt="Colors" />
        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">$ {result?.price}</p>
      </div>
      <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{result?.name}</h1>
      <div className="my-4">
        <div className="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>{result.duration}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <p>{(result?.course).length} Chapters</p>
        </div>
        <div className="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </span>
          <p>{result.language}</p>
        </div>
        <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">{result.price===0?'Entroll Now ' : 'Purchase Now'}</button>
      </div>
    </div>
    ))}
  
  </div>
</div>
  </div>

<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
</>
  )
}

export default Category