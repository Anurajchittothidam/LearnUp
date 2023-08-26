import {createSlice} from '@reduxjs/toolkit'


export const userAuth=createSlice({
    name:'user',
    initialState:{
        name:'',
        id:'',
        email:'',
        token:'',
        image:''
    },
    reducers:{
        setUserDetails:(state,action)=>{
            state.email=action.payload.email,
            state.name=action.payload.name,
            state.id=action.payload.id,
            state.token=action.payload.token,
            state.image=action.payload.image
        },
        setUserSignOut:(state,action)=>{
            state.email=null,
            state.name=null,
            state.id=null,
            state.token=null,
            state.image=null
        }
    }
})

export const {setUserDetails,setUserSignOut} =userAuth.actions
export default userAuth.reducer