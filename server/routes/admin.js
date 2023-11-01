import express from 'express'
import { addCategory,authAdmin, addTeachers, adminLogin, blockUnblockCategory,verifyTeacher, blockUnblockUser, editCategory, getAllCategories, getAllTeachers, getAllUsers, resendOtp, getDashboard, getTeacherReports } from '../controller/adminController.js'
import verifyAdmin from '../middlewares/adminAuth.js'
import {validateId} from '../middlewares/validateParams.js'
const router=express.Router()

router.post('/login',adminLogin)

router.get('/auth',authAdmin)

router.use(verifyAdmin)

router.get('/users',getAllUsers)

router.patch('/users/:id',validateId,blockUnblockUser)

router.get('/teachers',getAllTeachers)

router.post('/teachers/add',addTeachers)

router.post('/teachers/resend',resendOtp)

router.patch('/teachers/:id',validateId,blockUnblockUser)

router.get('/categories',getAllCategories)

router.post('/categories/add',addCategory)

router.put('/categories/edit/:id',validateId,editCategory)

router.patch('/categories/:id',validateId,blockUnblockCategory)

router.patch('/verifyTeacher',verifyTeacher)

router.get('/dashboard',getDashboard)

router.get('/getTeacherReport',getTeacherReports)


export default router