import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sendEmail, verifyOTP} from '../helpers/otpVerification.js'
import axios from 'axios'
import dotenv from 'dotenv'
import Course from '../models/courseSchema.js'
import categories from '../models/categorySchema.js'
import Order from '../models/orderSchema.js'
import mongoose from 'mongoose'
import Cart from '../models/cartSchema.js'
import handleUpload from '../middlewares/imageUpload.js'
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
                        return res.status(200).json({token:token,user:userExist,message:'Login Success'})
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
                    return res.status(200).json({token:token,user:newUser,message:'Signup Success'})
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
                if(userExist.block===true){
                   return res.status(400).json('This account blocked')
            }else{
                const isMatch=await bcrypt.compare(password,userExist.password)
             if(!isMatch){
                res.status(400).json('This password not match')
             }else{
                 const token=createToken(userExist._id)
                return res.status(200).json({user:userExist,token:token})
             }
            }
            }else{
             res.status(400).json('This user Not Exist')
            }
        }
    }catch(err){
        console.log(err)
    }
}

const userAuth=(req,res)=>{
    try{
const secret=process.env.SECRET_KEY

        // getting the token from request headers
        const authHeader=req.headers.authorization
        if(authHeader){
            const token=authHeader.split(' ')[1]
            jwt.verify(token,secret,async(err,decoded)=>{
                if(err){
                   return res.status(400).json({status:false,message:"Permission not allowed"})
                }else{
                    //finding user with decoded id
                    const User=await users.findById(decoded.id)
                    if(User){
                        if(User.block===true){
                           return res.status(400).json({status:false,message:"Your accound blocked"})
                        }else{
                             // if user exist passing the user id with the request
                          return res.status(200).json({userId:decoded.id}) 
                        }
                    }else{
                       return res.status(400).json({status:false,message:"User not exist"})
                    }
                }
            })
        }else{
           return res.status(400).json({status:false,message:"No token found"})
        }
        }catch(err){
           return res.status(200).json('Something went wrong')
        }
}

