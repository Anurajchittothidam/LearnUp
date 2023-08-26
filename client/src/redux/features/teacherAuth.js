import {createSlice} from '@reduxjs/toolkit'

const initialState=({
    id:'',
    token:'',
    login:'',
    email:'',
    name:'',
})

const teacherAuth=createSlice({
    name:'teacher',
    initialState,
    reducers:{
        setTeacherDetails:(state,action)=>{
            state.id=action.payload.id,
            state.name=action.payload.name,
            state.email=action.payload.email,
            state.token=action.payload.token
        },
        setTeacherSignOut:(state,action)=>{
            state.token=null,
            state.email=null,
            state.name=null,
            state.id=null
        }
    }
})

export const {setTeacherDetails,setTeacherSignOut} =teacherAuth.actions
export default teacherAuth.reducer