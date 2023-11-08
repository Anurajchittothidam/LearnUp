import React from 'react'
import { Link } from 'react-router-dom'

function CourseCard(  {path ,  course }) {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={`${path}/${course._id}`}>
        <img className="rounded-t-lg w-full  object-cover " style={{ height: "174px" }} src={import.meta.env.VITE_SERVER_URL+course?.image?.path}  />
        <div className="p-4 ">
            <h5 className="mb-2 text-lg font-bold tracking-tigsht text-theme-color dark:text-white">{course.name}</h5>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{course.tutor.firstName&& course.tutor?.firstName + course?.tutor?.lastName}{""}</p>
            <div> 

                <h5 className='text-base font-semibold mt-3'>₹ {course?.isFree ? "Free" : course?.price }</h5>
            </div>
        </div>
    </Link>
</div>
  )
}

export default CourseCard