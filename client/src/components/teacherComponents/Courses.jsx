import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { setCourseDetails } from '../../redux/features/CourseRedux'
import Swal from 'sweetalert2'
import { courseList, listUnlist } from '../../services/teacherApi'
import Navbar from './teacherNav/Navbar'
import Sidebar from './teacherSideBar/Sidebar'

function Courses() {
    const [isLoading,setIsLoading]=useState(false)
    const [courseData,setData]=useState([])
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const id=useSelector((state)=>state.teacher.id)
    useEffect(()=>{
        setIsLoading(true)
        courseList(id).then((res)=>{
            if(res.data.status===false){
               //  toast.error(res.data.message)
                console.log(courseData)
            }else{
            // toast.success(res.data.message)
            setData(res.data.courses)
            }
        }).catch((err)=>{
            navigate('/teachers/login')
            toast.error(err.response.data.message)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[id])



    function unlistCourse(e) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to unlist!",
        icon: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes!",
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          handleUnlist(e,'unlist');
        }
      });
    }

   const handleUnlist=(courseId,action)=>{
      setIsLoading(true)
      listUnlist(id,courseId,action).then((res)=>{
         courseData.map((obj)=>{
            if(obj._id===courseId && obj.block===true){
               obj.block=false
            }else if(obj._id===courseId && obj.block===false){
               obj.block=true
            }
         })
         console.log(res.data)
      }).catch((err)=>{
         console.log(err)
      }).finally(()=>{
         setIsLoading(false)
      })
    }
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
          <div className="flex justify-end my-2"><button type="button" onClick={()=> navigate('/teachers/addCourse')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Add Course</button></div>
               
              {courseData?.length===0?
              (
                <>
                
                <h1>No Course Found</h1>
                
                </>
              ):(
                <>
                <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Name</th>
                  <th class="px-4 py-3">Category</th>
                  <th class="px-4 py-3">Students <br/> Entrolled</th>
                  <th class="px-4 py-3">Price</th>
                  <th class="px-4 py-3">Actions</th>
                </tr>
              </thead>
                {courseData.map((result)=>(
                    <tbody class="bg-white">
                      <tr class="text-gray-700">
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-sm">
                            <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                              <img class="object-cover w-full h-full rounded-full" src={result?.image} alt="" loading="lazy" />
                              <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                            </div>
                            <div>
                              <p class="font-semibold text-black">{result?.name}</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-ms font-semibold border">{result?.category}</td>
                        <td class="px-4 py-3 text-ms font-semibold border">{(result?.entrolled).length}</td>
                        <td class="px-4 py-3 text-ms font-semibold border">{result?.price}</td>
                        <td class="px-4 py-3 text-xs border">
                           <button onClick={()=>{navigate(`/teachers/editCourse/${result?._id}`)
                           dispatch(setCourseDetails(result))}
                        } className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Edit</button>
                           {result?.block===false ? (
                           <button onClick={()=>unlistCourse(result?._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mx-2">Unlist</button>
                           ):(
                              <button onClick={()=>handleUnlist(result?._id,'list')} className="bg-green-500 hover:bg-gree-700 text-white font-bold py-1 px-2 border border-green-500 rounded mx-2">List</button>
                           )}
                        </td>
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

export default Courses