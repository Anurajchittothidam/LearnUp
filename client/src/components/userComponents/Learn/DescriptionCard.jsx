import React from 'react'
import { useSelector } from 'react-redux';



function DescriptionCard() {
  const courseDetails = useSelector((state) => state.course.value);
 
  return (
    <div className="course-info-wrap p-5">
              
    <div>
      <h3 className="text-2xl  mt-2 font-semibold mb-4 ">Author</h3>
      <blockquote className="rounded-lg bg-gray-100 p-8">
        <div className="flex items-center gap-4">
          <img
            alt="Man"
            // src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            src={courseDetails?.teacherInfo[0]?.picture}
            // src='https://cdn-icons-png.flaticon.com/512/145/145843.png?w=740&t=st=1688454207~exp=1688454807~hmac=52c75a7aea9463ddd346b6747be41c284e0d6e00b1ea5c27e31671d2a8955b07'
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              {courseDetails &&
                courseDetails?.teacherInfo[0]?.name}
            </p>
          </div>
        </div>

        <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-950  mx-4"  >
          {courseDetails && courseDetails?.teacherInfo[0]?.about}
        </p>
      </blockquote>
    </div>

   

    <div>
      <h3 className="text-2xl  mt-4 font-semibold mb-4 ">About</h3>
      <div className="border shadow-sm rounded-md p-3 ">
        <p className="text-slate-600 mt-4 ">
          {courseDetails && courseDetails?.courseInfo?.description}
        </p>
      </div>
    </div>
  </div> 
  )
}

export default DescriptionCard