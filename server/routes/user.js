import express from 'express'
const router=express.Router()
import { userLogin, userSignup, forgotPassword, resendOtp, googleAuth, userAuth, getAllCourse,getCourse,getEntrolled} from '../controller/userController.js'
import {cancelPayment, CheckOut, verifyPayment} from '../controller/orderController.js'
import verifyUser from '../middlewares/userAuth.js'
import { AskQuestion } from '../controller/courseController.js'
import { getAllCategories } from '../controller/adminController.js'
import { getCategory } from '../controller/teacherController.js'

router.post('/signup',userSignup)

router.get('/auth',userAuth)

router.post('/login',userLogin)

router.patch('/forgot',forgotPassword)

router.post('/resend',resendOtp)

router.post('/auth/google',googleAuth)

router.get('/courses',getAllCourse)

router.post('/course-details',getCourse)

// router.put('/entroll',entroll)

router.get('/categories',getCategory)

router.post('/checkOut',verifyUser,CheckOut)

router.get('/verifyPayment/:orderId',verifyPayment)

router.get('/cancel-payment/:orderId',cancelPayment)


router.get('/getEntrolled',verifyUser,getEntrolled)

router.patch('/course/ask-question/:id',AskQuestion)



export default router
