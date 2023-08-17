import express from 'express'
const route=express.Router()
import { teacherLogin, teacherSignup, verifyOtp } from '../controller/teacherController.js'

route.post('/login',teacherLogin)

route.post('/signup',teacherSignup)

route.post('/Otp',verifyOtp)


export default route