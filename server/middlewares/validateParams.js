import validator from 'validator'

export const validateId=(req,res,next)=>{
    try{
        if(!req.params.id || !validator.isMongoId(req.params.id)){
           return res.status(400).json({status:false,message:'invalid Id'})
        }else{
            next()
        }
    }catch(err){
        res.status(400).json('Something went wrong')
    }
}