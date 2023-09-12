import express from 'express'
const router=express.Router()
import { forgotPassword, googleAuth, resendOtp, teacherLogin, teacherSignup, uploadImage, verifyOtp,authTeacher,getTeacher, editProfile } from '../controller/teacherController.js'
import verifyTeacher from '../middlewares/authTeacher.js'
import {upload} from '../middlewares/imageUpload.js'

router.post('/login',teacherLogin)

router.get('/auth',authTeacher)

// router.use(verifyTeacher)

router.post('/signup',teacherSignup)

router.post('/Otp',verifyOtp)

router.post('/profile',getTeacher)

router.patch('/forgot',forgotPassword)

router.post('/resend',resendOtp)

router.post('/auth/google',googleAuth)

router.put('/uploadImage',upload.single("my_file"),uploadImage)

router.put('/editProfile',editProfile)


export default router