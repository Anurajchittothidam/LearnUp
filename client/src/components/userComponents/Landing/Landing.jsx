import React,{useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import {userAuth} from '../../../services/userApi'

function Landing() {
    const navigate=useNavigate()
    useEffect(()=>{
        userAuth().then((res)=>{
            if(res){
                console.log('res',res)
            }else{
                navigate('/login')
            }
        }).catch((err)=>{
            console.log('err',err)
            navigate('/login')
        })
    })

    function logOut(){
        localStorage.removeItem('JwtToken')
        navigate('/login')
    }

  return (
    <>
    <div>Landing</div>
    <button onClick={logOut}>LogOut</button>
    </>
  )
}

export default Landing