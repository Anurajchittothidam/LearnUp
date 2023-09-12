import express from 'express'
const router=express.Router()
import { userLogin, userSignup, forgotPassword, resendOtp, googleAuth, userAuth } from '../controller/userController.js'

router.post('/signup',userSignup)

router.get('/auth',userAuth)

router.post('/login',userLogin)

router.patch('/forgot',forgotPassword)

router.post('/resend',resendOtp)

router.post('/auth/google',googleAuth)




export default router
