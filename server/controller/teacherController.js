import teachers from '../models/teacherSchema.js'
import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import { sendEmail,verifyOTP } from '../helpers/sendMailTeacher.js';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import categories from '../models/categorySchema.js'
import handleUpload from '../middlewares/imageUpload.js';
import Multer from 'multer'
import AWS from 'aws-sdk'
import fs from 'fs'
import dotenv from 'dotenv'
import Course from '../models/courseSchema.js'
import Order from '../models/orderSchema.js'
import mongoose from 'mongoose';
import { S3Upload } from '../middlewares/videoUpload.js';
dotenv.config()


let userDetails;

const maxAge=3*24*60*60
const secretId=process.env.SECRET_KEY
const createToken=(id)=>{
    return jwt.sign({id},secretId,{expiresIn:maxAge})
}

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_S3_BUCKET_REGION
const accessKeyId = process.env.AWS_S3_ACCESS_KEY
const secretAccessKey = process.env.AWS_S3_SECRET_KEY
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region:region
});


const teacherLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email.trim()==="" || password.trim()===''){
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
        res.status(500).json('Something went wrong')
    }
}

const verifyOtp=async (req,res)=>{
    try{
        if(!req.body.otp){
            return res.status(400).json('Fill the otp')
        }else{
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
        }
        
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const teacherSignup=async (req,res)=>{
    try{
        const {email,password,name,phoneNumber}=req.body
        if(req.body.action==='send'){
            if(email.trim()==='' || password.trim()==='' || name.trim()==='' || phoneNumber.trim()===''){
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
            if(!email || !password){
                return res.status(400).json('Fill the complete field')
             }else{
                 const emailExist=await users.findOne({email,role:'teachers'})
                 if(!emailExist){
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
                                res.status(200).json({status:true,teacher:Teacher,teacherId:decoded.id,message:'authorised'})
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
        return res.status(400).json('Something went wrong')
    }
}

const videoUpload=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({status:false,message:'Video not found'})
        }else{
            const file=req.file

            const fileStream=fs.createReadStream(file.path);
    const params = {
        Bucket: bucketName,
        Key: file.originalname,
        // ACL:"public-read-write",   
        Body: fileStream,
    };
    
      s3.upload(params, function (err, data) {
            if (err) {
                throw err
            }
            console.log(`File uploaded successfully. 
                          ${data.Location}`);
            return res.status(200).json({status:true,url:file.originalname,message:'Video uploaded'})
        })
           
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const deleteVideo=async(req,res)=>{
    try{
        const videoUrl=req.query.url
        const params={
            Bucket: bucketName,
            Key:videoUrl,
        }

        s3.deleteObject(params, function (err, data) {
            if (err) {
                throw err
            }
            console.log(`File deleted successfully. 
                          `);
            return res.status(200).json({status:true,message:'Video deleted'})
        })
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}
const verifyTeacherController=async(req,res)=>{
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
                                 if(Teacher.verify===false){
                                    return res.status(400).json('This account is not verified')
                                }else{
                                    res.status(200).json({status:true,teacher:Teacher,teacherId:decoded.id,message:'authorised'})
                                }
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

const replyQuestion=async(req,res)=>{
    try{
        const courseId=req.body.courseId
        const index=req.body.chapterIndex
        const questionIndex=req.body.questionIndex
        const answer=req.body.answer
        if(answer.trim()===''){
            return res.status(400).json('Fill the answer')
        }else{
        const course=await Course.findOne({_id:courseId})
        if(course){
            course.course[index].questionsAndAnswers[questionIndex].answer=answer
            await course.save()
            return res.status(200).json('Reply added successfully')
        }else{
            return res.status(400).json('Reply not added.')
        }
    }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const getAllStudents=async(req,res)=>{
    try{
        const {courseId}=req.params
        const users=await Order.find({course:courseId}).populate('user')
        if(users){
            return res.status(200).json({users:users,message:'success'})
        }else{
            return res.status(400).json('No user Found')
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const getDashboard=async(req,res)=>{
    try{
        const teacherId=new mongoose.Types.ObjectId(req.teacherId)
        const students=await users.find({role:'users'}).count()
        const entrolled=await Order.aggregate([
            {
                $match:{
                    teacher:teacherId
                }
            },
            {
                $lookup:{
                    from:'courses',
                    localField:'course',
                    foreignField:'_id',
                    as:'courseInfo'
                }
            },
            {
                $unwind:'$courseInfo'
                
            },
            {
                $match:{
                    'courseInfo.teacher':teacherId
                }
            },
            {
                $group:{
                    _id:null,
                    studentCount:{$sum:1}
                }
            }
        ])
        
        const entrolledStudents=entrolled[0]?entrolled[0].studentCount:0

        const courses=await Course.find({teacher:teacherId}).count()


        let  revanueDetails = await Order.aggregate([
            {
              $group: {
                _id: { $month: "$purchase_date" },
                total: { $sum: "$total" }
              }
            },
            {
              $project: {
                _id: 0,
                month: "$_id",
                total: 1
              }
            },
            {
              $group: {
                _id: null,
                data: {
                  $push: {
                    $cond: [
                      { $ifNull: ["$total", false] },
                      "$total",
                      0
                    ]
                  }
                },
                months: {
                  $push: "$month"
                }
              }
            },
            {
              $project: {
                _id: null,
                data: {
                  $map: {
                    input: { $range: [1, 13] },
                    as: "m",
                    in: {
                      $cond: [
                        { $in: ["$$m", "$months"] },
                        { $arrayElemAt: ["$data", { $indexOfArray: ["$months", "$$m"] }] },
                        null
                        
                      ]
                    }
                  }
                }
              }
            }
          ]);

        return res.status(200).json({status:true,students,entrolledStudents,courses,revanueDetails:revanueDetails[0].data})

    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}


const reportStudent=async(req,res)=>{
    try{
        const {studentId,reason}=req.body
        const userId=req.userId
        if(reason.trim()===''){
            return res.status(400).json('Fill the Reason')
        }else{
        const Data={
            user:userId,
            reason,
        }
        const update=await users.updateOne({_id:studentId},{$push:{report:Data}})
        if(update){
            return res.status(200).json({status:true,message:'Your report Added'})
        }else{
            return res.status(400).json({status:false,message:'Not submitted'})
        }
    }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}


export {teacherLogin,authTeacher,getCategory,deleteVideo,reportStudent,getDashboard,videoUpload,verifyTeacherController,teacherSignup,getTeacher,getAllStudents,uploadImage,replyQuestion,forgotPassword,editProfile,verifyOtp,resendOtp,googleAuth}