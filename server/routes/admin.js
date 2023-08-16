import express from 'express'
import { adminLogin } from '../controller/adminController.js'
const route=express.Router()

route.post('/login',adminLogin)

export default route