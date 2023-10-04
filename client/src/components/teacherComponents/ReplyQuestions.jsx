import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { getCourse, replyQuestion } from '../../services/teacherApi'
import Navbar from './teacherNav/Navbar'
import Sidebar from './teacherSideBar/Sidebar'

function ReplyQuestions() {
    const {courseId}=useParams()
    const [isLoading,setIsLoading]=useState(false)
    const [course,setCourse]=useState([])
    const [replyIndex,setReplayIndex]=useState(-1)
    const [answer,setAnswer]=useState('')

    useEffect(()=>{
        getCourse(courseId)
      .then((res) => {
        console.log(res.data)
        setCourse(res?.data?.course)
      })
      .catch((err) => {
        console.log(err);
      });
    },[])

    const validForm = () => {
        if (answer.trim() === "") {
          return false;
        }
        return true;
    };

    const handleSubmit=()=>{
        try{
            const questionIndex=replyIndex?.questionIndex
            const chapterIndex=replyIndex?.chapterIndex
            replyQuestion(courseId,chapterIndex,answer,questionIndex).then((res)=>{
                if(res){
                    toast.success('Reply to the Question Added.')
                    setCourse((prev)=>{
                        const updated={...prev}
                        updated.course[chapterIndex].questionsAndAnswers[questionIndex].answer=answer
                        return updated
                    })
                    setAnswer('')
                }else{
                    toast.error('Answer not Added')
                }
            })
        }catch(err){
            toast.error('Something went wrong')
        }
        
    }

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
                <div className="Q&A p-5 w-full">
      <div className="flex justify-between ">
        <h3 className="text-2xl text-gray-800 mt-2 font-semibold mb-4 ">
          Questions and Answers
        </h3>
        {/* You can open the modal using ID.showModal() method */}
       
        {/* <dialog id="my_modal_3" className="modal flex items-center justify-center">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-2">
              {" "}
              Replay For the Question
              {/* {index + 1}{" "} */}
            {/* </h3>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Ask Question"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {" "}
            </textarea>

            <div className="flex  w-full justify-end">
              <button
                onClick={handleSubmit}
                type="button"
                className=" form-btn mt-2 font-medium rounded  "
                disabled={!validForm()}
              >
                <span className="txt">Submit</span>
              </button>
            </div>
          </form>
        <ToastContainer/>

        </dialog> */} 
        <dialog
className=" modal fixed "
id="my_modal_3"
>
<form
  method="dialog"
  className=" relative w-auto translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-16 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:min-w-[845px]"
>
  <div className=" relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
     
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </div>
    <div className="p-7">
    <form method="dialog" className="relative modal-box">
          
           <h3 className="font-bold text-lg mb-2">
             {" "}
             Replay For the Question 
             {/* {index + 1}{" "} */}
           </h3>

           <textarea
             className="textarea textarea-bordered w-full"
             placeholder="Reply Question"
             value={answer}
             onChange={(e) => setAnswer(e.target.value)}
           >
             {" "}
           </textarea>

           <div className="flex  w-full justify-end">
             <button
               onClick={handleSubmit}
               type="button"
               className=" form-btn mt-2 font-medium rounded  "
               disabled={!validForm()}
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
      </div> 

                { course?.course  &&   course?.course.map((chapter, chapterIndex) => (
        <blockquote key={chapterIndex} className="rounded-lg bg-gray-100 p-4">
          <h4 className="font-bold text-lg mb-2">Chapter {chapterIndex + 1}</h4>

          {chapter?.questionsAndAnswers?.map((qa, qaIndex) => (
            <div>
            <div key={qaIndex} className="flex justify-between">
              <p className="text-lg font-semibold text-gray-700">
                Qn{qaIndex + 1}. {qa?.question}
              </p>
              <button
                className="btn btn-sm font-bold rounded-md hover:bg-violet-700 hover:text-slate-100"
                
                onClick={() => {
                  setReplayIndex({ chapterIndex: chapterIndex, questionIndex: qaIndex , questionId:qa._id });
                  window.my_modal_3.showModal();

                }}
              >
                Reply
              </button>
                </div>
          <p className="text-gray-950 mx-2 mb-4">
            {chapter?.questionsAndAnswers[qaIndex]?.answer} 
          </p>
            </div>
          ))}
        </blockquote>
      ))}
      </div>
 
                </div>
              </main>
            )}
        </div>
    </div>
</div>
            
  )
}

export default ReplyQuestions