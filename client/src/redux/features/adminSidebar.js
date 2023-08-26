import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sidebar:true
}

const adminSidebar=createSlice({
    name:'adminSidebar',
    initialState,
    reducers:{
        setSidebar:(state,action)=>{
            state.sidebar=action.payload
        }
    }
})

export const {setSidebar} =adminSidebar.actions
export default adminSidebar.reducer