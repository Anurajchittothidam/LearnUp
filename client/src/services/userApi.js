import axios  from "../../src/axios/axiosUser.js";

export const userLogin=(userDetails)=>{
    return axios('JwtToken').post('/login',{...userDetails})
}

export const userSignup=(userDetails)=>{
    console.log(userDetails)
    return axios('JwtToken').post('/signup',{...userDetails,action:'send'})
}

export const userSignupOtp=(value)=>{
    return axios('JwtToken').post('/signup',{otp:value.otp.join(''),action:'verify'})
}

export const resendOtp=()=>{
    return axios('JwtToken').post('/resend')
}

export const forgotPassword=(value)=>{
    return axios('JwtToken').patch('/forgot',{...value,action:'send'})
}

export const verifyForgot=(value)=>{
    return axios('JwtToken').patch('/forgot',{otp:value.otp.join(''),action:'verify'})
}

export const googleAuth=(value)=>{
    return axios('JwtToken').post('/auth/google',{...value})
}

export const userAuth=()=>{
    return axios('JwtToken').get('/auth')
}

export const allCourses=()=>{
    return axios('JwtToken').get('/courses')
}

export const getCourse=(courseId)=>{
    return axios('JwtToken').post('/course-details',{courseId})
}

export const isEntrolled=(userId,courseId)=>{
    return axios('JwtToken').post('/isEntrolled',{userId,courseId})
}

export const handleCheckout=(values,courseId,userId)=>{
    return axios('JwtToken').post('/checkOut',{...values,courseId,userId})
}