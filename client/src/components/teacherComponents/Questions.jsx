import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { courseList } from '../../services/teacherApi'
import Navbar from './teacherNav/Navbar'
import Sidebar from './teacherSideBar/Sidebar'

function Questions() {
    const [isLoading,setIsLoading]=useState(false)
    const [courses,setCourses]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        courseList().then((res)=>{
            setCourses(res.data.courses)
        })
    },[])
  return (
    <div>
        <Navbar />
        <div class="flex overflow-hidden bg-white pt-16">
          <Sidebar />
          <div
            id="main-content"
            class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            {isLoading ? (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                  <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
              </div>
            ) : (
              <main>
                <div class="pt-6 px-4">
                <div className="h-64 flex-initial mt-20 md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                  {courses.length === 0 ? (
                    <>
                      <div className=" bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg">
                        <h3 className="text-4xl text-black">No course found</h3>
                        <img src="/images/noCourse.avif" alt="" />
                      </div>
                    </>
                  ) : (
                    courses.map((result) => (
                      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                        {/* <h3 className="mb-3 text-xl font-bold text-indigo-600"></h3> */}
                        <div className="relative">
                          <img
                            onClick={() =>
                              navigate(`/teachers/questions/reply/${result?._id}`)
                            }
                            style={{
                              width: "330px",
                              height: "140px",
                              objectFit: "cover",
                            }}
                            className="w-full rounded-xl"
                            src={result?.image}
                            alt="Colors"
                          />
                          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                            $ {result?.price}
                          </p>
                        </div>
                        <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                          {result?.name}
                        </h1>
                        <div className="my-4">
                          <div className="flex space-x-1 items-center">
                            <button onClick={()=>navigate(`/teachers/questions/reply/${result?._id}`)} className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">View Questions</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                </div>
                </main>
            )}
            </div>
        </div>
    </div>
  )
}

export default Questions