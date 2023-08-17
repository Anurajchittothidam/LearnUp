import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sendEmail, verifyOTP} from '../helpers/otpVerification.js'
import dotenv from 'dotenv'
dotenv.config()

let userDetails;
const maxAge=3*24 * 60 * 60
const secretId=process.env.SECRET_KEY
const createToken=(id)=>{
    return jwt.sign({id},secretId,{expiresIn:maxAge})
}

const userSignup=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        if(email!==null && email!==undefined && password!==null && password!==undefined && username!==undefined && username!==null){
            const userExist=await users.findOne({email})
            if(!userExist){
                sendEmail(email,req).then((response)=>{
                    res.status(200).json("Otp send to the email")
                    userDetails=req.body
                }).catch((err)=>{
                    res.status(400).json("Otp not send")
                })
            }else{
                return res.status(400).json('This email Alredy Exist')
            }
        }else{
           return res.status(400).json('Please provide all required fields')
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}
const verifyOtp=async(req,res)=>{
    try{
        const verified=verifyOTP(req.body.otp)

        if(verified){
            const {username,email,password}=userDetails
            const hash=await bcrypt.hash(password,10)
            const newUser=new users({
                username,
                email,
                password:hash
            })
            newUser.save().then((user)=>{
                return res.status(200).json(user)
            }).catch((err)=>{
                return res.status(400).json(err.message)
            })
       
        }else{
            res.json({status:false,message:"Otp does not match"})
        }
      
               
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}


const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email!==null && email!==undefined && password!==null && password!==undefined){
           const userExist=await users.findOne({email:email,block:false})
           if(userExist){
            const isMatch=await bcrypt.compare(password,userExist.password)
            if(!isMatch){
               res.status(400).json('This password not match')
            }else{
                const token=createToken(userExist._id)
               return res.status(200).json({userExist,token})
            }
           }else{
            res.status(400).json('This user Not Exist')
           }
        }else{
            res.status(500).json('fill the form')
        }
    }catch(err){
        console.log(err)
    }
}

export {userLogin,userSignup,verifyOtp}