import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { addTeachers, authAdmin } from "../../services/adminApi";
import { authTeacher, teacherSignup } from "../../services/teacherApi";
import "./signup.css";

function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
  });

  useEffect(() => {
    if (props.data === "teacher") {
      authTeacher()
        .then((res) => {})
        .catch((err) => {
          navigate("/teachers/signup");
        });
    } else {
      authAdmin()
        .then((res) => {
          // if(res){
          // }
        })
        .catch((err) => {
          navigate("/admin/login");
        });
    }
  }, []);

  function changeInput(e) {
    const { name, value } = e.target;
    setFormData((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(props.data);
    setIsLoading(true);
    if (props.data === "teacher") {
      console.log("dfs");
      teacherSignup(formData)
        .then((res) => {
          navigate("/teachers/otp");
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      addTeachers(formData)
        .then((res) => {
          navigate("/admin/teachers/otp");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function logout() {
    localStorage.removeItem('adminJwtToken')
      navigate('/admin/login')
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
          <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
            <i className="fas fa-circle-notch fa-spin fa-5x"></i>
          </span>
        </div>
      ) : (
        <body className="bg-white">
          <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div class="px-3 py-3 lg:px-5 lg:pl-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center justify-start">
                  <button
                    id="toggleSidebarMobile"
                    aria-expanded="true"
                    aria-controls="sidebar"
                    class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                  >
                    <svg
                      id="toggleSidebarMobileHamburger"
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      id="toggleSidebarMobileClose"
                      class="w-6 h-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <a class="text-xl font-bold flex items-center lg:ml-2.5">
                    <span class="self-center whitespace-nowrap">LearnUp</span>
                  </a>
                </div>
                {props.data === "admin" ? (
                  <>
                    <div class="flex items-center">
                      <div class="hidden lg:flex items-center"></div>
                      <a
                        onClick={logout}
                        class="cursor-pointer hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
                      >
                        LogOut
                      </a>
                    </div>
                  </>
                ) : (
                  <div class="flex items-center">
                    <div class="hidden lg:flex items-center"></div>
                    <a
                      onClick={() => navigate("/login")}
                      class="cursor-pointer hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
                    >
                      Continue as Student
                    </a>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="flex min-h-screen pt-10">
            <div className="flex flex-row w-full ">
              {props.data === "admin" ? (
                <>
                  <div className="flex ps-5 pt-10">
                    <div className="flex cursor-pointer shadow rounded h-8 w-30 mt-2 px-5 pt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <h2
                        className="mx-1"
                        onClick={() => navigate("/admin/teachers")}
                      >
                        Back
                      </h2>
                    </div>
                  </div>
                </>
              ) : (
                <div className="hidden lg:flex flex-col  justify-center ">
                  <img
                    src="../../../images/online-education.png"
                    className="ms-12"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col items-center justify-center p-10 relative">
                {props.data === "admin" ? (
                  ""
                ) : (
                  <div className="flex lg:hidden justify-between items-center w-full py-4">
                    <div className="flex items-center space-x-2">
                      <span>Alredy have an account? </span>
                      <a
                        onClick={() => navigate("/teachers/login")}
                        className="underline font-medium text-[#070eff]"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col  justify-center space-y-2 max-w-md">
                  <div className="flex flex-col space-y-2 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Teacher Sign Up
                    </h2>
                    <p className="text-md md:text-xl">
                      Launch Your Teaching Career with LearnUp and Dive into
                      Earning Opportunities!
                    </p>
                  </div>
                  <div className="flex flex-col max-w-md space-y-2">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col max-w-md space-y-2"
                    >
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        onChange={changeInput}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                      />
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={changeInput}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                      />
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        placeholder="PhoneNumber"
                        name="phoneNumber"
                        onChange={changeInput}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                      />
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={changeInput}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                      />
                      <label htmlFor="">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={changeInput}
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                      />
                      <button
                        type="submit"
                        className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                      >
                        Submit
                      </button>
                    </form>
                    {/* <div className="flex justify-center items-center">
              <span className="w-full border border-black"></span>
              <span className="px-4">Or</span>
              <span className="w-full border border-black"></span>
            </div> */}
                    {/* <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
              <span className="absolute left-4">
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                  <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                  <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                  <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              </span>
              <span>Sign Up with Google</span>
            </button> */}
                    {props.data==='admin'?(""):(<h4>
                      Alredy have an account?
                      <a
                        className="ps-1 text-blue-500 cursor-pointer"
                        onClick={() => navigate("/teachers/login")}
                      >
                        Login
                      </a>
                    </h4>)}
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </body>
      )}
      <link
        rel="stylesheet"
        href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
      />
    </>
  );
}

export default Signup;