const getAllCourse=async(req,res)=>{
    try{
        let category=req.query.category||'All'
        const isFree=req.query.isFree ||''
        const search=req.query.search ||""
        const sort=req.query.sort||''
        const page=req.query.page-1||0
        const limit=req.query.limit||3
        let categoryIds;
        const categoryOptions = await categories.find({block:false})
        category==='All'?categoryIds=[...categoryOptions]:category=req.query.category.split(',')
        {category!=='All'&&( categoryIds = categoryOptions
            .filter((cat) => category.includes(cat.name))
            .map((cat) => cat.id))}

            const query={
                block:false,
                category:{$in:categoryIds},
                name:{$regex:`^${search}`,$options:"i"}
            }

            let sortby={}
            if(sort==='price-ase'){
                sortby={price:1}
            }else if(sort==='price-dec'){
                sortby={price:-1}
            }else if(sort==='order-ase'){
                sortby={name:1}
            }else if(sort==='order-dec'){
                sortby={name:-1}
            }else{
                sortby={}
            }

            if (isFree === "true") {
                query.isFree = true;
              } else if (isFree === "false") {
                query.isFree = false;
              }
              const totalCount = await Course.countDocuments(query);
        const courses=await Course.find(query).sort(sortby).skip(page*limit).limit(limit)
        if(courses.length===0){
            return res.status(400).json({status:false,message:'No courses found'})
        }else{
            return res.status(200).json({courses:courses,total:totalCount})
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }

    try {
    // finding All courses and find the tutor details also by populating
    const course = await Course.find().skip(req.paginatedResults.startIndex).limit(req.paginatedResults.limit).populate('tutor').lean()
      
    if(course) {
      res.status(200).json({ status : true , course , pagination : req.paginatedResults})
    }
  } catch (error) {
    res.status(500).json({ status : false , message : " Internal Server Error "}) ;
  }

}

const getCourse=async(req,res)=>{
    try{
        const courseId=new mongoose.Types.ObjectId(req.body.courseId)
        const course=await Course.findOne({
            _id:courseId
        }).populate({path:'teacher',select:'name picture about'})
        if(course){
            return res.status(200).json({courseDetails:course,message:'Success'})
        }else{

            return res.status(400).json('Course not found')
        }
    }catch(err){
        console.log(err)
        return res.status(400).json('Something went wrong')
    }
}

const imageUpload=async(req,res)=>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        const id=req.userId
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

const editProfile=async(req,res)=>{
    try{
        const {id,email,name,phoneNumber,about,place}=req.body
        console.log(id)
        if(!email || !name || !phoneNumber || !about || !place){
            return res.status(400).json('Enter the complete fields')
        }else{
            const emailExist=await users.findOne({email,role:'users'})
            if(!emailExist){
                const updated=await users.updateOne({_id:id},{$set:{email,name,phoneNumber,about,place}})
                return res.status(200).json(updated)
            }else if(emailExist._id.toString()===id){
                console.log('dslfj')
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

const addToCart=async(req,res)=>{
    try{
        const userId=req.userId
        const courseId=req.body.courseId
        if(req.body.action==='add'){
            const exist=await Cart.findOne({userId,courseId})
            if(exist){
                return res.status(400).json('This course alredy added')
            }else{
            const added=new Cart({
                user:userId,
                course:courseId
            })
            await added.save()
            return res.status(200).json({status:true,message:'Course added to the cart'})
            }
        }else{
            const exist=await Cart.findOne({course:courseId,user:userId})
            if(exist){
                return res.status(200).json({status:true,message:'Alredy added'})
            }else{
                return res.status(200).json({status:false,message:'not added'})
            }
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }

}

const getCart=async(req,res)=>{
    try{
        const userId=req.userId
        const courses=await Cart.find({user:userId}).populate('course')
        if(courses){
            return res.status(200).json({courses:courses,message:'Success'})
        }else{
            return res.status(400).json({message:'No course Found'})
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const removeCart=async(req,res)=>{
    try{
        const userId=req.userId
        const courseId=req.params.courseId
        const remove=await Cart.deleteOne({user:userId,course:courseId})
        if(remove){
            return res.status(200).json({status:true,message:'removed success'})
        }else{
            return res.status(400).json({status:false,message:'Not removed'})
        }
    }catch(err){
        return res.status(400).json("Something went wrong")
    }
}

const getUser=async(req,res)=>{
    try{
        const userId=req.userId
        const user=await users.findOne({_id:userId})
        console.log(user)
        if(user){
            return res.status(200).json(user)
        }else{
            return res.status(400).json('User not found')
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
   
}

const getEntrolled=async(req,res)=>{
    try{
        const userId=new mongoose.Types.ObjectId(req.userId)
        const search=req.query.search||""
      
        const courses = await Order.aggregate([
            {
                $match: {
                    user: userId,
                    status:true,
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
                $lookup:{
                    from:'users',
                    localField:'teacher',
                    foreignField:'_id',
                    as:'teacherInfo'
                }
            },
            {
                $unwind:'$teacherInfo'
            },
            {
                $match:{
                    'courseInfo.name':{
                        $regex:`^${search}`,$options:'i'
                    },       
                }
            },
            {
                $project:{
                    courseInfo:'$courseInfo',
                    teacherInfo:'$teacherInfo',
                }
            }
            
        ]);
        

        // const courses=await Order.find(query).populate('teacher').populate('course')
        if(courses){
            return res.status(200).json({courses:courses,message:'Success'})
        }else{
            return res.status(400).json('courses not found')
        }
    }catch(err){
        console.log(err)
        return res.status(400).json('Something went wrong')
    }
}

// const isEntroll=async(req,res)=>{
//     try{
//         const {userId,courseId}=req.body
//         const exist=await Course.findOne({_id:courseId})
//     }catch(err){
//         return res.status(400).json('Something went wrong')
//     }
// }

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
                           return res.status(400).json('User not found')
                        }
                    }).catch((err)=>{
                       return res.status(400).json(err.message)
                    })
                }else{
                    return res.status(400).json({status:false,message:'Invalid Otp'})
                }
            }).catch((err)=>{
                return res.status(400).json({status:false,message:'Otp does not match'})
            })
            }
        }else{
           return res.status(400).json('Some error Occured')
        }
    }catch(err){
       return res.status(400).json('Something went wrong')
    }
}

export {userLogin,userAuth,userSignup,getCart,removeCart,forgotPassword,addToCart,resendOtp,googleAuth,getAllCourse,getCourse,getEntrolled,imageUpload,editProfile,getUser}