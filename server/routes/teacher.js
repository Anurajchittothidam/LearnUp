import express from 'express'
const router=express.Router()
import { forgotPassword, googleAuth, resendOtp, teacherLogin,getAllStudents, teacherSignup, uploadImage, getCategory,replyQuestion, verifyOtp,authTeacher,getTeacher, editProfile } from '../controller/teacherController.js'
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

router.put('/uploadImage',upload.single("my_file"),verifyTeacher,uploadImage)

router.put('/editProfile',verifyTeacher,editProfile)

router.post('/addCourse',upload.single('image'),verifyTeacher,addCourse)

router.post('/editCourse',upload.single('image'),verifyTeacher,editCourse)

router.get("/getList",verifyTeacher,getAllCourse)

router.put('/listUnlist',verifyTeacher,listUnListCourse)

router.post('/getCourse',verifyTeacher,getCourse)

router.get('/getCategory',verifyTeacher,getCategory)

router.patch('/reply',verifyTeacher,replyQuestion)

router.get('/getAllStudents/:courseId',verifyTeacher,getAllStudents)

export default router