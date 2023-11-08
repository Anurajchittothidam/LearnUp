import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { getTeacher, imageUpload } from '../../services/teacherApi'
import { toast } from 'react-toastify'
import Sidebar from './teacherSideBar/Sidebar'
import Navbar from './teacherNav/Navbar'

function Profile() {
    const navigate=useNavigate()
    const [image,setImage]=useState('')
    const [imageSrc,setImageSrc]=useState('')
    const baseImgUrl = "http://localhost:8000/"
    const [userData,setUserData]=useState({
        name:'',
        about:'',
        email:'',
        phoneNumber:'',
        picture:''
    })

    const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  
    const user=useSelector((state)=>state.teacher)
    const id=user?.id
    useEffect(()=>{
        getTeacher(id).then((res)=>{
            const {name,email,about,phoneNumber,picture,place}=res?.data?.teacher
            setUserData({
                name:name,
                about:about,
                email:email,
                place:place,
                phoneNumber:phoneNumber,
                picture:picture,
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[id])



    const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async (e) => {
    try {
      setLoading(true);
      const data = new FormData();
       data.append('id',id)
      data.append("my_file", file);
      imageUpload(data).then((res)=>{
        setUserData({
            ...userData,
            picture: res?.data?.image?.url
          });
          
        setFile(null)
      }).catch((err)=>{
        toast.error(err)
      }).finally(()=>{
        setLoading(false)
      })
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
     <div>
   <Navbar/>
   <div class="flex overflow-hidden bg-white pt-16">
      <Sidebar/>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
         <main>
            <div class="pt-6 px-4">
<div className="bg-gray-100">
 <div className="w-full text-white bg-main-color">
       

    <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
                 <div className="bg-white p-3 border-t-4 border-green-400"> 
                    

<div className="relative group inline-block">
{isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
        </div>
      ) : (<>
  <img
    src={
      file
        ? URL.createObjectURL(file)
        : userData?.picture
        ? userData?.picture
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    }
    alt=""
    className="w-64 h-full object-cover rounded-lg"
  />
  <div className="absolute inset-0 flex items-end justify-end">
    <div className="relative">
    {file?(
        <>
        <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 m-2 transition-opacity duration-300 opacity-100">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    style={{
      margin: '10% auto'
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
</button>
<button onClick={()=>setFile(null)} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 m-2 transition-opacity duration-300 opacity-100">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    style={{
      margin: '10% auto'
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

        </>
    ):(<>
<button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 m-2 transition-opacity duration-300 opacity-100">
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
  />
</svg>
</button>
<input
type="file"
onChange={(e) => {
    handleSelectFile(e);
  }}
name="my_file"
placeholder="Your Input"
className="absolute inset-0 p-2 bg-gray-100 rounded-md opacity-0 transition-opacity duration-300  focus:outline-none"
/></>
    )}
      
    </div>
  </div>
    </>)}
</div> 



                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userData?.name}</h1>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{userData?.about}</p>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Member since</span>
                            <span className="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
                </div>
                <div className="my-4"></div>
                
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Full Name</div>
                                <div className="px-4 py-2">{userData?.name}</div>
                            </div>
                            
                            
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">{userData?.phoneNumber}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Place</div>
                                <div className="px-4 py-2">{userData?.place}</div>
                            </div>
                            
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">{userData?.email}</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <button onClick={()=>navigate('/teachers/editProfile')}
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                        Edit Information</button>
                </div>

                {/* <div className="my-4"></div>

                <div className="bg-white p-3 shadow-sm rounded-sm">

                    <div className="grid grid-cols-2">
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Experience</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Education</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Masters Degree in Oxford</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
</div>
</div>
</div>
</main>
</div>
</div>
</div>
<link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
</>
  )
}

export default Profile