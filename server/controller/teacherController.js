import teachers from '../models/teacherSchema.js'
import users from '../models/userSchema.js'
import bcrypt from 'bcrypt'

const teacherLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json('Fill all the fields')
        }else{
            const teacherExist=await teachers.findOne({email})
            if(!teacherExist){
                return res.status(400).json('This email not exist')
            }else{
                const isMatch=await bcrypt.compare(password,teacherExist.password)
                if(!isMatch){
                    return res.status(400).json('Incorrect password')
                }else{
                    return res.status(200).json(teacherExist)
                }
            }
        }
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}


const teacherSignup=async (req,res)=>{
    try{
        const {email,password,phoneNumber,name}=req.body
        if(!email || !password || !phoneNumber || !name){
            return res.status(400).json('Enter the complete fields')
        }else{
            const emailExist=teachers.findOne({email})
            if(!emailExist){
                const hash=await bcrypt.hash(password,10)
                const newTeacher=new teachers({
                    name,
                    email,
                    phoneNumber,
                    password:hash
                })
                newTeacher.save().then((teacher)=>{
                    return res.status(200).json(teacher)
                }).catch((err)=>{
                    return res.status(400).json(err.message)
                })
            }else{
                return res.status(400).json('This email alredy exist')
            }
        }
    }catch(err){
        return res.status(500).json('Something went wrong')
    }
}

const editProfile=async(req,res)=>{
    try{
        const {id,email,name,phoneNumber,about}=req.body
        if(!email || !name || !phoneNumber || !about){
            return res.status(400).json('Enter the complete fields')
        }else{
            const emailExist=await teachers.findOne({email})
            const teacher=await teachers.findOne({_id:id})
            if(!emailExist){
                const updated=await teachers.updateOne({_id:id},{$set:{email,name,phoneNumber,about}})
                return res.status(200).json(updated)
            }else if(emailExist.email===teacher.email){
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

const getAllUsers=async (req,res)=>{
    try{
        const userList=await users.find()
        return res.status(200).json(userList)
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}
export {teacherLogin,teacherSignup,getAllUsers,editProfile}