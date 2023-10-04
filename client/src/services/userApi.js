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

export const allCourses=(filterCategory,price,search,sort,page)=>{
    console.log('cat',page)
    return axios('JwtToken').get(`/courses?category=${filterCategory}&isFree=${price}&search=${search}&sort=${sort}&page=${page}`)
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

export const getAllCategories=()=>{
    return axios('JwtToken').get('/categories')
}

export const getEntrolled=()=>{
    return axios('JwtToken').get('/getEntrolled')
}

export const AskQuestion=(courseId,question,index)=>{
    return axios('JwtToken').patch(`/course/ask-question/${courseId}` , { question , index } )
}