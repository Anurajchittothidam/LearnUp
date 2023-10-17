import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    total:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true,
    },
    teacher:[{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    }],
    course:[{
        type:mongoose.Types.ObjectId,
        ref:'Course',
        required:true,
    }],
    address:{
        type:Object,
        required:true
    },
    purchase_date:{
        type:Date,
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    }},
       { timestamps:true
    
})

const orderModel=mongoose.model('order',orderSchema)

export default orderModel