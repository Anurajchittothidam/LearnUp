
import { toast } from 'react-toastify';
import './SyllabusDropDown.scss'
import React from 'react';


function SyllabusDropdown({ course, index, toggleDropdown, getYoutubeVideoId , isCourseEnrolled }) {
    
    // implementing Download functionality
    // const handleDownload = async (pdfUrl) => {
    //     try {
    //       const response = await fetch(pdfUrl);
    //       const blob = await response.blob();
      
    //       const downloadLink = document.createElement('a');
    //       downloadLink.href = URL.createObjectURL(blob);
    //       downloadLink.download = 'document.pdf'; // Set the desired file name
      
    //       downloadLink.click();
    //     } catch (error) {
    //         toast.error("Cant Download" ,{position :"top-center" , toastId : "error"})
    //       console.log('Error occurred during PDF download:', error);
    //     }
    //   };
      
    
    return (
        <div
            className={"syllabus   " + (course.open ? "open" : "")}
            key={index}
        >
            <div onClick={() => toggleDropdown(index)} className={"syllabus-title p-4  " + (course.open ? "lesson-open-bg" : "")} >
                <div className='flex justify-between font-semibold '>
                    {course.chapter}
                    {course.open ?
                        // up arrow
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                        </svg>
                        :
                        //down arrow
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    }
                </div>
                <div className='lessons-count text-xs mt-1  text-slate-500'>{course.lessons.length} Lessons</div>
            </div>
            {
                course.lessons.map((lesson, index) => {
                   
                    return (
                        <div onClick={() => { getYoutubeVideoId(lesson.videoUrl)}} key={index} className={"lessons-title cursor-pointer  hover:bg-violet-50 " + (course.open ? "p-4" : "")}>
                            <p className='lesson-title'>{lesson.lessonName}</p>
                            <div className='flex items-center text-slate-500 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <p className='ml-2 lesson-content-type text-slate-500'>Video</p>
                            </div>
                            
                        </div>
                        
                    )
                    
                })
               
                
            }
              
              {/* { course?.assignment&& 

                <div className={"lessons-title cursor-pointer  hover:bg-violet-50 " + (course.open ? "p-4" : "")}>
                <p className='lesson-title'> Assignments </p>
                <div className='flex items-center text-slate-500 mt-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.75 14.5v-9M10.75 14.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg> 
                        <p  
                        onClick={() => isCourseEnrolled ? handleDownload(course.assignment.secure_url) : ""} 
                        className='ml-2 lesson-content-type text-slate-500'>download file</p>
                    
                </div>
                </div>
              } */}
               

        </div>
    )
}

export default SyllabusDropdown