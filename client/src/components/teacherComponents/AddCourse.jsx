import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { toast, ToastContainer } from "react-toastify";
import { addCourse, getCategory, videoUpload } from "../../services/teacherApi";
import Navbar from "./teacherNav/Navbar";
import Sidebar from "./teacherSideBar/Sidebar";
import ProgressBar from '@ramonak/react-progress-bar'
import axiosInstance from "../../axios/axiosTeacher";

function AddCourse() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [chapterDetails, setChapterDetails] = useState(null);
  const [categories, setCategory] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [chapter, setChapter] = useState("");
  const [finalAssignment , setFinalAssignment] = useState(null)
  const fileInputRef = useRef();
  const zipFileInputRef = useRef(null) ;
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const teacherId = useSelector((state) => state.teacher.id);
  const [percent,setPercent]=useState(null)
  const [videoFile,setVideoFile]=useState(null)

  useEffect(() => {
    setLoading(true);
    getCategory()
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Validatig Course fields
  const validate = Yup.object({
    name: Yup.string().required("Course Name Required"),
    category: Yup.string().required("Category Required"),
    duration: Yup.string().required("Duration Required"),
    language: Yup.string().required("Language Required"),
    description: Yup.string().required("Description Required"),
    // price: Yup.string().required("Price Required"),
    // price: Yup.string().when("isFree", {
    // is: false,
    // then: Yup.string().required("Price Required"),
  // }),
  // price: Yup.mixed().when(['isFree', 'duration'], {
  //   is: (isFree) => !isFree,
  //   then: Yup.number().required("Price Required").typeError("Price must be a number"),
  //   otherwise: Yup.mixed().nullable(),
  // }),
  });

  const handleVideoChange=(e)=>{setVideoFile(e.target.files[0]),
  handleVideo()
  }

 

  // const handleVideoCancel=()=>{
  //   const action='cancel'
  //   const formData=new FormData()
  //   formData.append('action',action)
  //   formData.append('video',videoFile)
  //   videoUpload(formData).then((res)=>{
  //     setPercent(null)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }

  const formikSubmit=()=>{
    if(course.length===0){
      toast.error('Atleast one Chapter is needed')
    }else{
    formik.handleSubmit()
    }
  }


  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      duration: "",
      language: "",
      isFree: false,
      price: "",
      description: "",
    },
    // validate using Yup
    validationSchema: validate,
    // handling The form submition
      onSubmit: async (values) => {
        console.log("course+++", course, "+++++++++$##%#$%");
        // Calling addCourse api and pass the required data as body
        setLoading(true);
        addCourse(values, course, image, teacherId)
          .then((res) => {
            if (res && res.data && res.data.status) {
              // Passing the success message to toast
              successMessage(res.data.message);
              navigate("/teachers/courses ");
            } else {
              // generating Error message using toast alert
              generateErrror(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err.response.data.message);
            toast.error(err.response.data.message)
            // generateErrror("Network error");
          })
          .finally(() => {
            setLoading(false);
          });
      },
   
    
  });

  // handling the course change and updating the values in the formik
  const handleChange = (e) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[e.target.name] = e.target.value;
      return formFields;
    });
  };

  const validateLesson = Yup.object({
    chapterName: Yup.string().required("Chapter Name is Required"),
    lessonName: Yup.string().required("Lesson Name is Required"),
    videoUrl: Yup.string()
      .required("(Video Link Required")
     ,
  });

  const lessonFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      chapterName: "",
      lessonName: "",
      videoUrl:"",
    },
    // Check validated
    validationSchema: validateLesson,
    // Handling submition
    onSubmit: (values) => {
      console.log("values", values);
      setLesson([...lesson, values]);
      console.log("lesson Submit ", lesson);
      // After setting the lesson the lessoName field value will be cleared
      lessonFormik.setFieldValue("lessonName", "");
      setPercent(null)
      // clearing the vedioUrl field
      lessonFormik.setFieldValue("videoUrl", "");
    },
  });


  // handle image select
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleLessonChange = (e) => {
    lessonFormik.setValues((prev) => {
      // storing the previous values in formFields
      const formFields = { ...prev };
      // and updating theat field names with our new values
      formFields[e.target.name] = e.target.value;
      return formFields;
    });
  };

  const addChapter = () => {
    console.log(lesson, "++LSDF");
    setCourse([...course, { chapter,assignment:finalAssignment, lessons: lesson }]);
    setChapter("");

    if(zipFileInputRef.current ){
       zipFileInputRef.current.value = null
     }

     setFinalAssignment(null)
    setLesson([]);
    successMessage("Chapter Added successfully");
  };

  const handleVideo=(e)=>{
    const formData=new FormData()
    formData.append('video',e.target.files[0])
    axiosInstance('teacherJwtToken').put('/teacher/uploadVideo',formData,{
      onUploadProgress:(p)=>{
          const percentComplete=Math.round(p.loaded*100/p.total)
          setPercent({fileName:e.target.files[0].name,percentComplete})
      },
      headers:{
      'Content-Type': 'multipart/form-data',
  }}).then(async(res)=>{
      console.log(res.data)
      lessonFormik.setFieldValue('videoUrl',res.data.url)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleAssignment=(e)=>{
    if(isValidFileUpload(e.target.files[0])){
      convertToBase64(e.target.files[0])
    }else{
      generateErrror('Invalide file format')
    }
  }

  //validating the assignment is pdf
  const isValidFileUpload=(e)=>{
    const valideExtentions=['pdf']
    const fileExtention=e.name.split('.').pop('').toLowerCase()
    return valideExtentions.includes(fileExtention)
  }

  //converting into base64 code
  const convertToBase64=(e)=>{
    const reader=new FileReader()
    reader.readAsDataURL(e)
    reader.onload=()=>{
      setFinalAssignment(reader.result)
    }
  }

  const successMessage = (message) => {
    toast.success(message, {
      position: "top-center",
    });
  };

  const generateErrror = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };



  return (
    <>
      <div>
        <Navbar/>
        <div class="flex overflow-hidden bg-white pt-16">
          <Sidebar/>
          <div
            id="main-content"
            class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div class="pt-6 px-4">
                <div class="lg:col-span-2 my-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div class="md:col-span-5">
                      <label for="full_name">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Course Name"
                        id="name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.name}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p className="text-red-500 text-xs ">
                          {formik.errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div class="md:col-span-5 my-2">
                      <label for="email">Description</label>
                      <textarea
                        rows="3"
                        type="text"
                        id="description"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        name="description"
                        className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {formik.values.description}
                      </textarea>
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <p className="text-red-500 text-xs ">
                          {formik.errors.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="relative my-2">
                      <label htmlFor="category">Category</label>
                      <select
                        name="category"
                        className="form-select required btn btn-light block appearance-none w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:shadow-outline"
                        id="category-select"
                        aria-label="Default select example"
                        onChange={(e) => handleChange(e)}
                        value={formik.values.category}
                      >
                        <option value="">Category</option>
                        {/* Replace the following loop with your category mapping */}
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.293 5.293a1 1 0 011.414 0L14 9.586V11a1 1 0 11-2 0V9.586l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 010-1.414l-3-3a1 1 0 010-1.414 1 1 0 011.414 0L12 6.586V5a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414l-3 3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div class="md:col-span-2 my-2">
                      <label for="city">Duration</label>
                      <input
                        type="text"
                        id="Duration"
                        placeholder="Course Duration"
                        name="duration"
                        value={formik.values.duration}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {formik.touched.duration && formik.errors.duration ? (
                        <p className="text-red-500 text-xs ">
                          {formik.errors.duration}
                        </p>
                      ) : null}
                    </div>

                  

                    <div class="md:col-span-2 my-2">
                      <label for="address">Language</label>
                      <input
                        type="text"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="Language"
                        placeholder="Language"
                        name="language"
                        value={formik.values.language}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {formik.touched.language && formik.errors.language ? (
                        <p className="text-red-500 text-xs ">
                          {formik.errors.language}
                        </p>
                      ) : null}
                    </div>

                    <div class="md:col-span-1 my-2">
                      <div class="inline-flex items-center">
                        <input
                          id="isFree"
                          name="isFree"
                          type="checkbox"
                          className="checkbox checkbox-primary mr-3"
                          checked={formik.values.isFree}
                          onChange={formik.handleChange}
                        />
                        <label for="billing_same" class="ml-2">
                          isFree
                        </label>
                      </div>
                    </div>
                    {!formik.values.isFree && (
                      <div class="md:col-span-2 my-2">
                        <label for="price">Price</label>
                        <input
                          id="price"
                          name="price"
                          type="text"
                          placeholder="Price"
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <p className="text-red-500 text-xs">
                            {formik.errors.price}
                          </p>
                        ) : null}
                      </div>
                    )}

                    <div className="md:col-span-4 my-2">
                      <label for="image" className="pt-2">
                        Image
                      </label>
                      <div className="flex">
                        {image ? (
                          <>
                            <img
                              class="h-40 w-40 course-image"
                              alt="image description"
                              src={image ? URL.createObjectURL(image) : ""}
                              onClick={handleClick}
                            ></img>
                          </>
                        ) : (
                          ""
                        )}
                        <div
                          class={
                            !image
                              ? "flex items-center justify-center w-full "
                              : "items-center justify-center w-full hidden"
                          }
                        >
                          <div className="w-full lg:w-1/3  md:w-1/2 sm:w-1/1">
                            <label
                              for="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  ></path>
                                </svg>
                                <p>Course thumbnail</p>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 ">
                      <label
                        className="block uppercase tracking-wide text-violet-600 text-sm font-semibold mb-2"
                        htmlFor="addchapter"
                      >
                        Add Chapter
                      </label>

                      <div className="chapter mt-4">
                        <button
                          type="button"
                          className=" bg-green-400   focus:ring-4 focus:outline-none text-white focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                          onClick={() => window.my_modal_3.showModal()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          <span className="ml-3 ">Add Chapter</span>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      {course.map((obj, index) => {
                        return (
                          <div className="p-3 w-full md:w-1/2">
                            <a
                              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                              onClick={() => {
                                setChapterDetails(
                                  course.find(
                                    (courses) => courses.chapter === obj.chapter
                                  )
                                );
                                console.log(chapterDetails, "chapter detajd");
                              }}
                            >
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className=" text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                  <span className="mr-3">{index + 1}</span>
                                  {obj.chapter}
                                </h5>
                              </div>
                            </a>
                          </div>
                        );
                      })}
                    </div>

                    {loading ? (
                      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="md:col-span-5 text-center">
                          <div className="inline-flex items-end">
                            <button
                              onClick={formikSubmit}
                              className="bg-blue-500 mb-5 text-base hover:bg-blue-700 text-white font-bold py-3 px-10 rounded"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
      <ToastContainer />
            </main>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
      />
      {/*add course modal */}
      <dialog
        className=" modal fixed top-2 left-2 z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none "
        id="my_modal_3"
      >
        <form
          method="dialog"
          className=" relative w-auto translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-16 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:min-w-[845px]"
        >
          <div className=" relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Add Chapter
              </h5>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </div>
            <div className="p-7">
              <div className="flex md:ml-20 mt-5 ">
                <div className="relative mb-3 w-full  md:w-1/2 lg:w-2/3 m-3">
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="chapterName"
                    name="chapterName"
                    placeholder="Form control lg"
                    value={chapter}
                    onChange={(e) => {
                      handleLessonChange(e);
                      setChapter(e.target.value);
                    }}
                  />

                  {lessonFormik.touched.chapterName &&
                  lessonFormik.errors.chapterName ? (
                    <p className="text-red-500 text-xs ">
                      {lessonFormik.errors.chapterName}
                    </p>
                  ) : null}

                  <label
                    htmlFor="chapterName"
                    className={`pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${
                      lessonFormik.values.chapterName
                        ? "-translate-y-[1.7rem] scale-[0.8] text-primary"
                        : ""
                    } `}
                  >
                    Chapter Name
                  </label>
                </div>
              </div>

              <div className="flex  md:ml-20  mt-5 ">
                <div className="relative mb-3 w-full sm:w-1/2 md:w-2/3 m-3 ">
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="lessonName"
                    value={lessonFormik.values.lessonName}
                    onChange={(e) => {
                      handleLessonChange(e);
                    }}
                    name="lessonName"
                    placeholder="Lesson Name"
                  />
                  {lessonFormik.touched.lessonName &&
                  lessonFormik.errors.lessonName ? (
                    <p className="text-red-500 text-xs ">
                      {lessonFormik.errors.lessonName}
                    </p>
                  ) : null}
                  <label
                    htmlFor="lessonName"
                    className={`pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${
                      lessonFormik.values.lessonName
                        ? "-translate-y-[1.7rem] scale-[0.8] text-primary"
                        : ""
                    } `}
                  >
                    Lesson Name
                  </label>
                </div>
                <div className="relative mb-3 w-full sm:w-1/2   m-3">
                  <input
                    type="file"
                    name="video"
                    onChange={(e) => {
                      handleVideo(e);
                    }}
                    // value={lessonFormik.values.videoUrl}
                    className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="videoUrl"
                    // placeholder="Video Url"
                  />
                  {/* {lessonFormik.touched.videoUrl &&
                  lessonFormik.errors.videoUrl ? (
                    <p className="text-red-500 text-xs ">
                      {lessonFormik.errors.videoUrl}
                    </p>
                  ) : null} */}

                  <label
                    htmlFor="videoUrl"
                    className={`pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out 
                      
                     `}
                  >
                    Video Link
                  </label>
                </div>
                {/* <div className="relative mb-3 w-full sm:w-1/2   m-3">
                  <input
                    type="text"
                    name="videoUrl"
                    onChange={(e) => {
                      handleLessonChange(e);
                    }}
                    value={lessonFormik.values.videoUrl}
                    className="peer block min-h-[auto] w-full rounded border-gray-300  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="videoUrl"
                    placeholder="Video Url"
                  />
                  {lessonFormik.touched.videoUrl &&
                  lessonFormik.errors.videoUrl ? (
                    <p className="text-red-500 text-xs ">
                      {lessonFormik.errors.videoUrl}
                    </p>
                  ) : null}

                  <label
                    htmlFor="videoUrl"
                    className={`pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${
                      lessonFormik.values.videoUrl
                        ? "-translate-y-[1.7rem] scale-[0.8] text-primary"
                        : ""
                    } `}
                  >
                    Video Link
                  </label>
                </div> */}
                <div className="relative mb-3 w-full md:w-1/3 m-3">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-400 
                            md:ml-5  dark:hover:bg-green-500 dark:focus:ring-green-500"
                    onClick={lessonFormik.handleSubmit}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mx-4 mt-3   md:mx-20"> 
              <div  className="block  tracking-wide text-slate-800 text-md font-semibold mb-2"
                     >ADD Assignment</div>  
                 <input
                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
               aria-describedby="file_input_help"
               id="file_input"
                type="file"
                name="assignment" // Add the name attribute for the assignment file
                ref={zipFileInputRef}
                accept="application/pdf"
                onChange={handleAssignment}      
               />

              </div>
              {percent&&(
                <div>
                  <div className="flex flex-wrap">
                    <h1>Percentage</h1>
                    <p>{percent.fileName}</p>
                  </div>
                    <ProgressBar
                      completed={percent.percentComplete}
                      bgColor='blue'
                    />
                  </div>
              )}

              {lesson[0] ? (
                <div>
                  <div>
                    <h1 className="ml-4 mt-3">Lessons</h1>
                  </div>

                  <div className="flex flex-wrap">
                    {lesson.map((obj, index) => {
                      return (
                        <div className="p-3 w-full md:w-1/2">
                          <a className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                              <h5 className=" text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                <span className="mr-3">{index + 1}.</span>
                                {obj.lessonName}
                              </h5>
                            </div>
                          </a>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex  flex-wrap -mx-3 mb-2">
                    <div className="mt-8 w-full  flex justify-center mr-7">
                      <button
                        onClick={addChapter}
                        type="button"
                        className="loading-btn form-btn mt-2 font-medium rounded"
                      >
                        <span className="txt">Submit</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      <ToastContainer />
      </dialog>
    </>
  );
}

export default AddCourse;
