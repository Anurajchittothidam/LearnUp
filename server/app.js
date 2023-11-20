import express from 'express'
const app=express()
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import teacherRouter from './routes/teacher.js'
import dotenv from 'dotenv'
import socketApi from './socket/soket.js'
dotenv.config()

const port=process.env.PORT || 8000

const server=app.listen(port,()=>{
    console.log('port connected to 8000')
})
app.use(cors({
    origin : [process.env.CLIENTSIDE_URL],
    // origin : [process.env.CLIENTSIDE_URL],
    methods : ["GET","POST" , "DELETE" ,"PUT" , "PATCH"] ,
    credentials: true 
}))
app.use(express.static(path.resolve()+'/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    // Check if the error is a custom application error with a message
    if (err.message) {
      return res.status(400).json({ status: false, message: err.message });
    }
  
    // Handle other types of errors
    return res.status(500).json({ status: false, message: 'Internal server error' });
};

app.use(errorHandler)

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/teacher',teacherRouter)


mongoose.set('strictQuery',false)
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})


socketApi.io.attach(server,{
    cors:{
        origin:'*'
    }
})
