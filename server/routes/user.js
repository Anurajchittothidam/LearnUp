import express from 'express'
const router=express.Router()
import { userLogin, userSignup, forgotPassword, resendOtp, googleAuth, userAuth, getAllCourse,getCourse,entroll } from '../controller/userController.js'
import {CheckOut} from '../controller/orderController.js'

router.post('/signup',userSignup)

router.get('/auth',userAuth)

router.post('/login',userLogin)

router.patch('/forgot',forgotPassword)

router.post('/resend',resendOtp)

router.post('/auth/google',googleAuth)

router.get('/courses',getAllCourse)

router.post('/course-details',getCourse)

router.put('/entroll',entroll)

router.post('/checkOut',CheckOut)




export default router
