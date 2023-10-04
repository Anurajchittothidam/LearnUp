import React, { useEffect, useState } from 'react'
import SyllabusDropdown from '../SyllabusDropDown/SyllabusDropDown';
import Youtube from 'react-youtube'
import getYouTubeID from "get-youtube-id";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setCourseDetails } from '../../../redux/features/CourseRedux';
import { getCourse } from '../../../services/userApi';
import Navbar from '../Navbar';
import DescriptionCard from './DescriptionCard';
import QuestionCard from './QuestionCard';


function Learn() {
    const [isLoading,setIsLoading]=useState()
    const [vedioId, setVedioId] = useState();
    const courseDetails = useSelector((state) => state.course.value);
    console.log(courseDetails)
    const [index , setIndex] = useState(0)
    const [playerHeight, setPlayerHeight] = useState("");
    const [activeTab, setActiveTab] = useState("Description");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

     // Toggle syllubus dropdown
  const toggleDropdown = (toggleIndex) => { 
    setIndex(toggleIndex)
    let course = courseDetails.course.map((course, index) => {
      if (toggleIndex == index) {
        return {
          ...course,
          open: !course.open,
        };
      } else {
        return {
          ...course,
          open: false,
        };
      }
    });
    dispatch(setCourseDetails({ ...courseDetails, course }));
  };


  // youtube window opts
  const opts = {
    height: playerHeight,
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };


  // youtube vedio id generator
  const getYoutubeVideoId = (vedioUrl) => {
    setVedioId(getYouTubeID(vedioUrl));
  };



  useEffect(() => {
    //scroll to top
    window.scrollTo(0, 0);

    if (!courseDetails) setIsLoading(true);
    // fetch CourseFull details
    getCourse(courseId)
      .then((response) => {
        if (response.data.status) {
          const course = response.data.courseDetails.course.map((obj) => {
            return { ...obj, open: false };
          });

          dispatch(
            setCourseDetails({
              ...response.data.courseDetails,
              courseInfo: { ...response.data.courseDetails },
              course,
            })
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          toastId: "error",
        });
        navigate("/");
      });



    // Setting first video to the vedio Controller
    if (courseDetails) {
      getYoutubeVideoId(courseDetails.course[0].lessons[0].vedioUrl);
    }



     // screen size
    function handleResize() {

      const windowWidth = window.innerWidth;
      if (windowWidth >= 1080) {
        setPlayerHeight("540");
      } else if (windowWidth >= 720) {
        setPlayerHeight("380");
      } else {
        setPlayerHeight("240");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);



  
  const loadTab = () => {
    switch(activeTab) {
      case "Description" :
        return <DescriptionCard /> ;
      case "QnA" :
        return <QuestionCard index={index } courseDetails={courseDetails}/>;   
      default : 
      null ;
    }


  }


  return (
    <section>
      {isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
      ) : (
        <div className="mx-auto  h-screen">
          <div className="flex flex-col sm:flex-row  ">
            <div className="w-full lg:w-8/12 overflow-auto">
              <div className="flex text-slate-700 items-center py-4 pl-2 border-b border-slate-300">
                <Link to={"/my-entrollments"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <h1 className="ml-3 text-md ">
                  {" "}
                  {courseDetails && courseDetails?.courseInfo?.name}{" "}
                </h1>
              </div>

              <div>
                {vedioId ? (
                  <div>
                    <Youtube videoId={vedioId} opts={opts} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      getYoutubeVideoId(
                        courseDetails?.course[0]?.lessons[0]?.videoUrl
                      );
                    }}
                    className="cursor-pointer relative flex justify-center items-center mt-9 md:mt-14 "
                  >
                    <div className="absolute text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                        />
                      </svg>
                    </div>
                    <img
                      className="h-50 w-80"
                      src={
                        courseDetails &&
                        courseDetails?.courseInfo?.image
                      }
                      alt="thumbnail"
                    />
                  </div>
                )}

                <div className=" ">
                  <div className=" pt-5 px-5  mx-auto">
                    <ul className=" text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
                      <li className="w-full">
                        <a
                          onClick={() => {
                            setActiveTab("Description");
                          }}
                          className={
                            activeTab == "Description"
                              ? "inline-block w-full p-4 text-gray-900 bg-violet-50 rounded-l-lg dark:bg-gray-700 dark:text-white"
                              : "bg-white inline-block w-full p-4 text-gray-900 rounded-l-lg dark:bg-gray-700 dark:text-white"
                          }
                          aria-current="page"
                        >
                          Description
                        </a>
                      </li>
                      <li className="w-full">
                        <a
                          onClick={() => {
                            setActiveTab("QnA");
                          }}
                          className={
                            activeTab == "QnA"
                              ? "inline-block w-full p-4 text-gray-900 bg-violet-100 rounded-l-lg dark:bg-gray-700 dark:text-white"
                              : "bg-white inline-block w-full p-4 text-gray-900 rounded-l-lg dark:bg-gray-700 dark:text-white"
                          }
                        >
                          Question and Answer
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className=" mx-auto pb-2">{loadTab()}</div>
                </div>
 

                <div className="hidden lg:block">
                </div>
              </div>
            </div>

            <div className="w-full lg:w-4/12 border-l border-slate-300  items-center  sm:h-screen sm:sticky overflow-auto ">
              <div>
                <div className="border-b border-slate-300 p-3 w-full relative lg:fixed top-0  z-50 bg-white">
                  <h3 className="text-2xl  font-semibold tracking-wider">
                    Syllabus
                  </h3>
                </div>
                <div>
                  <div className=" md:mt-14">
                    <div className="syllabus syllabus-wrap    rounded-lg">
                      {courseDetails &&
                        courseDetails.course.map((course, index) => (
                          <SyllabusDropdown
                            course={course}
                            index={index}
                            key={index}
                            toggleDropdown={toggleDropdown}
                            getYoutubeVideoId={getYoutubeVideoId}
                            isCourseEnrolled={true}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="block lg:hidden">
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Learn