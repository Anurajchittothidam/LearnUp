import express from 'express'
const app=express()
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import teacherRouter from './routes/teacher.js'

app.listen(8000,()=>{
    console.log('port connected to 8000')
})
app.use(cors())
app.use(express.static(path.resolve()+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/teacher',teacherRouter)


mongoose.set('strictQuery',false)
mongoose.connect('mongodb+srv://anuraj:anuraj123@cluster0.1vmmfr8.mongodb.net/LearnUP').then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})



