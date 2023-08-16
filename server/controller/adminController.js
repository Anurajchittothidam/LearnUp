import users from '../models/userSchema.js'
import teachers from '../models/teacherSchema.js'
import categories from '../models/categorySchema.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const adminLogin=async (req,res)=>{
    try{
        const {email,password}=req.body
        if(email!==null && email!==undefined && password!==null && password!==undefined){
            if(email===process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASS){
               return res.status(200).json('Login Successfull')
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

const getAllUsers=async (req,res)=>{
    try{
        const userList=await users.find()
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
        const id=req.body
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
        const teachersList=await teachers.find()
        if(!teachersList){
            return res.status(400).json('No teachers found')
        }else{
            return res.status(200).json(teachersList)
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const blockUnblockTeachers=async(req,res)=>{
    try{
        const id=req.body
        let teacher=await teachers.findOne({_id:id})
        if(teacher.block===false){
            teacher=await teachers.updateOne({_id:id},{$set:{block:true}})
            return res.status(200).json(teacher)
        }else{
            teacher=await teachers.updateOne({_id:id},{$set:{block:false}})
            return res.status(200).json(teacher)
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const addTeachers=async(req,res)=>{
    try{
        const {email,password,name,phoneNumber}=req.body
        if(!email || !password || !name || !phoneNumber){
            return res.status(400).json('fill the complete field')
        }else{
            const emailExist=await teachers.findOne({email})
            if(!emailExist){
                const hash=await bcrypt.hash(password,10)
                const newTeacher=new teachers({
                    name,
                    email,
                    password:hash,
                    phoneNumber
                })
                newTeacher.save().then((teacher)=>{
                    res.status(200).json(teacher)
                }).catch((err)=>{
                    res.status(400).json(err.message)
                })
            }else{
                return res.status(400).json('This email alredy exist')
            }
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}

const addCategory=async(req,res)=>{
    try{
        const {name}=req.body
        const categoryExist=await categories.findOne({name})
        if(!categoryExist){
            const newCategory=new categories({
                name
            })
            newCategory.save().then((category)=>{
               return res.status(200).json(category)
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
    const id=req.body
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
        const {id,name}=req.body
        const categoryExist=await categories.findOne({name})
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
export {adminLogin,blockUnblockUser,getAllUsers,getAllTeachers,blockUnblockTeachers,addTeachers,addCategory,blockUnblockCategory,editCategory}