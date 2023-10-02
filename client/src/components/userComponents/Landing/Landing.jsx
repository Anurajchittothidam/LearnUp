import React,{useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom'
import {allCourses, userAuth} from '../../../services/userApi'
import Navbar from '../Navbar'

function Landing() {
    const [course,setCourses]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        setIsLoading(true)
        allCourses().then((res)=>{
          if(res.data.block==='true'){

          }else{
            setCourses(res.data.courses)
          }
        }).catch((err)=>{
            toast.error(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])

    function logOut(){
        localStorage.removeItem('JwtToken')
        navigate('/login')
    }

  return (
    <>
<Navbar data={'auth'}/>

<main class="flex flex-col items-center justify-center mt-32">
    

    <section
        class="flex flex-wrap items-center -mx-3 font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20">
        <div class="px-3 w-full lg:w-2/5">
            <div
                class="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
                <h2 class="mb-4 text-4xl font-bold text-left lg:text-4.5xl">
    Unlock the World of Education with

    <span class="text-5xl text-blue-500 leading-relaxed"
        >LearnUp
    </span>

</h2>

<p
    class="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
    Elevating education by connecting passionate teachers with eager learners.
</p>

            </div>

            <div class="text-center lg:text-left">
                <a onClick={()=>navigate('/category')}
                    class="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block"
                    >All Courses</a
                >

               
            </div>
        </div>

        <div class="px-3 mb-12 w-full lg:mb-0 lg:w-3/5">
            <div class="flex justify-center items-center">
                <img className='w-full h-full ' src="/images/banner.png" alt="" />
            </div>
        </div>
    </section>

    <section
        class="flex flex-col w-full h-[560px] bg-cover bg-fixed bg-center flex  "
        style={{backgroundImage: "url(https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&w=880&q=80)"}}>
        <h1 class="text-white text-left text-4xl font-semibold mt-10 mb-10 ps-5">
            Top Courses
        </h1>

<div class="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">


{course.map((result)=>(
        <div className="max-w-sm ms-2 bg-white px-6 pt-4 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      {/* <h3 className="mb-3 text-xl font-bold text-indigo-600">{result?.name}</h3> */}
      <div className="relative">
        <img onClick={()=>navigate(`/course-details/${result._id}`)} style={{width:'330px',height:'140px',objectFit:'cover'}} className="w-full rounded-xl" src={result?.image} alt="Colors" />
        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">$ {result?.price}</p>
      </div>
      <h1 className="mt-4 text-gray-800 text-base font-bold cursor-pointer">{result.name}</h1>
      <div className="my-4">
        <div className="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>{result.name}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <p>{(result?.course).length} Chapters</p>
        </div>
        
        <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">{result.price===0?'Entroll Now ' : 'Purchase Now'}</button>
      </div>
    </div>
    ))}

  


</div>
    </section>

    <section class="flex flex-col w-full h-[550px] bg-cover bg-fixed bg-center flex justify-center  items-center">
    <h1 class="text-dark text-left text-4xl font-semibold mt-10 mb-10 ps-5">
            Top Categories
        </h1>

        <div class="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex justify-center items-center">

<div class="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
  <img class="w-64" src="/images/web-development.png" alt="" />
 <h3 className='text-center'>Web Development</h3>
</div>
<div class="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
  <img class="w-64" src="/images/website-design.png" alt="" />
 <h3 className='text-center'>Web Designing</h3>
</div>
<div class="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
  <img class="w-64" src="/images/video-editing.png" alt="" />
 <h3 className='text-center'>Video Editing</h3>
</div>
<div class="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
  <img class="w-64" src="/images/digital-marketing.png" alt="" />
 <h3 className='text-center'>Digital Marketing</h3>
</div>



</div>
    </section>


    <section class="flex  w-full h-[500px] bg-cover bg-fixed bg-center flex justify-center  items-center">
    <div>
    <img className='w-64 h-64 rounded' src="/images/instructor.png" alt="" />
    </div>
    <div className='pb-10'>
    <h1 class="text-dark text-left text-2xl font-semibold mb-2 ps-20">
            Become an instructor
        </h1>
        <p style={{width:'21rem'}} className=' text-base mb-2 ms-20'>We are providing the tools and skills to teach what you love.Here you have the oppertunity to teach students from any part of the world.</p>
        <a onClick={()=>navigate('/teachers/login')}
                    class="block ms-20 visible py-4 px-8 mb-2 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block"
                    >Start teaching today</a
                >
    </div>



    </section>

    
</main>

<footer class="bg-gray-800 pt-10 sm:mt-10 pt-10 w-full">
    <div class="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
        <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            <div class="text-xs uppercase text-gray-400 font-medium mb-6">
               Learn Up
            </div>
 
        </div>

        <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
        <div class="text-xs uppercase text-gray-400 font-medium mb-6">
                Get Start
            </div>

            <a
                onClick={()=>navigate('/login')}
                class="cursor-pointer my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Login
            </a>
            <a
                onClick={()=>navigate('/signup')}
                class="cursor-pointer my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Signup
            </a>
            <a
                onClick={()=>navigate('/teachers/login')}
                class="cursor-pointer my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Login as Teacher
            </a>
        </div>

      

        <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            <div class="text-xs uppercase text-gray-400 font-medium mb-6">
                Resourses
            </div>

            <a
                onClick={()=>navigate('/')}
                class="cursor-pointer my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                LearnUp
            </a>
            <a
                onClick={()=>navigate('/category')}
                class="cursor-pointer my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Courses
            </a>
            
        </div>

        

        <div class="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            <div class="text-xs uppercase text-gray-400 font-medium mb-6">
                Community
            </div>

            <a
                href='https://github.com/Anurajchittothidam'
                class="cursor-pointer my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                GitHub
            </a>
            <a
                href="#"
                class="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Discord
            </a>
            
        </div>
    </div>

    <div class="pt-2">
        <div
            class="flex pb-5 px-3 m-auto pt-5 border-t border-gray-500 text-gray-400 text-sm flex-col md:flex-row max-w-6xl">
            <div class="mt-2">© Copyright 2023-year. All Rights Reserved.</div>

           
        </div>
    </div>
</footer>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;1,100;1,200&display=swap"
    rel="stylesheet" />

    </>
  )
}

export default Landing