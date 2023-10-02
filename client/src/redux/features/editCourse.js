import { createSlice } from "@reduxjs/toolkit";

const initialState={
    
}

export const courseDetails=createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourseDetails:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {setCourseDetails} =courseDetails.actions
export default courseDetails.reducer