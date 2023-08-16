import express from 'express'
const route=express.Router()
import { userLogin, userSignup } from '../controller/userController.js'

route.post('/signup',userSignup)

route.post('/login',userLogin)

export default route
