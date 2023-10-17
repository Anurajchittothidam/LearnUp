import express from 'express'
const router=express.Router()
import { forgotPassword, googleAuth, resendOtp, teacherLogin,getAllStudents,verifyTeacherController,teacherSignup,videoUpload, uploadImage, getCategory,replyQuestion, verifyOtp,authTeacher,getTeacher, editProfile, getDashboard } from '../controller/teacherController.js'
import teacherAuth from '../middlewares/authTeacher.js'
import verifyTeacher from '../middlewares/verifyTeacher.js'
import {addCourse, editCourse, getAllCourse, getCourse, listUnListCourse} from '../controller/courseController.js'
import {upload} from '../middlewares/imageUpload.js'
import uploadVideo from '../middlewares/videoUpload.js'

router.post('/login',teacherLogin)

router.get('/auth',authTeacher)

// router.use(teacherAuth)

router.post('/signup',teacherSignup)

router.post('/Otp',verifyOtp)

router.post('/profile',teacherAuth,getTeacher)

router.patch('/forgot',forgotPassword)

router.post('/resend',resendOtp)

router.post('/auth/google',googleAuth)

router.put('/uploadImage',upload.single("my_file"),teacherAuth,uploadImage)

router.put('/editProfile',teacherAuth,editProfile)

router.put('/uploadVideo',uploadVideo.single('video'),verifyTeacher,videoUpload)

router.post('/addCourse',upload.single('image'),verifyTeacher,addCourse)

router.post('/editCourse',upload.single('image'),teacherAuth,editCourse)

router.get("/getList",teacherAuth,getAllCourse)

router.put('/listUnlist',teacherAuth,listUnListCourse)

router.post('/getCourse',teacherAuth,getCourse)

router.get('/getCategory',verifyTeacher,getCategory)

router.patch('/reply',teacherAuth,replyQuestion)

router.get('/getAllStudents/:courseId',teacherAuth,getAllStudents)

router.get('/verify',verifyTeacherController)

router.get('/dashboard',teacherAuth,getDashboard)

export default router