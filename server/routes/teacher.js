import express from 'express'
const router=express.Router()
import { forgotPassword, googleAuth, resendOtp, teacherLogin, teacherSignup, uploadImage, getCategory, verifyOtp,authTeacher,getTeacher, editProfile } from '../controller/teacherController.js'
import verifyTeacher from '../middlewares/authTeacher.js'
import {addCourse, editCourse, getAllCourse, getCourse, listUnListCourse} from '../controller/courseController.js'
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

router.post('/addCourse',upload.single('image'),addCourse)

router.post('/editCourse',upload.single('image'),editCourse)

router.post("/getList",getAllCourse)

router.put('/listUnlist',listUnListCourse)

router.post('/getCourse',getCourse)

router.get('/getCategory',getCategory)

export default router