import express from 'express'
import { addTeachers, adminLogin, blockUnblockTeachers, blockUnblockUser, getAllTeachers, getAllUsers } from '../controller/adminController.js'
const route=express.Router()

route.post('/login',adminLogin)

route.get('/users',getAllUsers)

route.post('/users/:id',blockUnblockUser)


route.get('/teachers',getAllTeachers)

route.post('/teachers/add',addTeachers)

route.post('/teachers/:id',blockUnblockTeachers)


export default route