import express from 'express'
const router=express.Router()
import { userLogin, userSignup, forgotPassword, resendOtp,getCart,removeCart, googleAuth, userAuth,getUser,addToCart, getAllCourse,getCourse,getEntrolled,imageUpload, editProfile} from '../controller/userController.js'
import {cancelPayment, CheckOut, verifyPayment,isEntrolled} from '../controller/orderController.js'
import verifyUser from '../middlewares/userAuth.js'
import { AskQuestion } from '../controller/courseController.js'
import { getAllCategories } from '../controller/adminController.js'
import { getCategory } from '../controller/teacherController.js'
import { upload } from '../middlewares/imageUpload.js'

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

router.get('/isEntrolled/:courseId',verifyUser,isEntrolled)

router.get('/getEntrolled',verifyUser,getEntrolled)

router.patch('/course/ask-question/:id',verifyUser,AskQuestion)

router.put('/uploadImage',upload.single("my_file"),verifyUser,imageUpload)

router.put('/editProfile',verifyUser,editProfile)

router.get('/user',verifyUser,getUser)

router.post('/addToCart',verifyUser,addToCart)

router.get('/getCart',verifyUser,getCart)

router.delete('/removeCart/:courseId',verifyUser,removeCart)

export default router
