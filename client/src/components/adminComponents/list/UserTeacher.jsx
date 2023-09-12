import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2"
import {useNavigate} from 'react-router-dom'
import { blockUnblockUser,  getUsers } from "../../../services/adminApi";
import NavBar from "../navBar/navBar.jsx";
import SideBar from "../sideBar/SideBar.jsx";

const UserTeacher=(props)=> {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
      setIsLoading(true);
        getUsers(props.data)
        .then((res) => {
          console.log(res)
          setUserDetails(res.data);
        })
        .catch((err) => {
          console.log(err)
          if(err.status===false){
            navigate('/admin/login')
          }else{
          toast.error(err.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [props]);

  function blockUser(e){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to block!",
      icon: "warning",
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes!",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        blockUnblock(e)
      }
    })
  }

  function blockUnblock(e){
    setIsLoading(true)
    blockUnblockUser(e).then((res)=>{
      if(res){
        userDetails.map((obj)=>{
          if(obj._id===e.id && obj.block===false){
            obj.block=true
          }else if(obj._id===e.id && obj.block===true){
            obj.block=false
          }
        })
      }
      navigate(`/admin/${e.name}`)
    }).catch((err)=>{
      toast.error(err.message)
    }).finally(()=>{
      setIsLoading(false)
    })
  }


  return (
    <>
    
      <NavBar />

      <SideBar />
      <div
        id="main-content"
        className="h-full  bg-gray-50 relative overflow-y-auto lg:ml-64"
      >
       
            {isLoading ? (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
              <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
                <i className="fas fa-circle-notch fa-spin fa-5x"></i>
              </span>
              </div>
            ) : (
              <>

               <main>
                <div className="pt-20 px-5 ">
                {userDetails?.length === 0 ? (
                  <h1 className="flex justify-center">No user found</h1>
                ) : (
                 <>
                {userDetails[0].role==='teachers' && ( <><div className="flex justify-end my-2"><button type="button" onClick={()=> navigate('/admin/teachers/add')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Add Teacher</button></div>
               
                  </>)}
                  <table className="min-w-full border-collapse block md:table">
                  <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        No.
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Name
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Email Address
                      </th>
                      <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                   { userDetails?.map((value, index) => (
                      
                      <tr
                        key={value?._id}
                        className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                      >
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span className="inline-block w-1/3 md:hidden font-bold">
                            No.
                          </span>
                          {index + 1}
                        </td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span className="inline-block w-1/3 md:hidden font-bold">
                            Name
                          </span>
                          {value?.name}
                        </td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span className="inline-block w-1/3 md:hidden font-bold">
                            Email Address
                          </span>
                          {value?.email}
                        </td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                          <span className="inline-block  w-1/3 md:hidden font-bold">
                            Actions
                          </span>
                         
                          {value.block===false ? <button onClick={()=>blockUser({name:value?.role,id:value?._id})} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mx-2">Block</button> : 
                             <button onClick={()=>blockUnblock({name:value?.role,id:value?._id})} className="bg-green-500 hover:bg-gree-700 text-white font-bold py-1 px-2 border border-green-500 rounded mx-2">UnBlock</button>} 
                            
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </>
                )}
 </div>

              </main>

              </>
            )}
         
        <ToastContainer/>
      </div>
      <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
    </>
  );
}

export default UserTeacher
