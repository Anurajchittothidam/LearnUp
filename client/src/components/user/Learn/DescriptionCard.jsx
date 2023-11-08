import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Rating} from '@material-tailwind/react'
import { addReview, deleteReview, editReview, getReviews, reportCourse, reportTeacher,reportUser } from '../../../services/userApi';
import { toast, ToastContainer } from 'react-toastify';



function DescriptionCard() {
  const courseDetails = useSelector((state) => state.course.value);
  const [fullReview,setFullReview]=useState([])
  const [reason,setReason]=useState('')
  const [report,setReport]=useState('user')
  const [rating,setRating]=useState(4)
  const [review,setReview]=useState('')
  const [reportUserId,setUser]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [newReview,setNewReview]=useState("")
  const [newRating,setNewRating]=useState(4)
  const userId=useSelector((state)=>state.user.id)


  useEffect(()=>{
    getReviews(courseDetails.courseInfo?._id).then((res)=>{
      setFullReview(...res.data.reviews)
    }).catch((err)=>{
      console.log(err)
    })
  },[courseDetails,review,fullReview])


  function handleRating(e){
    setRating(e.target.value)
  }

  function handleText(e){
    setReview(e.target.value)
  }

  const handleReview=()=>{
    addReview(rating,review,courseDetails.courseInfo?._id).then((res)=>{
      setReview("")
      toast.success(res.data.message)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleDeleteReview=(reason)=>{
    setIsLoading(true)
    deleteReview(reason,courseDetails.courseInfo?._id).then(async(res)=>{
     setFullReview('')
      toast.success(res.data.message)
    }).catch((err)=>{
      toast.error(err)
    }).finally(()=>{
      setIsLoading(false)
    })
  }


  const handleEditReview=()=>{
    editReview(newReview,newRating,review,courseDetails?.courseInfo?._id).then((res)=>{
      setNewReview('')
      toast.success(res.data.message)
      setReview('')
      setFullReview('')
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleReport=(e)=>{
    if(e.target.checked){
      setReport(e.target.value)
    }else{

    }
  }

  function validReview(){
    if(review.trim()!==''){
      if(rating!==0){
        return true
      }
    }
    return false
  }

  function validEditReview(){
    if(newReview.trim()!==''){
      if(newRating!==0){
        return true
      }
    }
    return false
  }

  function validReport(){
    if(report!==''){
      if(reason.trim()!==''){
        return true
      }
    }
    return false
  }

  const handleReportSubmit=()=>{
    if(report==='teacher'){
      reportTeacher(courseDetails?.teacherInfo?._id,reason).then((res)=>{
        toast.success(res.data.message)
        setReason('')
      }).catch((err)=>{
        console.log(err)
      })
    }else if(report==='user'){
      reportUser(reportUserId,reason).then((res)=>{
        toast.success(res.data.message)
        setReason('')
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      reportCourse(courseDetails?.courseInfo?._id,reason).then((res)=>{
        toast.success(res.data.message)
        setReason('')
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  return (
    <>
    <div className="course-info-wrap p-5">
              
    <div>
      <h3 className="text-2xl  mt-2 font-semibold mb-4 ">Author</h3>
      <blockquote className="rounded-lg bg-gray-100 p-8">
        <div className="flex items-center gap-4">
          <img
            alt="Man"
            // src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            src={courseDetails?.teacherInfo?.picture}
            // src='https://cdn-icons-png.flaticon.com/512/145/145843.png?w=740&t=st=1688454207~exp=1688454807~hmac=52c75a7aea9463ddd346b6747be41c284e0d6e00b1ea5c27e31671d2a8955b07'
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              {courseDetails &&
                courseDetails?.teacherInfo?.name}
            </p>
          </div>
          <div className='basis-4/5 flex justify-end '>
 
<button type="button" className="block bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2  text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800" onClick={() => {window.report_modal_3.showModal(),setReason('')}}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </svg>
       </button>


</div>

        </div>

        <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-950  mx-4"  >
          {courseDetails && courseDetails?.teacherInfo?.about}
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
    <div>
      <h3 className="text-2xl  mt-4 font-semibold mb-4 ">Reviews</h3>
      <div className="border flex flex-col shadow-sm rounded-md p-3 ">
        <input type='text' value={review} onChange={(e)=>handleText(e)} placeholder='Add Reviews' className="p-3 text-slate-600 mt-4 border">
        </input>
        <div className='flex justify-between'>
        <Rating  className='m-4' value={rating} onChange={(e)=>handleRating(e)}/>
        <button onClick={handleReview} disabled={!validReview()} className='bg-blue-500 text-white text-lg px-5 rounded font-medium mt-2 disabled:bg-gray-400'>submit</button>
        </div>
      </div>
    </div>

    {
    isLoading?(<><div className="flex w-full min-h-screen items-center justify-center">
      <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
    <i className="fas fa-circle-notch fa-spin fa-5x"></i>
  </span>
      </div></>):(fullReview?.reviews &&(
      <div className="border shadow-sm rounded-md p-3 ">
      {fullReview.reviews.map((review)=>(
        <>
        <h3 className="text-xl  mt-4 font-semibold mb-4 ">{review?.userInfo}</h3>
        <div className="flex justify-between">
        <div className='flex flex-col'>
        <p className="text-slate-600 mt-4 ">
          {review?.text}
        </p>
        <Rating  className='m-4 text-yellow-400' value={review?.rating} readonly/>
        </div>
        <div>
        {review?.user===userId ?(<><button
                            onClick={() => {window.edit_review_modal.showModal(),setReview(review?.text)}}
                            className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-200 font-medium rounded-full text-sm px-3 py-2 text-center mr-2  dark:focus:ring-yellow-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-3 h-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                          
                            <button
                              type="button"
                              className=" text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2.5  text-center mr-2  dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-900"
                              onClick={() => {
                                handleDeleteReview(review?.text);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3 h-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              <span className="sr-only">Icon description</span>
                            </button></>):(
                              <button type="button" className="block bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2  text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800" onClick={() => {window.reportUser_modal_3.showModal(),setUser(review?.user),setReason('')}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                  </svg>
                                     </button>
                            )}
                
        </div>
        </div>
      
        </>
      ))}
      </div>
    ))}
    <ToastContainer/>
    
  </div> 

{/* report modal */}
<dialog
className=" modal fixed "
id="report_modal_3"
>
<form
  method="dialog"
  className=" relative w-auto translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-16 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:min-w-[845px]"
>
  <div className=" relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
      <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
        Report
      </h5>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setReport('user')}>
        ✕
      </button>
    </div>
    <div className="p-7">
    <form method="dialog" className="relative modal-box">
          <div className="flex flex-col">
          <div className="flex">
          <input type="radio" checked={report==='teacher'} value='teacher' onChange={(e)=>handleReport(e)} className='m-1' id='teacher' name='report'/>
           <label htmlFor="teacher">Report Teacher</label>
          </div>
           <div className="flex">
           <input type="radio" checked={report==='course'} value='course' onChange={(e)=>handleReport(e)} className='m-1' id='course' name='report' />
           <label htmlFor="course">Report Course</label>
           </div>
          </div>
           
           <input
           type='text'
             className="textarea textarea-bordered w-full"
             placeholder="Reason for reporting"
             value={reason}
             onChange={(e) => setReason(e.target.value)}
           >
           </input>

           <div className="flex  w-full justify-end">
             <button
               onClick={handleReportSubmit}
               type="button"
               disabled={!validReport()}
               className=" form-btn mt-2 font-medium rounded p-2 bg-blue-500  disabled:bg-gray-400"
             >
               <span className="txt">Submit</span>
             </button>
           </div>
         </form>
    </div>
  </div>
</form>
<ToastContainer />
</dialog>

{/* report User modal */}
<dialog
className=" modal fixed "
id="reportUser_modal_3"
>
<form
  method="dialog"
  className=" relative w-auto translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-16 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:min-w-[845px]"
>
  <div className=" relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
      <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
        Report User
      </h5>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </div>
    <div className="p-7">
    <form method="dialog" className="relative modal-box">
           <input
           type='text'
             className="textarea textarea-bordered w-full"
             placeholder="Reason for reporting"
             value={reason}
             onChange={(e) => setReason(e.target.value)}
           >
           </input>

           <div className="flex  w-full justify-end">
             <button
               onClick={handleReportSubmit}
               type="button"
               disabled={!validReport()}
               className=" form-btn mt-2 font-medium rounded p-2 bg-blue-500  disabled:bg-gray-400"
             >
               <span className="txt">Submit</span>
             </button>
           </div>
         </form>
    </div>
  </div>
</form>
<ToastContainer />
</dialog>

{/* Edit Review Modal */}
<dialog
        className=" modal fixed top-0 left-0 z-[1055]   overflow-y-auto overflow-x-hidden outline-none "
        id="edit_review_modal"
      >
       <form
  method="dialog"
  className=" relative w-auto translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-16 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:min-w-[845px]"
>
  <div className=" relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
      <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
        Edit Review
      </h5>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </div>
    <div className="p-7">
    <form method="dialog" className="relative modal-box">           
           <input
           type='text'
             className="textarea textarea-bordered w-full"
             placeholder="Edit the review"
             value={newReview}
             onChange={(e) => setNewReview(e.target.value)}
           >
           </input>
        <Rating  className='m-4 text-yellow-400' value={newRating} readonly/>
            
           <div className="flex  w-full justify-end">
             <button
               onClick={()=>handleEditReview()}
               type="button"
               disabled={!validEditReview()}
               className=" form-btn mt-2 font-medium rounded bg-blue-500 p-2 disabled:bg-gray-400 "
             >
               <span className="txt">Submit</span>
             </button>
           </div>
         </form>
    </div>
  </div>
</form>
        <ToastContainer/>
      </dialog>
  </>
  )
}

export default DescriptionCard