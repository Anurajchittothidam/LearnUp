import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { teacherLogin,googleAuth,forgotPassword, authTeacher} from '../../services/teacherApi';
import {useDispatch,useSelector} from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google';
import { setTeacherDetails } from '../../redux/features/teacherAuth';
import Navbar from './teacherNav/Navbar';

function Login() {
  const [userDetails,setUserDetails]=useState({
    email:'',
    password:'',
    confirmPassword:''
  })
  const [isLoading,setIsLoading]=useState(false)
  const [forgotPasswordPop,setForgot]=useState(false)
  const dispatch=useDispatch()

  const navigate=useNavigate()

  function handleChange(e){
    const {name,value}=e.target
    setUserDetails((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  useEffect(()=>{
    authTeacher().then((res)=>{
      if(res){
        navigate('/teachers/')
      }
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  function handleSubmit(){
    if(userDetails.email.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      if(userDetails.password.trim()!==""){
        setIsLoading(true)
        teacherLogin(userDetails).then((result)=>{
          const userDetails=result.data
          localStorage.setItem('teacherJwtToken',result.data.token)
          dispatch(setTeacherDetails(userDetails))
          navigate('/teachers')
        }).catch((err)=>{
          toast.error(err.response.data)
        }).finally(()=>{
          setIsLoading(false)
        })
      }else{
        toast.error('Fill the password')
      }
    }else{
      toast.error('Fill A Valid Email')
    }
  }

  function handleForgot(){
    if(userDetails.email.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      if(userDetails.password.trim()!==""){
        if(userDetails.confirmPassword.trim()===userDetails.password.trim()){
          setIsLoading(true)
          forgotPassword(userDetails).then((res)=>{
            if(res.status){
              navigate('/teachers/forgot')
            }else{
              toast.error(res.message)
            }
          }).catch((err)=>{
            toast.error(err.response.data)
          }).finally(()=>{
            setIsLoading(false)
          })
        }else{
          toast.error('Confirm password not match')
        }
      }else{
        toast.error('Fill the password')
      }
    }else{
      toast.error('Fill A Valid Email')
    }
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      googleAuth(tokenResponse).then((res)=>{
        if(res){
          // const {email,name,phoneNumber,about,picture}=res.data.user
          const {token,id}=res.data
          const userDetails={token,id}
          localStorage.setItem('teacherJwtToken',res.data.token)
          dispatch(setTeacherDetails(userDetails))
          navigate('/teachers/')
        }
      }).catch((err)=>{
        toast.error(err.response.data)
      })
}});
  return (
    <>

    {isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
        </div>
      ) : (
<body className="bg-white">
<Navbar data={'login'}/>
  <div className="flex min-h-screen pt-10">

    <div className="flex flex-row w-full ">

      <div className='hidden lg:flex flex-col  justify-center '>
       
       <img src="../../../images/online-education.png" className='ms-12' />
       
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-10 relative">
        <div className="flex lg:hidden justify-between items-center w-full py-4">
          
          <div className="flex items-center space-x-2">
            <span>Don't have an account? </span>
            <a onClick={()=>navigate('/teachers/signup')} className="underline font-medium text-[#070eff]">
              Sign up now
            </a>
          </div>
        </div>
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Teacher Login</h2>
            <p className="text-md md:text-lg">Launch Your Teaching Career with LearnUp and Dive into Earning Opportunities!</p>
          </div>
          <div className="flex flex-col max-w-md space-y-5">
          <input type="email" placeholder="Email" name='email' value={userDetails.email} onChange={handleChange}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />            
          <input type="password" placeholder="Password" value={userDetails.password} name='password' onChange={handleChange}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
            {forgotPasswordPop && (<input type="password" placeholder="Confirm Password" value={userDetails.confirmPassword} name='confirmPassword' onChange={handleChange}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />)}
            {forgotPasswordPop ?( <button onClick={handleForgot} className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Submit
              </button>):( <button onClick={handleSubmit} className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Submit
              </button>) }
              <button onClick={()=>setForgot(true)} className=" px-3 py-2  text-blue">forgot password
              </button>
            <div className="flex justify-center items-center">
              <span className="w-full border border-black"></span>
              <span className="px-4">Or</span>
              <span className="w-full border border-black"></span>
            </div>
            <button onClick={()=> login()} className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
              <span className="absolute left-4">
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                  <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                  <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                  <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              </span>
              <span>Sign in with Google</span>
            </button>
            <h4>Don't have an account?<a className='text-blue-500 ps-1 cursor-pointer' onClick={()=>navigate('/teachers/signup')}>Sign Up</a></h4>
          </div>
        </div>

      </div>
    </div>
<ToastContainer/>

  </div>
</body>
      )}
      <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  /></>
  )
}

export default Login