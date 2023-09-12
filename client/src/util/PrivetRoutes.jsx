import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { setTeacherDetails } from '../redux/features/teacherAuth'
import { authAdmin } from '../services/adminApi'
import {authTeacher} from '../services/teacherApi'
import { userAuth } from '../services/userApi'

function PrivateRoute(props) {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.teacher)
    const [auth,setAuth]=useState(null)
    useEffect(()=>{
        if(props.role==='user'){
            userAuth().then((res)=>{
                console.log(res.data)
                setAuth(true)
            }).catch((response)=>{
                setAuth(false)
            })
        }else if(props.role==='teacher'){
            authTeacher().then((res)=>{
                
                console.log(user)
                // dispatch(setTeacherDetails(res.data.teacher))
                setAuth(true)
            }).catch((response)=>{
                console.log(response)
                setAuth(false)
            })
        }else if(props.role==='admin'){
            authAdmin().then((res)=>{
                setAuth(true)
            }).catch((response)=>{
                setAuth(false)
            })
        }
    },[props.role,user])
    if(auth===null) return
  return (
    auth?<Outlet/>:<Navigate to={props.route}/>
    )
}

export default PrivateRoute