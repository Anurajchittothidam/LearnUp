import users from '../models/userSchema.js'
import categories from '../models/categorySchema.js'
import Course from '../models/courseSchema.js'
import jwt from 'jsonwebtoken'
import course from '../models/courseSchema.js'
import Order from '../models/orderSchema.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { sendEmail, verifyOTP } from '../helpers/sendMailTeacher.js'
import mongoose from 'mongoose'
dotenv.config()

const adminLogin=async (req,res)=>{
    try{
        const {email,password}=req.body
        const maxAge=2*24*60*60
        const secretId=process.env.SECRET_KEY
        if(email!==null && email!==undefined && password!==null && password!==undefined){
            if(email===process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASS){
               const token=jwt.sign({email},secretId,{expiresIn:maxAge}) 
               res.cookie("jwt" , token , {
                withCredentials: true,
                httpOnly : false ,
                maxAge: maxAge *1000
          
              })
               return res.status(200).json({message:'Login Successfull',token,login:true,email})
            }else{
               return res.status(400).json('Invalid credentials')
            }
        }else{
           return res.status(400).json('Fill the form')
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const authAdmin=async(req,res)=>{
    try{
    const secretId=process.env.SECRET_KEY
    const authHeader=req.headers.authorization
    if(authHeader){
        const token=authHeader.split(' ')[1]
        jwt.verify(token,secretId,async (err,decoded)=>{
            if(err){
                res.status(400).json({status:false,message:'Permission denied',err})
            }else{
                const admin=process.env.ADMIN_EMAIL===decoded.email
                if(admin){
                    res.status(200).json({stus:true,message:'authorized'})
                }else{
                    res.status(400).json({status:false,message:"no admin found"})
                }
            }
        })
    }else{
        res.status(400).json({status:false,message:"Token not found"})
        next()
    }
    }catch(err){
    res.status(400).json('Something went wrong')
    }
}

const getAllUsers=async (req,res)=>{
    try{
        const userList=await users.find({role:'users'})
        if(!userList){
          return  res.status(400).json('No users found')
        }else{
            return res.status(200).json(userList)
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const blockUnblockUser=async (req,res)=>{
    try{
        const id=req.params.id
        let user=await users.findOne({_id:id})
        if(user.block===false){
           user=await users.updateOne({_id:id},{$set:{block:true}})
            return res.status(200).json(user)
        }else{
            user=await users.updateOne({_id:id},{$set:{block:false}})
            return res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const getAllTeachers=async (req,res)=>{
    try{
        const teachersList=await users.find({role:'teachers'})
        if(teachersList.length===0){
            return res.status(400).json('No teachers found')
        }else{
            return res.status(200).json(teachersList)
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

// const blockUnblockTeachers=async(req,res)=>{
//     try{
//         const id=req.params.id
//         let teacher=await teachers.findOne({_id:id})
//         if(teacher.block===false){
//             teacher=await teachers.updateOne({_id:id},{$set:{block:true}})
//             return res.status(200).json(teacher)
//         }else{
//             teacher=await teachers.updateOne({_id:id},{$set:{block:false}})
//             return res.status(200).json(teacher)
//         }
//     }catch(err){
//         res.status(500).json('Something went wrong')
//     }
// }

let userDetails;

const addTeachers=async(req,res)=>{
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
                            role:'teachers',
                            verify:true,
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




const getAllCategories=async(req,res)=>{
    try{
        const categoryList=await categories.find()
        if(categoryList.length===0){
            return res.status(400).json('No category found')
        }else{
            return res.status(200).json(categoryList)
        }
    }catch(err){
        res.status(400).json('Something went wrong')
    }
}

const addCategory=async(req,res)=>{
    try{
        const {name}=req.body
        const categoryExist=await categories.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } })
        if(!categoryExist){
            const newCategory=new categories({
                name
            })
            newCategory.save().then((category)=>{
               return res.status(200).json({message:'Category added successfully'})
            }).catch((err)=>{
                return res.status(400).json(err.message)
            })
        }else{
            return res.status(400).json('This category alredy exist')
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const blockUnblockCategory=async (req,res)=>{
   try{
    const id=req.params.id
    let categoryExist=await categories.findOne({_id:id})
    if(categoryExist.block===false){
        categoryExist=await categories.updateOne({_id:id},{$set:{block:true}})
        return res.status(200).json(categoryExist) 
    }else{
        categoryExist=await categories.updateOne({_id:id},{$set:{block:false}})
        return res.status(200).json(categoryExist)
    }
   }catch(err){
    res.status(500).json('Something went wrong')
   }
}

const editCategory=async(req,res)=>{
    try{
        const {name}=req.body
        const id=req.params.id
        const categoryExist=await categories.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } })
        if(!categoryExist){
            const edited=await categories.updateOne({_id:id},{$set:{name}})
            return res.status(200).json(edited)
        }else{
            return res.status(400).json('This category alredy exist')
        }
        
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const verifyTeacher=async(req,res)=>{
    try{
        const id=new mongoose.Types.ObjectId(req.body.id)
        const teacher=await users.findOne({_id:id})
        if(teacher.verify===false){
            users.updateOne({_id:id},{$set:{verify:true}}).then((response)=>{
                return res.status(200).json('Teacher Verified')
            }).catch((err)=>{
                return res.status(400).json(err)
            })
        }else{
            return res.status(200).json("Teacher alredy verified")
        }
    }catch(err){
        return res.status(400).json("Something went wrong")
    }
}

const getDashboard=async(req,res)=>{
    try{
        const teachers=await users.find({role:'teachers'}).count()
        const students=await users.find({role:'users'}).count()
        const courses=await course.find({block:false}).count()
        const orders=await Order.find({status:true}).count()
        let studentJoinedDetails = await users.aggregate([
            {
                $match:{
                    role:'users'
                }
            },
            {
              $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
              }
            },
            {
              $group: {
                _id: null,
                data: {
                  $push: { $ifNull: ["$count", 0] }
                },
                months: {
                  $push: "$_id"
                }
              }
            },
            {
              $project: {
                _id: null,
                data: {
                  $map: {
                    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    as: "m",
                    in: {
                      $cond: {
                        if: { $in: ["$$m", "$months"] },
                        then: { $arrayElemAt: ["$data", { $indexOfArray: ["$months", "$$m"] }] },
                        else: null
                      }
                    }
                  }
                }
              }
            }
          ]);
        return res.status(200).json({status:true,teachers,students,courses,orders,studentJoinedDetails:studentJoinedDetails[0].data})
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const getTeacherReports=async(req,res)=>{
    try{
        const reports = await users.aggregate([
            {
              $match: {
                role: 'teachers',
                block:false,
                'report.0': { $exists: true }
              }
            },
            {
              $unwind: '$report'
            },
            {
              $lookup: {
                from: 'users',
                localField: 'report.user',
                foreignField: '_id',
                as: 'report.userInfo'
              }
            },
            {
              $unwind: '$report.userInfo'
            },
            {
              $group: {
                _id: '$_id',
                teacherName: { $first: '$name' },
                reportDetails: { $push: '$report' }
              }
            },
            {
              $unwind: '$reportDetails'
            },
            {
              $project: {
                reason: '$reportDetails.reason',
                user: '$reportDetails.userInfo.name',
                teacherName: 1
              }
            }
          ]);

          const studentReports = await users.aggregate([
            {
              $match: {
                role: 'users',
                block:false,
                'report.0': { $exists: true }
              }
            },
            {
              $unwind: '$report'
            },
            {
              $lookup: {
                from: 'users',
                localField: 'report.user',
                foreignField: '_id',
                as: 'report.userInfo'
              }
            },
            {
              $unwind: '$report.userInfo'
            },
            {
              $group: {
                _id: '$_id',
                studentName: { $first: '$name' },
                reportDetails: { $push: '$report' }
              }
            },
            {
              $unwind: '$reportDetails'
            },
            {
              $project: {
                reason: '$reportDetails.reason',
                user: '$reportDetails.userInfo.name',
                studentName: 1
              }
            }
          ]);

          const courseReports = await Course.aggregate([
            {
              $match: {
                block:false,
                'report.0': { $exists: true }
              }
            },
            {
              $unwind: '$report'
            },
            {
              $lookup: {
                from: 'users',
                localField: 'report.user',
                foreignField: '_id',
                as: 'report.userInfo'
              }
            },
            {
              $unwind: '$report.userInfo'
            },
            {
              $group: {
                _id: '$_id',
                courseName: { $first: '$name' },
                reportDetails: { $push: '$report' }
              }
            },
            {
              $unwind: '$reportDetails'
            },
            {
              $project: {
                reason: '$reportDetails.reason',
                user: '$reportDetails.userInfo.name',
                courseName: 1
              }
            }
          ]);
          
          
          
        return res.status(200).json({status:true,teacherReports:reports,courseReports:courseReports,studentReports:studentReports})
    }catch(err){
        return res.status(400).json("something went wrong")
    }
}

export {adminLogin,authAdmin,blockUnblockUser,getAllUsers,verifyTeacher,getDashboard,getTeacherReports,getAllTeachers,addTeachers,resendOtp,getAllCategories,addCategory,blockUnblockCategory,editCategory}