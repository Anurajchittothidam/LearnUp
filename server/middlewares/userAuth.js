import user from '../models/userSchema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret=process.env.SECRET_KEY
const verifyUser=async(req,res,next)=>{
    try{
    // getting the token from request headers
    const authHeader=req.headers.authorization
    if(authHeader){
        const token=authHeader.split('')[1]
        jwt.verify(token,secret,async(err,decoded)=>{
            if(err){
                res.json({status:false,message:"Permission not allowed"})
            }else{
                //finding user with decoded id
                const User=user.findById(decoded.id)

                if(User){
                    // if user exist passing the user id with the request
                    req.userId=decoded.id
                    next()
                }else{
                    res.json({status:false,message:"User not exist"})
                }
            }
        })
    }else{
        res.json({status:false,message:"No token found"})
        next()
    }
    }catch(err){
        res.status(200).json('Something went wrong')
    }
}

export default verifyUser