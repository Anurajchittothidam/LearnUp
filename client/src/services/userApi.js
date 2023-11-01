import axios  from "../../src/axios/axiosUser.js";

export const userLogin=(userDetails)=>{
    return axios('JwtToken').post('/login',{...userDetails})
}

export const userSignup=(userDetails)=>{
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

export const allCourses=(filterCategory,price,search,sort,page,limit)=>{
    return axios('JwtToken').get(`/courses?category=${filterCategory}&isFree=${price}&search=${search}&sort=${sort}&limit=${limit}&page=${page}`)
}

export const getCourse=(courseId)=>{
    return axios('JwtToken').post('/course-details',{courseId})
}

export const isEntrolled=(courseId)=>{
    return axios('JwtToken').get(`/isEntrolled/${courseId}`)
}

export const handleCheckout=(values,cartData,courseId,userId)=>{
    return axios('JwtToken').post('/checkOut',{...values,cartData,courseId,userId})
}

export const getAllCategories=()=>{
    return axios('JwtToken').get('/categories')
}

export const getEntrolled=(search)=>{
    return axios('JwtToken').get(`/getEntrolled?search=${search}`)
}

export const AskQuestion=(courseId,question,index)=>{
    return axios('JwtToken').patch(`/course/ask-question/${courseId}` , { question , index } )
}

export const imageUpload=(data)=>{
    return axios('JwtToken').put('/uploadImage',data,{headers: {
        'Content-Type': 'multipart/form-data',
      }})
}

export const userEditProfile=(data)=>{
    return axios('JwtToken').put('/editProfile',{...data})
}

export const getUser=()=>{
    return axios('JwtToken').get('/user')
}

export const addToCart=(courseId)=>{
    return axios('JwtToken').post('/addToCart',{courseId:courseId,action:'add'})
}

export const isAdded=(courseId)=>{
    return axios('JwtToken').post('/addToCart',{courseId:courseId,action:'isAdd'})
}

export const getCart=()=>{
    return axios('JwtToken').get('/getCart')
}

export const removeFromCart=(courseId)=>{
    return axios('JwtToken').delete(`/removeCart/${courseId}`)
}

export const addReview=(rating,text,courseId)=>{
    return axios('JwtToken').put('/addReview',{rating,text,courseId})
}

export const getReviews=(courseId)=>{
    return axios('JwtToken').get(`/getReviews/${courseId}`)
}

export const reportTeacher=(teacherId,reason)=>{
    return axios('JwtToken').put('/reportTeacher',{teacherId,reason})
}

export const reportCourse=(courseId,reason)=>{
    return axios('JwtToken').put('/reportCourse',{courseId,reason})
}

export const reportUser=(userId,reason)=>{
    return axios('JwtToken').put('/reportUser',{userId,reason})
}

export const deleteReview=(reason,courseId)=>{
    return axios("JwtToken").put('/deleteReview',{courseId,reason})
}

export const editReview=(newReview,newRating,review,courseId)=>{
    return axios('JwtToken').put('/editReview',{review,courseId,newReview,newRating})
}

export const getVideoUrl=(videoUrl)=>{
    return axios('JwtToken').get(`/getVideoUrl?url=${videoUrl}`)
}

