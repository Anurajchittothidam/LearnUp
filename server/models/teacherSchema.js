import mongoose from "mongoose";

const teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    about:{
        type:String,
    },
    block:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    }
})

const teacher=mongoose.model('teachers',teacherSchema)
export default teacher