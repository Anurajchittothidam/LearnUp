import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verifyToken=(req,res,next)=>{
    const secretId=process.env.SECRET_KEY
    const authHeader=req.headers.authorization
    if(authHeader){
        const token=authHeader.split(' ')[1]
        jwt.verify(token,secretId,async (err,decoded)=>{
            if(err){
               return res.status(400).json({status:false,message:'Permission denied',err})
            }else{
                const admin=process.env.ADMIN_EMAIL===decoded.email

                if(admin){
                    next()
                }else{
                   return res.status(400).json({status:false,message:"no admin found"})
                }
            }
        })
    }else{
        res.status(400).json({status:false,message:"Token not found"})
        // next()
    }

}

export default verifyToken