import teachers from '../models/teacherSchema.js'
import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import { sendEmail,verifyOTP } from '../helpers/sendMailTeacher.js';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import dotenv from 'dotenv'
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
                    return res.status(200).json({teacherExist,token})
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
        const {id,email,name,phoneNumber,about}=req.body
        if(!email || !name || !phoneNumber || !about){
            return res.status(400).json('Enter the complete fields')
        }else{
            const emailExist=await users.findOne({email,role:'teachers'})
            // const teacher=await users.findOne({_id:id})
            if(!emailExist){
                const updated=await teachers.updateOne({_id:id},{$set:{email,name,phoneNumber,about}})
                return res.status(200).json(updated)
            }else if(emailExist.email===email){
                const updated=await teachers.updateOne({_id:id},{$set:{email,name,phoneNumber,about}})
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
        res.status(400).json('Something went wrong')
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
                        return res.status(200).json({token,userExist,message:'Login Success'})
                    }
                }else{
                    const newUser=users.create({
                        googleId:result.data.id,
                        name:result.data.given_name,
                        email:result.data.email,
                        loginWithGoogle:true,
                        role:'teachers',
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
export {teacherLogin,teacherSignup,getAllUsers,forgotPassword,editProfile,verifyOtp,resendOtp,googleAuth}