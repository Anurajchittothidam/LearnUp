import mongoose from 'mongoose'

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    block:{
        type:Boolean,
        default:false
    }
})

const category=mongoose.model('categories',categorySchema)
export default category