import React, { useState } from "react";
import { AskQuestion } from "../../../services/userApi";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

function QuestionCard({ index, courseDetails }) {
  const { courseId } = useParams();
  const [question, setQuestion] = useState("");

  const validForm = () => {
    if (question.trim() === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AskQuestion(courseId, question, index);
      if (data.status) {
        toast.success("New Question Added");
        setQuestion("")
      } else {
        toast.error("Something Went Wrong", {
          position: "top-center",
          toastId: "error",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", {
        position: "top-center",
        toastId: "error",
      });
    }
  };


  return (
    <>
     <div className="Q&A p-5 w-full">
    <div className="flex justify-between ">
      <h3 className="text-2xl text-gray-800 mt-2 font-semibold mb-4 ">
        Questions and Answers
      </h3>
      {/* You can open the modal using ID.showModal() method */}
      <button type="button" className="btn" onClick={() => window.my_modal_3.showModal()}>
        Ask Question
       </button>
       </div>
       <blockquote  className="rounded-lg bg-gray-100 p-4 mt-5">
    {courseDetails.course[index].questionsAndAnswers &&
      courseDetails.course[index].questionsAndAnswers.map((qa, qaIndex) => (
         qa.answer && (
        <div>
          <p className="text-lg font-semibold text-gray-700">
            Qn{qaIndex + 1}.{ qa.question}
          </p>
          <p className="text-gray-950 mx-2 mb-4"> 
            
            {qa.answer}</p>
          </div> )
          ))}
          </blockquote>
       </div>
   {/*    <dialog 
//         id="my_modal_3"
//         className="modal flex items-center justify-center"
//       >
//         <form method="dialog" className="relative modal-box">
//           <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//             ✕
//           </button>
//           <h3 className="font-bold text-lg mb-2">
//             {" "}
//             Enter Your Doubts For Chapter {index + 1}{" "}
//           </h3>

//           <textarea
//             className="textarea textarea-bordered w-full"
//             placeholder="Ask Question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           >
//             {" "}
//           </textarea>

//           <div className="flex  w-full justify-end">
//             <button
//               onClick={handleSubmit}
//               type="button"
//               className=" form-btn mt-2 font-medium rounded  "
//               disabled={!validForm()}
//             >
//               <span className="txt">Submit</span>
//             </button>
//           </div>
//         </form>
//         <ToastContainer />
//       </dialog>
    // </div>

  //   </div>*/}

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
      <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
        Add Question
      </h5>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </div>
    <div className="p-7">
    <form method="dialog" className="relative modal-box">
          
           <h3 className="font-bold text-lg mb-2">
             {" "}
             Enter Your Doubts For Chapter {index + 1}{" "}
           </h3>

           <textarea
             className="textarea textarea-bordered w-full"
             placeholder="Ask Question"
             value={question}
             onChange={(e) => setQuestion(e.target.value)}
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
</>
  );
}

export default QuestionCard;