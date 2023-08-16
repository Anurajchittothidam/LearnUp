import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    block:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'student'
    }
})

const userModel=mongoose.model('users',userSchema)
export default userModel