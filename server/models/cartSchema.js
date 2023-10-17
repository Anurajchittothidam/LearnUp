import mongoose from 'mongoose'

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:'Course',
        required:true
    }
})

const cartModel=mongoose.model('cart',cartSchema)
export default cartModel