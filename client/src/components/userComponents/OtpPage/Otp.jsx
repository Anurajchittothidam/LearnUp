import React from 'react'
import './otp.css'

function Otp() {
  return (
    <body className="bg-white">

    <div className="flex min-h-screen">
  
      <div className="flex flex-row w-full ">
    
        <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
         
          <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Enter the OTP</h2>
              <p className="text-md md:text-xl">The OTP is send to the specified email address</p>
            </div>
            <div className="flex flex-col max-w-md space-y-5">
              <input type="text" placeholder="OTP"
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
              <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
              submit
              </button>
            </div>
          </div>
  
        </div>
      </div>
  
    </div>
  </body>
  )
}

export default Otp