import express from 'express'
const route=express.Router()
import { verifyOtp, userLogin, userSignup } from '../controller/userController.js'

route.post('/signup',userSignup)

route.post('/otp',verifyOtp)

route.post('/login',userLogin)


export default route
