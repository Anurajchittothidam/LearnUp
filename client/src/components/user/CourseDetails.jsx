import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourse, getReviews } from "../../services/userApi";
import BuyNowCard from "./BuynowCard/BynowCard";
import {Rating} from '@material-tailwind/react'
import Navbar from "./Navbar";
import SyllabusDropdown from "./SyllabusDropDown/SyllabusDropDown";

function CourseDetails() {
  const [courseDetails, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fullReview,setFullReview]=useState([])
  const params = useParams();
  useEffect(() => {
    const courseId = params.id;
    setIsLoading(true);
    getCourse(courseId)
      .then((res) => {
        if (res.data.course) {
          res.data.courseDetails.course = res.data.courseDetails.course.map(
            (obj) => {
              return { ...obj, open: false };
            }
          );
        }
        setCourse(res.data.courseDetails);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

      getReviews(courseId).then((res)=>{
        setFullReview(...res.data.reviews)
      }).catch((err)=>{
        console.log(err)
      })
  }, []);

  const toggleDropdown = (toggleindex) => {
    let course = courseDetails.course.map((course, courseIndex) => {
      if (toggleindex === courseIndex) {
        course.open = !course.open;
      } else {
        course.open = false;
      }

      return course;
    });

    setCourse({ ...courseDetails, course });
  };

  return (
    <>
      <body class="antialiased min-h-screen">
        <Navbar />
        {isLoading ? (
          <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
              <i className="fas fa-circle-notch fa-spin fa-5x"></i>
            </span>
          </div>
        ) : (
          <div className="p-2 lg:p-20 mx-auto">
            <div className="flex flex-col-reverse sm:flex-row xl:px-20">
              <div className="w-full lg:w-7/12 ">
                <div className="hidden sm:block xl:ml-1 mb-8">
                  <h1 className="text-3xl font-semibold mb-4">
                    {courseDetails.name}
                  </h1>
                  <p className="mb-3 mr-6">{courseDetails.description}</p>
                  <h3 className="text-theme-color text-2xl font-semibold mb-3">
                    Syllabus
                  </h3>
                </div>

                <h3 className="text-xl text-theme-color mt-8 font-semibold mb-4 block sm:hidden ">
                  Syllabus
                </h3>

                <div className="App">
                  <div className="syllabus syllabus-wrap rounded-lg">
                   
                      {courseDetails.course && courseDetails.course.map((course, index) => (
                                          
                                          <SyllabusDropdown course={course} index={index} key={index}
                                           toggleDropdown={toggleDropdown} 
                                           />
                                      ))}
                  </div>
                </div>

                {/* //author section */}
                <div>
                  <h3 className="text-2xl  mt-8 font-semibold mb-4 ">Author</h3>
                  <blockquote className="rounded-lg bg-gray-100 p-8">
                    <div className="flex items-center gap-4">
                      <img
                        alt="Man"
                        src={courseDetails?.teacher?.picture}
                        className="h-16 w-16 rounded-full object-cover"
                      />

                      <div>
                        <p className="mt-1 text-lg font-medium text-gray-700">
                          {courseDetails?.teacher?.name}
                        </p>
                      </div>
                    </div>

                    <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                      {courseDetails.teacher?.about}
                    </p>
                  </blockquote>
                </div>
                <div className="block p-2 mt-3 mb-3">
                  <h1 className="text-3xl font-semibold mb-4">
                    Reviews
                  </h1>
                  {fullReview?.reviews&&(
                  fullReview.reviews.map((review)=>(
                    <div>
                  <h4 className="font-medium mb-1">{review?.userInfo}</h4>
                  <p className="mb-1">{review.text}</p>
                  <Rating  className='m-4 text-yellow-400' value={review?.rating} readonly/>
                  </div>
                  )))}
                </div>
                
              </div>

              <div className="w-full lg:w-5/12 flex-column  flex  flex-col  items-center sm:items-start ml-0 sm:ml-10 sm:h-screen top-0 sm:sticky ">
             
                {courseDetails.course && (
                <BuyNowCard courseDetails={courseDetails} 
                courseDescription />
              )}
                
              </div>
            </div>
          </div>
        )}

       
      </body>
      
    </>
  );
}

export default CourseDetails;
