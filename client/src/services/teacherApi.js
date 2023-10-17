import axios from '../../src/axios/axiosTeacher.js'

export const teacherLogin=(values)=>{
    return axios('teacherJwtToken').post('/teacher/login',{...values})
}

export const googleAuth=(values)=>{
    return axios('teacherJwtToken').post('/teacher/auth/google',{...values})
}

export const teacherSignup=(values)=>{
    return axios('teacherJwtToken').post('/teacher/signup',{...values,action:'send'})
}

export const teacherSignupOtp=(values)=>{
    return axios('teacherJwtToken').post('/teacher/signup',{otp:values.otp.join(''),action:'verify'})
}

export const forgotPassword=(values)=>{
    return axios('teacherJwtToken').patch('/teacher/forgot',{...values,action:'send'})
}

export const verifyTeacherForgot=(value)=>{
    return axios('teacherJwtToken').patch('/teacher/forgot',{otp:value.otp.join(''),action:'verify'})
}

export const teacherResendOtp=()=>{
    return axios('teacherJwtToken').post('/teacher/resend')
}

export const authTeacher=()=>{
    return axios('teacherJwtToken').get('/teacher/auth')
}

export const getTeacher=(id)=>{
    return axios('teacherJwtToken').post(`/teacher/profile/`,{id})
}

export const imageUpload=(data)=>{
    return axios('teacherJwtToken').put('/teacher/uploadImage',data,{headers: {
        'Content-Type': 'multipart/form-data',
      }})
}

export const videoUpload=(data)=>{
    console.log('action',data.action)
    return axios('teacherJwtToken').put('/teacher/uploadVideo',data,{
        headers:{
        'Content-Type': 'multipart/form-data',
    }})
}

export const teacherEditProfile=(data)=>{
    return axios('teacherJwtToken').put('/teacher/editProfile',{...data})
}

export const addCourse=(values,course,image,teacherId)=>{
    return axios('teacherJwtToken').post('/teacher/addCourse',{...values,course,image,teacherId},{ headers: {
        'Content-Type' : 'multipart/form-data',
     }})
}

export const courseList=()=>{
    return axios('teacherJwtToken').get('/teacher/getList')
}

export const listUnlist=(teacherId,courseId,action)=>{
    return axios('teacherJwtToken').put('/teacher/listUnlist',{teacherId,courseId,action})
}

export const getCourse=(courseId)=>{
    return axios('teacherJwtToken').post('/teacher/getCourse',{courseId})
}

export const getCategory=()=>{
    return axios('teacherJwtToken').get('/teacher/getCategory')
}

export const editCourse=(values,course,image,teacherId,courseId)=>{
    return axios('teacherJwtToken').post('/teacher/editCourse',{...values,course,image,teacherId,courseId},{
        headers:{
            'Content-Type' : 'multipart/form-data',
         }
    })
}

export const replyQuestion=(courseId,chapterIndex,answer,questionIndex)=>{
    console.log(questionIndex)
    return axios('teacherJwtToken').patch('/teacher/reply',{courseId,chapterIndex,answer,questionIndex})
}

export const getAllStudents=(courseId)=>{
    return axios('teacherJwtToken').get(`/teacher/getAllStudents/${courseId}`)
}

export const verifyTeacher=()=>{
    return axios('teacherJwtToken').get("/teacher/verify")
}

export const getTeacherDashboard=()=>{
    return axios('teacherJwtToken').get('/teacher/dashboard')
}

