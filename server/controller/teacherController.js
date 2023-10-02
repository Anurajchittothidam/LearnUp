import teachers from '../models/teacherSchema.js'
import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import { sendEmail,verifyOTP } from '../helpers/sendMailTeacher.js';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import categories from '../models/categorySchema.js'
import handleUpload from '../middlewares/imageUpload.js';
import Multer from 'multer'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()

let userDetails;

const maxAge=3*24*60*60
const secretId=process.env.SECRET_KEY
const createToken=(id)=>{
    return jwt.sign({id},secretId,{expiresIn:maxAge})
}

const teacherLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json('Fill all the fields')
        }else{
            const teacherExist=await users.findOne({email,role:'teachers'})
            const teacherBlock=await users.findOne({email,role:'teachers',block:true})
            if(!teacherExist){
                return res.status(400).json('This email not exist')
            }else{
                if(!teacherBlock){
                const isMatch=await bcrypt.compare(password,teacherExist.password)
                if(!isMatch){
                    return res.status(400).json('Incorrect password')
                }else{
                    const token=createToken(teacherExist._id)
                    return res.status(200).json({id:teacherExist._id,token:token})
                }
                }else{
                    return res.status(400).json('This accound blocked')
                }
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json('Something went wrong')
    }
}

const verifyOtp=async (req,res)=>{
    try{
        const verified=verifyOTP(req.body.otp)
        if(verified){
        const {email,password,phoneNumber,name}=userDetails
                const hash=await bcrypt.hash(password,10)
                const newTeacher=new users({
                    name,
                    email,
                    phoneNumber,
                    password:hash,
                    role:'teachers'
                })
                newTeacher.save().then((teacher)=>{
                    return res.status(200).json(teacher)
                }).catch((err)=>{
                    return res.status(400).json(err.message)
                })
        }else{
            return res.status(400).json('Otp does not match')
        }
        
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const teacherSignup=async (req,res)=>{
    try{
        const {email,password,name,phoneNumber}=req.body
        if(req.body.action==='send'){
            if(!email || !password || !name || !phoneNumber){
                return res.status(400).json('fill the complete field')
            }else{
                const emailExist=await users.findOne({email,role:'teachers'})
                if(!emailExist){
                   sendEmail(email).then((response)=>{
                    res.status(200).json({message:'Otp send to the email',status:true})
                    userDetails=req.body
                   }).catch((err)=>{
                    res.status(400).json({status:false,message:'Otp not sent to the email'})
                   })
                }else{
                    return res.status(400).json('This email alredy exist')
                }
            }
        }else if(req.body.action==='verify'){
            if(!req.body.otp){
                return res.status(400).json('Fill the Otp')
            }else{
                verifyOTP(req.body.otp).then(async(result)=>{
                    if(result){
                        const {email,password,name,phoneNumber}=userDetails
                        const hash=await bcrypt.hash(password,10)
                        const newTeacher=new users({
                            name,
                            email,
                            password:hash,
                            phoneNumber,
                            role:'teachers'
                        })
                        newTeacher.save().then((teacher)=>{
                           return res.status(200).json({teacher,status:true})
                        }).catch((err)=>{
                           return res.status(400).json(err.message)
                        })
                    }else{
                        return res.status(400).json({status:false,message:'Invalid Otp'})
                    }
                }).catch((err)=>{
                    return res.status(400).json({status:false,message:'OTP not verified'})
                })
            }
        }else{
            return res.status(400).json('Something wrong with action')
        }
        
    }catch(err){
        res.status(400).json('Something went wrong')
    }
}

const editProfile=async(req,res)=>{
    try{
        const {id,email,name,phoneNumber,about,place}=req.body
        if(!email || !name || !phoneNumber || !about || !place){
            return res.status(400).json('Enter the complete fields')
        }else{
            const emailExist=await users.findOne({email,role:'teachers'})
            if(!emailExist){
                const updated=await users.updateOne({_id:id},{$set:{email,name,phoneNumber,about,place}})
                return res.status(200).json(updated)
            }else if(emailExist._id.toString()===id){
                const updated=await users.updateOne({_id:id},{$set:{email,name,phoneNumber,about,place}})
                return res.status(200).json(updated)
            }else{
                return res.status(400).json('This email alredy exist')
            }
        }
    }catch(err){
        return res.status(500).json('Something went wrong')
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
                 const emailExist=await users.findOne({email,role:'teachers'})
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
                if(result.status===true){
                    const {email,password}=userDetails
                    const hash=await bcrypt.hash(password,10)
                    users.updateOne({email,role:'teachers'},{$set:{password:hash}}).then((result)=>{
                        if(result){
                            res.status(200).json('Password Changed')
                        }else{
                            res.status(400).json('Teacher not found')
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
        res.status(400).json({message:'Something went wrong',err})
    }
}


const googleAuth=(req,res)=>{
    try{
        if(req.body.access_token){
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`).then(async(result)=>{
                const userExist=await users.findOne({googleId:result.data.id,loginWithGoogle:true,role:'teachers'},{password:0}).catch((err)=>{
                    return res.status(500).json('Internal server error')
                })
                if(userExist){
                    if(userExist.block===true){
                        return res.status(400).json("Sorry you are banned...")
                    }else{
                        const token=createToken(userExist._id)
                        return res.status(200).json({token:token,id:userExist._id,message:'Login Success'})
                    }
                }else{
                    const newUser=await users.create({
                        googleId:result.data.id,
                        name:result.data.given_name,
                        email:result.data.email,
                        loginWithGoogle:true,
                        role:'teachers',
                        picture:result.data.picture,
                        password:result.data.id
                    })
                    const token=createToken(newUser._id)
                    return res.status(200).json({token:token,id:newUser._id,message:'Signup Success'})
                }
            })
        }else{
            return res.status(400).json('Some error occured with google Authentication')
        }
    }catch(err){
        console.log(err)
        return res.status(400).json('Something went wrong')
    }
}

const authTeacher=(req,res)=>{
    try{
        const secret=process.env.SECRET_KEY
                const authHeader=req.headers.authorization
            if(authHeader){
                const token=authHeader.split(' ')[1]
                jwt.verify(token,secret,async(err,decoded)=>{
                    if(err){
                       return res.status(400).json({status:false,message:"Permission not allowed",err})
                    }else{
                        //finding teacher with decoded id
                        const Teacher=await users.findById(decoded.id)
                        if(Teacher){
                            if(Teacher.block===true){
                               return res.status(400).json({status:false,message:"Your accound blocked"})
                            }else{
                                 // if user exist passing the user id with the request
                                res.status(200).json({status:true,teacher:Teacher,message:'authorised'})
                                req.teacherId=decoded.id
                            }
                        }else{
                           return res.status(400).json({status:false,message:"Teacher not exist"})
                        }
                    }
                })
            }else{
               return res.status(400).json({status:false,message:"No token found"})
            }
            }catch(err){
                return res.status(400).json('Something went wrong')
            }
}

const getCategory=async(req,res)=>{
    try{
        const category=await categories.find({block:false})
        return res.status(200).json({category:category,message:'success'})
    }catch(err){
        console.log(err)
        return res.status(400).json('Something went wrong')
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

const getAllUsers=async (req,res)=>{
    try{
        const userList=await users.find()
        return res.status(200).json(userList)
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const getTeacher=async(req,res)=>{
    try{
        const id=new mongoose.Types.ObjectId(req.body)
        const teacher=await users.findOne({_id:id})
        if(teacher){
            return res.status(200).json({teacher})
        }else{
            return res.status(400).json('Teacher not found')
        }
    }catch(err){
        console.log(err)
        return res.status(400).json('Something went wrong')
    }
}

const uploadImage=async(req,res)=>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        const {id}=req.body
        const url=cldRes.url
        const imageUpdated=await users.updateOne({_id:id},{$set:{picture:url}})
        if(imageUpdated){
            res.status(200).json({image:cldRes})
        }else{
            res.status(400).json('image not uploaded in the database')
        }
    }catch(err){
        console.log(err)
        return res.status(400).json('Something went wrong')
    }
}




export {teacherLogin,authTeacher,getCategory,teacherSignup,getTeacher,getAllUsers,uploadImage,forgotPassword,editProfile,verifyOtp,resendOtp,googleAuth}