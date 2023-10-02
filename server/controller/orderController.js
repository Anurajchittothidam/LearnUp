import users from '../models/userSchema.js'
import courses from '../models/courseSchema.js'
import Order from '../models/orderSchema.js'
import stripe from 'stripe'

const CheckOut=async(req,res)=>{
    try{
        const {courseId,userId}=req.body

        const user=await users.findById(userId)
        if(user.block===false){
            const course=courses.findById(courseId)
            if(course.isFree){
                const order=new Order.create({
                    total:course.price,
                    user:userId,
                    teacher:course.teacher,
                    course:courseId,
                    address:{line:req.body.address,pincode:req.body.pincode},
                    status:true,
                    purchase_date:Date.now()
                })
                if(order){
                    return res.status(200).json({message:'Order placed successfully',status:true})
                }else{
                    return res.status(500).json({message:'OrderFailed',status:false})
                }
            }else{
                const session = await stripe.checkout.sessions.create({
                    line_items: [
                      {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: '{{PRICE_ID}}',
                        quantity: 1,
                      },
                    ],
                    mode: 'payment',
                    success_url: `${YOUR_DOMAIN}/success.html`,
                    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
                  });
                
                  res.redirect(303, session.url);
            }
        }else{
            return res.status(400).json('Your account is blocked')
        }
    }catch(err){
        return res.status(400).json('something went wrong')
    }
}

export {CheckOut}