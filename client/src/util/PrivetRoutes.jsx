import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { setTeacherDetails } from '../redux/features/teacherAuth'
import { setUserLogin } from '../redux/features/userAuth'
import { authAdmin } from '../services/adminApi'
import {authTeacher} from '../services/teacherApi'
import { userAuth } from '../services/userApi'

function PrivateRoute(props) {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    const teacher=useSelector((state)=>state.teacher)
    const [isLoading,setIsLoading]=useState(false)
    const [auth,setAuth]=useState(null)
    useEffect(()=>{
        if(props.role==='user'){
            setIsLoading(true)
            userAuth().then((res)=>{
                console.log(res.data)
                dispatch(setUserLogin({...user,status:true}))
                setAuth(true)
            }).catch((response)=>{
                setAuth(false)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.role==='teacher'){
            setIsLoading(true)
            authTeacher().then((res)=>{
                dispatch(setTeacherDetails({...teacher,status:true}))
                console.log(res.data)
                setAuth(true)
            }).catch((response)=>{
                console.log(response)
                setAuth(false)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.role==='admin'){
            setIsLoading(true)
            authAdmin().then((res)=>{
                setAuth(true)
            }).catch((response)=>{
                setAuth(false)
            }).finally(()=>{
                setIsLoading(false)
            })
        }
    },[props.role,teacher,user])
    if(auth===null) return
  return (
    <>
{isLoading ? (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
        </div>
      ) : (
        auth===true?<Outlet/>:<Navigate to={props.route}/>
      )}
    <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
    </>
    )
}

export default PrivateRoute