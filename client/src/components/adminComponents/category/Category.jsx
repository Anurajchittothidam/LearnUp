import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { editCategory } from "../../../services/adminApi";
import {
  addCategories,
  blockUnblockCategory,
  getCategories,
} from "../../../services/adminApi";
import NavBar from "../navBar/navBar.jsx";
import SideBar from "../sideBar/SideBar.jsx";

function Category() {
  const [categories, setCategories] = useState([]);
  const [category,setCategory]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [addCategoryPopUp, setAddCategoryPopUp] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        if(err.status===false){
          navigate('/admin/login')
        }else{
        toast.error(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[addCategoryPopUp]);

  function blockCategory(e) {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to block!",
      icon: "warning",
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes!",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        blockUnblock(e);
      }
    });
  }

  function blockUnblock(e) {
    setIsLoading(true);
    blockUnblockCategory(e)
      .then((res) => {
        if (res) {
          categories.map((obj) => {
            if (obj._id === e && obj.block === false) {
              obj.block = true;
            } else if (obj._id === e && obj.block === true) {
              obj.block = false;
            }
          });
        }
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function addCategory(e){
    setIsLoading(true)
    addCategories(e).then((res)=>{
      console.log(res)
      toast.success(res.message)
      setAddCategoryPopUp(false)
      // navigate('/admin/categories')
    }).catch((err)=>{
      toast.error(err)
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  function editCategories(e){
    setIsLoading(true)
    editCategory(e).then((res)=>{
      categories.map((obj)=>{
        if(obj._id===e.id){
          obj.name=e.name
        }
      })
    }).catch((err)=>{
      toast.error(err)
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
        <main>
          <div className="pt-20 px-5 ">
            {isLoading ? (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                  <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
              </div>
            ) : (
              <>
                
                    <div className="flex justify-end my-2">
                      <button
                        type="button"
                        onClick={() => setAddCategoryPopUp(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add Categories
                      </button>
                    </div>

                    {addCategoryPopUp && (
                      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white rounded p-6 w-1/2 ">
                          <div className="flex justify-end">
                          <button
                            type="button"
                            className=" box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            onClick={() => setAddCategoryPopUp(false)}
                            aria-label="Close"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          </div>
                          <h2 className="text-lg font-semibold mb-4">
                            Add Category
                          </h2>
                          <p className="mb-4">
                            Enter the Category Name.
                          </p>
                          <input type="text" className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setCategory(e.target.value)} />
                         <div className="flex justify-end ">
                         <button
                          type="button"
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setAddCategoryPopUp(false)}
                          >
                            Close
                          </button>
                          <button
                          type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  ms-2"
                            onClick={()=>addCategory(category)}
                          >
                            Save
                          </button>
                         </div>
                        </div>
                      </div>
                    )}
                    {categories?.length === 0 ? (
                  <h1 className="flex justify-center">No Categories found</h1>
                     ) : (
                      <>
                    <div className={addCategoryPopUp ? "hidden" : "block"}>
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
                            Edit Category
                          </th>
                          <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="block md:table-row-group">
                        {categories?.map((value, index) => (
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
                              <span className="flex inline-block w-1/3 md:hidden font-bold">
                                <input
                                  type="text"
                                  className=" me-2 rounded"
                                  onChange={(e)=>setCategory(e.target.value)}
                                />
                                <button onClick={()=>editCategories({id:value?._id,name:category})} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                  Edit
                                </button>
                              </span>
                              <div className="flex hidden md:block">
                                <input
                                  type="text"
                                  className="p-2 mx-2 rounded"
                                  onChange={(e)=>setCategory(e.target.value)}
                                  placeholder={value?.name}
                                />
                                <button onClick={()=>editCategories({id:value?._id,name:category})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                  Edit
                                </button>
                              </div>
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span className="inline-block  w-1/3 md:hidden font-bold">
                                Actions
                              </span>

                              {value.block === false ? (
                                <button
                                  onClick={() => blockCategory(value?._id)}
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mx-2"
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  onClick={() => blockUnblock(value?._id)}
                                  className="bg-green-500 hover:bg-gree-700 text-white font-bold py-1 px-2 border border-green-500 rounded mx-2"
                                >
                                  UnBlock
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
        <ToastContainer />
      </div>
      <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
    <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous"/>
    </>
  );
}

export default Category
