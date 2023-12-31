import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
    },
    about:{
        type:String,
    },
    place:{
        type:String,
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
        default:'users'
    },
    googleId:{
        type:String,
        allowNull:true
    },
    loginWithGoogle:{
        type:Boolean,
        default:false
    },
    picture:{
        type:String
    },
    verify:{
        type:Boolean,
        default:false,
    },
    report:[
        {
        user:{
            type:mongoose.Types.ObjectId,
            ref:'users',
            required:true,
        },
        reason:{
            type:String,
            required:true,
        }
        }
    ],
},{
    timestamps:true
})

const userModel=mongoose.model('users',userSchema)
export default userModel