import {createSlice} from '@reduxjs/toolkit'


export const userAuth=createSlice({
    name:'user',
    initialState:{
        name:'',
        id:'',
        email:'',
        token:'',
        image:'',
        login:false
    },
    reducers:{
        setUserLogin:(state,action)=>{
            console.log('setUserLogin',action.payload)
            state.email=action.payload.email,
            state.name=action.payload.name,
            state.id=action.payload._id?action.payload._id:action.payload.id,
            state.token=action.payload.token,
            state.image=action.payload.image,
            state.login=true
        },
        setUserSignOut:(state,action)=>{
            state.email=null,
            state.name=null,
            state.id=null,
            state.token=null,
            state.image=null,
            state.login=false
        }
    }
})

console.log('user',userAuth)

export const {setUserLogin,setUserSignOut} =userAuth.actions
export default userAuth.reducer