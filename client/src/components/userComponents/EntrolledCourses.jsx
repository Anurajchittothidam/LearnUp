import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify';
import { getEntrolled } from '../../services/userApi'
import HorizontalCourseCard from './HorizontalCourseCard/HorizontalCourseCard';
import Navbar from './Navbar';

function EntrolledCourses() {
    const [isLoading,setIsLoading]=useState()
    const [enrolledCourse, setEnrolledCourse] = useState([]);
    const [search,setSearch]=useState('')

    useEffect(()=>{
        getEntrolled(search).then((res)=>{
            if(res.data.courses){
                console.log(res.data.courses)
                setEnrolledCourse(res.data.courses)
            }else{
                toast.error('course not found')
            }
        })
    },[search])
  return (
    <>
    <section>
    <Navbar/>
    <div className=" pl-9 md:pl-16 lg:pl-28  mb-10  flex justify-between ">
        <h3 className="basis-1/4 text-2xl md:text-2xl subpixel-antialiased   uppercase font-semibold tracking-wider mt-8  mb-4   ">
          My Courses
        </h3>
        <div className='basis-2/4 mt-8'>
        <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    id="default-search"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos..."
                  />
                  {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                </div>
        </div>
      </div>
     
       {/* <div className='pl-9 mb-10'>
        <h3 className="text-3xl sm:text-4xl  mt-8  mb-4 ml-2 sm:ml-5 ">My Enrollments</h3>
      </div> */}

      {isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
      ) : (
        <div className="mb-10">
          {enrolledCourse.length ? (
            <>
              {enrolledCourse &&
                enrolledCourse.map((courseDetails) => {
                  return (
                    <HorizontalCourseCard
                      key={courseDetails._id}
                      courseDetails={courseDetails}
                    />
                  );
                })}
            </> 
          ) : (
            <div className="flex justify-center flex-col items-center mb-10 ">
              <img src="/images/noCourse.svg" alt="" className="w-2/4 " />
              <p className="text-xl font-semibold" >No enrolled courses</p>
            </div>
          )}
        </div>
      )}
    <ToastContainer/>
    </section>
    </>
  )
}

export default EntrolledCourses