import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { getCart,removeFromCart } from '../../services/userApi'
import Navbar from './Navbar'

function Cart() {
    const [loading,setIsLoading]=useState(false)
    const [courseDetails,setCourse]=useState([])
    const navigate=useNavigate()
    let total=0
    

    useEffect(() => {
        setIsLoading(true)
        getCart().then((res)=>{
            if(res.data){
                setCourse(res.data.courses)
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    }, [total])

    const removeCart=(courseId)=>{
        setIsLoading(true)
        removeFromCart(courseId).then((res)=>{
            if(res.data.status===true){
                setCourse((courseDetails.filter((courses)=>courses.course._id!==courseId)))
                total=0
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    

  return (
    <section>
            <Navbar/>
          { loading ? 
               <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
               <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                 <i className="fas fa-circle-notch fa-spin fa-5x"></i>
               </span>
             </div>
            :
           <div className="lg:px-20 mt-5 mx-auto mb-14">
              <h3 className="text-3xl font-medium   mt-8  mb-4 ml-5  ">My Cart</h3>
              <div className='flex flex-col lg:flex-row  mt-8 '>
                <div className='w-full lg:w-8/12'>
                  <div className="flex flex-col justify-center shadow-sm sm:mx-10 m-3">
                    {courseDetails.length===0?(
                      <h4>No course added</h4>
                    ):(
                      courseDetails.map((courses)=>(
                        <a href="#" className="flex w-full flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                          <img className="object-cover m-8 lg:m-4  ml-4 rounded h-40 md:96 md:h-auto w-100 md:w-48" 
                          src={courses?.course?.image}
                           alt />
                          <div className="flex flex-col w-full ml-6 sm:ml-0 justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {courses?.course?.name}  
                    
                              </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {courses?.course?.course?.length + " "} 
                                Chapter</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">₹
                              {" "+courses?.course?.price}</p>
                              <a href="" hidden>{total+=courses?.course?.price}</a>
                          </div>
                          <div onClick={()=>removeCart(courses?.course?._id)} className="curson-pointer btn bg-red-500 text-white hover:bg-red-600 text-center rounded px-2 py-2 mr-4">
                          <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                          </div>
                        </a>
                        ))
                    )}
                    
                    
                  </div>
    
                     
                </div>
                <div className='w-full lg:w-4/12 '>
                  <div className='flex lg:block justify-center mt-10 lg:mt-0 m-3 ' >
                    <div className=" p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order details</h5>
                      </a>
                      <div className='flex justify-between mt-5'>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">₹ 
                        {total}
                        </p>
                      </div>
    
                      <div className='flex justify-between mt-3'>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Discount</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">₹ 0</p>
                      </div>
    
                      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    
                      <div className='flex justify-between mt-7'>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">TOTAL (INR)</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">₹ 
                        {total}
                        </p>
                      </div>
    
                      <div className='flex justify-between mt-2'>
                        <p className="mb-3 text-xs text-gray-700 dark:text-gray-400">NEED HELP?</p>
                      </div>
    
                      <div className='mt-5 '>
                        <p className='text-sm text-center my-5'>30-Day Money-Back Guarantee</p>
                      </div>
                      <div className="mt-5">
                        <Link to={`/course-payment`}  state={{message: "cart" } }>
                        <button className='text-center block ms-20 visible py-4 px-8 mb-2 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block' >
                        { total===0 ? "Enroll Now" :  "Pay Securely"}
                      </button>
                        </Link>
                      </div>
                    </div>
                  </div>
    
                 
    
                </div>
              </div>
            </div>
    }
    <ToastContainer/>
        </section>
  )
}

export default Cart