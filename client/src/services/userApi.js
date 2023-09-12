import axios  from "../axios";

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