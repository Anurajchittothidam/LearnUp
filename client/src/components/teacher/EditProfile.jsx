import React,{useEffect, useState} from  'react'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getTeacher, teacherEditProfile} from '../../services/teacherApi';
import { useSelector } from 'react-redux';
import Navbar from './teacherNav/Navbar';
import Sidebar from './teacherSideBar/Sidebar';

function EditProfile() {
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const user=useSelector((state)=>state.teacher)
    const id=user?.id
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        phoneNumber:'',
        about:'',
        place:'',
        id:'',
        role:'teacher'
    })
 
    useEffect(()=>{
        getTeacher(id).then((res)=>{
            const {name,email,about,phoneNumber,place}=res?.data?.teacher
            setFormData({
                name:name,
                about:about,
                email:email,
                place:place,
                id:id,
                phoneNumber:phoneNumber,
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    function validate(formData){
      if(formData.name.trim()!==""){
        if(formData.email.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          if(formData.phoneNumber.trim().match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
            if(formData.about.trim()!==""){
              if(formData.place.trim()!==""){
               return true
              }else{
               toast.error('Enter the place')
              }
            }else{
             toast.error('Enter something about you')
            }
          }else{
           toast.error('Phone number is not valid')
          }
        }else{
         toast.error('Email required')
        }
      }else{
       toast.error('Name required')
      }
      return false
    }

    function changeInput(e){
        const {name,value}=e.target
        setFormData((prevstate)=>({
            ...prevstate,
            [name]:value
        }))
    }

    function handleSubmit(e){
      e.preventDefault()
      if(validate(formData)){
        setIsLoading(true)
        teacherEditProfile(formData).then((res)=>{
            navigate('/teachers/profile')
        }).catch((err)=>{
          toast.error(err.response.data)
        }).finally(()=>{
          setIsLoading(false)
        })
      }
    }

  return (

    <>
 <div>
 <Navbar/>
  <div class="flex overflow-hidden bg-white pt-16">
     <Sidebar/>
     <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
      {isLoading?(
           <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
           <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
             <i className="fas fa-circle-notch fa-spin fa-5x"></i>
           </span>
           </div>
      ):(
   <main>
   <div class="pt-6 px-4 flex flex-col items-center">
        <div className="w-full flex  flex-col  justify-center  space-y-2 max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Edit Profile</h2>
          </div>
          <div className="flex flex-col max-w-md space-y-2">
            <form onSubmit={handleSubmit} className="flex flex-col max-w-md space-y-2">
                <label htmlFor="">Name</label>
            <input type="text" placeholder="Username" name='name' onChange={changeInput} value={formData?.name}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" /> 
                <label htmlFor="">Email</label>
              <input type="email" placeholder="Email" name='email' onChange={changeInput} value={formData?.email}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" /> 
                <label htmlFor="">Phone Number</label>
              <input type="text" placeholder="PhoneNumber" name='phoneNumber' onChange={changeInput} value={formData?.phoneNumber}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" /> 
             <label htmlFor="">Place</label>
              <input type="text" placeholder="Place" name='place' onChange={changeInput} value={formData?.place}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" /> 
                <label htmlFor="">About</label>
              <input type="text" placeholder="About you" name='about' onChange={changeInput} value={formData?.about}
              className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
            <button type='submit' className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Submit</button>
            </form>
          </div>
        </div>

      </div>
      </main>)}
    </div>
  </div>
</div>
<ToastContainer/>
<link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
</>

  )
}

export default EditProfile