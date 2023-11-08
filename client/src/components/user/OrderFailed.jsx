import React from 'react'
import { useNavigate } from 'react-router-dom';

function OrderFailed() {
    const navigate=useNavigate();
    setTimeout(()=>{
        navigate('/category')
    },5000)
    return (
        <div class="bg-white-100 h-screen flex justify-center items-center">
            <div class="bg-white p-6  md:mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-danger-400 w-16 h-16 mx-auto my-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>



                <div class="text-center">
                    <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Your payment
                        failed
                    </h3>
                    <p class="text-gray-600 my-2">Dont worry. We'l ry your payment again over the next few
                        days </p>

                    <button onClick={() => { navigate('/category')}}  class="relative mt-5 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Go Back to Home
                        </span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default OrderFailed