import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast,ToastContainer } from 'react-toastify';
import { getEntrolled } from '../../services/userApi'
import HorizontalCourseCard from './HorizontalCourseCard/HorizontalCourseCard';
import Navbar from './Navbar';

function EntrolledCourses() {
    const [isLoading,setIsLoading]=useState()
    const [enrolledCourse, setEnrolledCourse] = useState([]);

    useEffect(()=>{
        getEntrolled().then((res)=>{
            if(res.data.courses){
                console.log(res.data.courses)
                setEnrolledCourse(res.data.courses)
            }else{
                toast.error('course not found')
            }
        })
    },[])
  return (
    <>
    <section>
    <Navbar/>
    <div className=" pl-9 md:pl-16 lg:pl-28  mb-10   ">
        <h3 className="text-2xl md:text-2xl subpixel-antialiased   uppercase font-semibold tracking-wider mt-8  mb-4   ">
          My Courses
        </h3>
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