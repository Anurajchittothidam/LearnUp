import React from 'react';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCourseDetails } from '../../../redux/features/CourseRedux';


function HorizontalCourseCard({ courseDetails }) {  
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    // console.log(courseDetails)
    const handleClick=()=>{
        if(courseDetails?.courseInfo){
            const course = courseDetails?.courseInfo?.course.map(obj => {
                return { ...obj, open: false };
            });
            console.log(course)
            dispatch(setCourseDetails({ ...courseDetails,courseInfo:{...courseDetails.courseInfo}, course }))
            navigate(`/course/learn/${courseDetails.courseInfo?._id}`)
        }
    }
    return (
        <div className='mx-5 lg:mx-20 mb-10'>

           {courseDetails?.courseInfo &&
           ( <div onClick={()=>handleClick()} className="flex justify-center mt-4 sm:mx-10 m-3">
                <div className="flex p-4 w-full max-w-screen-lg hover:bg-violet-50 flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="rounded-md mt-4 sm:mt-0 w-80 h-40 md:w-56 md:h-32 object-cover" src={courseDetails?.courseInfo?.image}  />
                    <div className="basis-3/4 flex flex-col ml-0 sm:ml-3 justify-between mt-2 sm:0 p-4 leading-normal">
                        <h5 className="mb-2 text-xl  font-bold tracking-tight text-gray-900 dark:text-white">{courseDetails?.courseInfo?.name}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{courseDetails?.courseInfo?.course?.length} lessons</p>
                    </div>
                    {courseDetails?.courseInfo?.isFree?
                    <div className='btn bg-green-200 rounded px-2'><span className=''>Free</span></div>:
                    <div className='btn bg-red-200 rounded px-2'><span>Paid</span></div>}
                </div>
            </div>)}
        </div>
            
    )
}

export default HorizontalCourseCard