import express from 'express'
const router=express.Router()
import { forgotPassword, googleAuth, resendOtp, teacherLogin, teacherSignup, verifyOtp } from '../controller/teacherController.js'

router.post('/login',teacherLogin)

router.post('/signup',teacherSignup)

router.post('/Otp',verifyOtp)

router.patch('/forgot',forgotPassword)

router.post('/resend',resendOtp)

router.post('/auth/google',googleAuth)


export default router