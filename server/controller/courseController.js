import mongoose from 'mongoose';
import handleUpload from '../middlewares/imageUpload.js';
import Course from '../models/courseSchema.js'
import users from '../models/userSchema.js'
import categories from '../models/categorySchema.js'
import cloudinary from '../config/cloudinary.js';

const addCourse=async(req,res)=>{
    try{
        const {name,description,price,duration,language,isFree,category}=req.body
        if(!name || !description  || !duration || !language||!category ){
            // throw new Error('Enter the complete fields')
            return res.status(400).json({status:false,message:'Enter the complete fields'})
        }else{
            
                if(!req.body.course){
                return res.status(400).json({status:false,message:'Atleast one chapter is needed'})
                }else{
                const coursePrice=isFree==='true' ? 0 :price;
                const updateAssignmentToCloudinary=async(assignment)=>{
                    if(assignment){
                        const uploadAssignment=await cloudinary.uploader.upload(assignment,{
                            folder:'LearnUp-Assignments',
                            resource_type:'raw',
                        })
                        return uploadAssignment || ''
                    }
                    return ''
                }
    
                
                const updatedCourse=await Promise.all(req.body.course.map(async(chapter)=>{
                    const assignment=await updateAssignmentToCloudinary(chapter?.assignment)
                    return{
                        chapter:chapter?.chapter,
                        assignment:assignment,
                        lessons:chapter?.lessons
                    }
                }))
    
    
    
                // req.files.image[0].path=req.files.image[0].path.substring('public'.length)
                if(!req.file){
                    return res.status(400).json('select the image')
                }else{
                    const b64 = Buffer.from(req.file.buffer).toString("base64");
                    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                    const cldRes = await handleUpload(dataURI);
                    const url=cldRes.url
    
                const uploadCourse=new Course({
                    name,
                    isFree,
                    image:url,
                    category,
                    price:coursePrice,
                    duration,
                    language,
                    description,
                    teacher:req.body.teacherId,
                    teacherRevenue:(Number(coursePrice)*(80/100)),
                    adminRevenue:(Number(coursePrice)*(20/100)),
                    course:updatedCourse
                })
                await uploadCourse.save()
                console.log(uploadCourse)
                res.status(200).json({status:true,message:'Course added successfully'})
            }
            }
        }
    }catch(err){
        console.log(err)
        return res.status(400).json("Something went wrong")
    }
}


const editCourse=async(req,res)=>{
    try{
        const {name,description,category,language,duration,isFree,price,courseId}=req.body
        if(!name ||!description||!language||!duration||!isFree){
            return res.status(400).json('Fill the complete fields')
        }else{
            const coursePrice=isFree==='true'? 0 : price;

            const updateAssignmentToCloudinary=async(assignment)=>{
                if(assignment && !assignment.url){
                    const updated=await cloudinary.uploader.upload(assignment,{
                        folder:'LearnUp-Assignments',
                        resource_type:'raw',
                    })

                    return updated || ''
                }
                return assignment
            }

            const updatedCourse=await Promise.all(req.body.course.map(async(chapter)=>{
                const Assignment=await updateAssignmentToCloudinary(chapter?.assignment)
                return{
                    chapter:chapter.chapter,
                    assignment:Assignment,
                    lessons:chapter.lessons
                }
            }))

            console.log(updatedCourse)

            let imageUrl;

            if(!req.file){
                if(!req.body.Image){
                    return res.status(400).json('select the image')
                }else{
                    imageUrl=req.body.Image
                }
            }else{
                const b64 = Buffer.from(req.file.buffer).toString("base64");
                let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                const cldRes = await handleUpload(dataURI);
                imageUrl=cldRes.url
            }
            // req.files.image[0].path=req.files.image[0].path.substring('public'.length)
           const updated= await Course.updateOne({_id:courseId,teacher:req.body.teacherId},{$set:{
                name,
                description,
                language,
                image:imageUrl,
                category,
                isFree,
                duration,
                price:coursePrice,
                course:updatedCourse,
                teacherRevenue:(Number(coursePrice)*(80/100)),
                adminRevenue:(Number(coursePrice)*(20/100)),
                teacher:req.body.teacherId
            }
            })
            console.log(updated)
             
            return res.status(200).json({status:true,message:'Updated Successfully'})
        }

    }catch(err){
        console.log(err)
        return res.status(400).json("Something went wrong")
    }
}

const listUnListCourse=async(req,res)=>{
    try{
        const {courseId,teacherId}=req.body
        const action=req.body.action==='unlist'?true:false
       
        await Course.updateOne(
            { _id: courseId, teacher: teacherId },
            { $set: { block:action  } }
          );
        return res.status(200).json('updated Successfully')
    }catch(err){
        console.log(err)
        return res.status(400).json('something went wrong')
    }
}

const getCourse=async(req,res)=>{
    try{
        const {courseId}=req.body
        const course=await Course.findOne({
            _id:courseId
        }).populate({path:'category',select:'name _id'})
        if(course){
            return res.status(200).json({course:course,message:'success'})
        }else{
            return res.status(400).json("Course not found")
        }
    }catch(err){
        return res.status(200).json('Something went wrong')
    }
}

const AskQuestion=async(req,res)=>{
    try{
        const courseId=req.params.id
        const question=req.body.question
        const courseIndex=req.body.index
        console.log(question,courseIndex)
        const course=await Course.findOne({_id:courseId})
        if(course){
            course.course[courseIndex].questionsAndAnswers.push({question:question})

            await course.save()
            console.log(course.course[courseIndex].questionsAndAnswers)
            return res.status(200).json({status:true,message:'Question added successfully'})
        }else{
            return res.staus(400).json({status:false,message:'Course not found'})
        }
    }catch(err){
        return res.status(400).json('Something went wrong')
    }
}

const getAllCourse=async(req,res)=>{
    try{
        const id=new mongoose.Types.ObjectId(req.teacherId)
        const courses=await Course.aggregate([
            {
                $match:{
                    teacher:id
                }
            },
            {  
                $lookup:{
                    from:"categories",
                    localField:'category',
                    foreignField:'_id',
                    as:'categoryInfo'
                }
            },
            {
                $unwind:"$categoryInfo"
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    price:1,
                    image:1,
                    entrolled:1,
                    block:1,
                    category:"$categoryInfo.name"
                }
            }
        ])
        if(courses.length===0){
            return res.status(200).json({status:false,message:'No Course Found'})
        }else{
            return res.status(200).json({courses:courses,message:'success'})
        }
    }catch(err){
        // console.log(err)
        return res.status(400).json('Something went wrong')
    }
}

export {addCourse,editCourse,getAllCourse,getCourse,listUnListCourse,AskQuestion}