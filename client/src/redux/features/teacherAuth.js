import {createSlice} from '@reduxjs/toolkit'



export const teacherAuth=createSlice({
    name:'teacher',
    initialState:{
        id:'',
        token:'',
        login:'',
        time:'',
    },
    reducers:{
        setOtp:(state,action)=>{
            state.time=action.payload.time
        },
        setTeacherDetails:(state,action)=>{
            const {id,token,status}=action.payload
            state.id=id,
            state.token=token
            state.login=status
        },
        setTeacherSignOut:(state,action)=>{
            state.token=null,
            state.id=null
            state.login=false
        }
    }
})

export const {setTeacherDetails,setTeacherSignOut} =teacherAuth.actions
export default teacherAuth.reducer