import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPassword,verifyForgot } from '../../../services/userApi'

function ForgotPassword() {
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const [userData,setUserData]=useState({
    email:'',
    password:''
  })

  function handleChange(e){
    const {name,value}=e.target
    setUserData((prev)=>({
      ...prev,
      [name]:value
  }))
  }

  function handleSubmit(e){
    e.preventDefault()
    setIsLoading(true)
    forgotPassword(userData).then((result)=>{
      navigate('/otp')
    }).catch((err)=>{
      toast.error(err)
    }).finally(()=>{
      setIsLoading(false)
    })
  }
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

  <div className="flex min-h-screen">

    <div className="flex flex-row w-full ">

      <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
        <div className="flex lg:hidden justify-between items-center w-full py-4">
          
          <div className="flex items-center space-x-2">
            <span>Not a member? </span>
            <a href="#" className="underline font-medium text-[#070eff]">
              Sign up now
            </a>
          </div>
        </div>
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Forgot Password</h2>
            <p className="text-md md:text-xl">Sign up or log in to place the order, password required!</p>
          </div>
          <div className="flex flex-col max-w-md space-y-5">
          <form onSubmit={handleSubmit} className="flex flex-col max-w-md space-y-2">
               
                <label htmlFor="">Email</label>
              <input type="email" placeholder="Email" name='email' onChange={handleChange}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" /> 
                
             <label htmlFor="">Password</label>
              <input type="password" placeholder="Password" name='password' onChange={handleChange}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" /> 
                <label htmlFor="">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" name='confirmPassword' onChange={handleChange}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
            <button type='submit' className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Submit</button>
            </form>
           
          </div>
        </div>

      </div>
    </div>
    
  </div>
</body>
)}
<link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
</>
  )
}

export default ForgotPassword