import { createSlice } from "@reduxjs/toolkit";

const initialState=({
    email:'',
    login:'',
    token:''
})


const adminAuth=createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAdminDetails:(state,action)=>{
            state.email=action.payload.email,
            state.login=action.payload.login,
            state.token=action.payload.token
        },
        setAdminSignOut:(state,action)=>{
            state.email=null,
            state.token=null,
            state.login=null
        }
    }
})

export const {setAdminDetails,setAdminSignOut}=adminAuth.actions

export default adminAuth.reducer