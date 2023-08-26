import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sendEmail, verifyOTP} from '../helpers/otpVerification.js'
import axios from 'axios'
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
        const {name,email,password}=req.body
        if(req.body.action==='send'){
            if(!email||  !password|| !name){
               return res.status(400).json('Please provide all required fields')
            }else{
                const userExist=await users.findOne({email,role:'users'})
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
            }
        }else if(req.body.action==='verify'){
            if(!req.body.otp){
               return res.status(400).json('Fill the Otp')
            }else{
            verifyOTP(req.body.otp).then(async(result)=>{
                if(result){
                    const {name,email,password}=userDetails
                    const hash=await bcrypt.hash(password,10)
                    const newUser=new users({
                        name,
                        email,
                        password:hash
                    })
                    newUser.save().then((user)=>{
                        return res.status(200).json(user)
                    }).catch((err)=>{
                        return res.status(400).json(err.message)
                    })
                }else{
                    return res.status(400).json({status:false,message:'Invalid Otp'})
                }
            }).catch((err)=>{
                return res.status(400).json({staus:flase,message:'The Otp not matching'})
            })
            }
        }else{
            res.status(400).json('Someting went wrong with the action')
        }
        
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const resendOtp=(req,res)=>{
    try{
        if(!userDetails){
            return res.status(400).json('User Details not found')
        }else{
            const {email}=userDetails
            if(!email){
                return res.status(400).json('Email not found')
            }else{
                sendEmail(email).then((result)=>{
                    return res.status(200).json('Otp send the the email')
                }).catch((err)=>{
                    return res.status(400).json('Otp not send to the email')
                })
            }
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const googleAuth=(req,res)=>{
    try{
        if(req.body.access_token){
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`).then(async(result)=>{
                const userExist=await users.findOne({googleId:result.data.id,loginWithGoogle:true,role:'users'},{password:0}).catch((err)=>{
                    return res.status(500).json('Internal server error')
                })
                if(userExist){
                    if(userExist.block===true){
                        return res.status(400).json("Sorry you are banned...")
                    }else{
                        const token=createToken(userExist._id)
                        return res.status(200).json({token,userExist,message:'Login Success'})
                    }
                }else{
                    const newUser=users.create({
                        googleId:result.data.id,
                        name:result.data.given_name,
                        email:result.data.email,
                        loginWithGoogle:true,
                        role:'users',
                        picture:result.data.picture,
                        password:result.data.id
                    })
                    const token=createToken(newUser._id)
                    return res.status(200).json({token,newUser,message:'Signup Success'})
                }
            })
        }else{
            return res.status(400).json('Some error occured with google Authentication')
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}



const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || email==undefined || !password || password==undefined){
            res.status(400).json('fill the form')
        }else{
            const userExist=await users.findOne({email:email,role:'users'})
            if(userExist){
                const userBlock=await users.findOne({email,block:true,role:'users'})
                if(!userBlock){
             const isMatch=await bcrypt.compare(password,userExist.password)
             if(!isMatch){
                res.status(400).json('This password not match')
             }else{
                 const token=createToken(userExist._id)
                return res.status(200).json({userExist,token})
             }
            }else{
                res.status(400).json('This account blocked')
            }
            }else{
             res.status(400).json('This user Not Exist')
            }
        }
    }catch(err){
        console.log(err)
    }
}

const forgotPassword=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(req.body.action==='send'){
            console.log('send')
            if(!email || !password){
                return res.status(400).json('Fill the complete field')
             }else{
                 const emailExist=await users.findOne({email,role:'users'})
                 if(!emailExist){
                    console.log('dfsdf')
                     return res.status(400).json('This email not exist')
                 }else{
                     sendEmail(email).then((result)=>{
                         userDetails=req.body
                        return res.status(200).json('Otp send to the email')
                     }).catch((err)=>{
                         return res.status(400).json("Otp not send to the email")
                     })
                     
                 }
             }
        }else if(req.body.action==='verify'){
            console.log('verify')
            if(!req.body.otp){
                return res.status(400).json('Enter the otp')
            }else{
            verifyOTP(req.body.otp).then(async(result)=>{
                console.log(result)
                if(result){
                    const {email,password}=userDetails
                    const hash=await bcrypt.hash(password,10)
                    users.updateOne({email,role:'users'},{$set:{password:hash}}).then((result)=>{
                        if(result){
                            res.status(200).json('Password Changed')
                        }else{
                            res.status(400).json('User not found')
                        }
                    }).catch((err)=>{
                        res.status(400).json(err.message)
                    })
                }else{
                    return res.status(400).json({status:false,message:'Invalid Otp'})
                }
            }).catch((err)=>{
                return res.status(400).json({status:false,message:'Otp does not match'})
            })
            }
        }else{
            res.status(400).json('Some error Occured')
        }
    }catch(err){
        res.status(400).json('Something went wrong')
    }
}

export {userLogin,userSignup,forgotPassword,resendOtp,googleAuth}