import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { userEditProfile,getUser } from '../../services/userApi'
import Navbar from './Navbar'

function EditProfile() {
    const [isLoading,setIsLoading]=useState()
    const user=useSelector((state)=>state.user)
    const id=user?.id
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        phoneNumber:'',
        about:'',
        place:'',
        id:'',
        token:'',
        picture:'',
        role:'user'
    })

    useEffect(()=>{
        getUser().then((res)=>{
            setFormData({
                name:res?.data?.name,
                about:res?.data?.about,
                email:res?.data?.email,
                place:res?.data?.place,
                id:res?.data?._id,
                picture:res?.data?.picture,
                phoneNumber:res?.data?.phoneNumber,
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
        userEditProfile(formData).then((res)=>{
            if(res.data){
                navigate('/profile')
            }
           
        }).catch((err)=>{
          toast.error(err)
        }).finally(()=>{
          setIsLoading(false)
        })
      }
    }
  return (
    <div className="min-h-screen">
    <Navbar />
    <div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center  py-10">
    <div id="main-content" class="h-full w-3/6 bg-gray-50 relative overflow-y-auto py-10">
      {isLoading?(
           <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
           <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
             <i className="fas fa-circle-notch fa-spin fa-5x"></i>
           </span>
           </div>
      ):(
//    <main>
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
    //   </main>
      )}
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default EditProfile