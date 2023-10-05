import users from "../models/userSchema.js";
import courses from "../models/courseSchema.js";
import Order from "../models/orderSchema.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

// Created stripe with secrete key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const CheckOut = async (req, res) => {
    const { courseId, userId } = req.body;
  try {
    const user = await users.findById(userId);
    if (user.block === false) {
      const course =await courses.findOne({ _id: courseId, block: false });
      if (!course) {
        return res.status(400).json("This couser is unlisted");
      } else {
        if (course.isFree) {
          const order =await Order.create({
            total: course.price,
            user: userId,
            teacher: course.teacher,
            course: courseId,
            address: { line: req.body.address, pincode: req.body.pincode },
            status: true,
            purchase_date: Date.now(),
          });
          console.log('order',order)
          if (order) {
            return res
              .status(200)
              .json({ message: "Order placed successfully", status: true,orderId:order._id });
          } else {
            return res
              .status(500)
              .json({ message: "OrderFailed", status: false });
          }
        } else {
          // Creating New Order with user , tutor , and course Details
          const newOrder = new Order({
            total: course.price,
            course: courseId,
            user: userId,
            teacher: course.teacher,
            address: { line: req.body.address, pincode: req.body.pincode },
            purchase_date: Date.now(),
          });
          newOrder
            .save()
            .then(async (orderResponse) => {
              console.log("orderResp id", orderResponse._id);
              //Creating stripe checkout session with payment details
              const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price_data: {
                      currency: "inr",
                      // providing course details with amount
                      product_data: {
                        name: course.name,

                        images: [course.image],
                      },
                      unit_amount: course.price * 100,
                    },
                    quantity: 1,
                  },
                ],
                mode: "payment",
                // setting customer email with user email
                customer_email: user.email,
                // Setting The payment success routes and cancel routes
                success_url: `${process.env.BASE_URL}/verifyPayment/${orderResponse._id}`,
                cancel_url: `${process.env.BASE_URL}/cancel-payment/${orderResponse._id}`,
              });
              // Passing the session url to the client
              res.json({ url: session.url, orderId: orderResponse._id });
            })
            .catch((err) => {
              console.log(err);
              // res.status(500).json({ status: false, message: "Internal server error" });
              res.redirect(
                `${process.env.CLIENTSIDE_URL}/course-payment/${courseId}`
              );
            });
        }
      }
    } else {
        res.redirect(`${process.env.CLIENTSIDE_URL}/course-payment/${courseId}`)
    //   return res.status(400).json("Your account is blocked");
    }
  } catch (err) {
    console.log(err)
    res.redirect(`${process.env.CLIENTSIDE_URL}/course-payment/${courseId}`)
    // return res.status(400).json("something went wrong");
  }
};

const verifyPayment=async(req,res)=>{
    try{
        Order.findByIdAndUpdate({_id:req.params.orderId},{$set:{status:true}}).then((response)=>{
            if(response){
                res.redirect(`${process.env.CLIENTSIDE_URL}/order-success/`)
                // return res.status(200).json({status:true,message:'Payment successfull'})
            }else{
                res.redirect(`${process.env.CLIENTSIDE_URL}/course-payment/${response.course}`)
                // return res.status(400).json('Payment failed')
            }
        }).catch((err)=>{
            console.log(err)
            res.redirect(`${process.env.CLIENTSIDE_URL}/course-payment/${response.course}`)
            // return res.status(400).json('Something went wrong')
        })

    }catch(err){
        console.log(err)
        res.redirect(`${process.env.CLIENTSIDE_URL}/course-payment/${response.course}`)
        // res.status(400).json('Something went wrong')
    }
}

const cancelPayment=(req,res)=>{
    try{
        Order.findByIdAndDelete({_id:req.params.orderId}).then((response)=>{
            if(response){
                res.redirect(`${process.env.CLIENTSIDE_URL}/order-failed`)
            }else{
                res.redirect(`${process.env.CLIENTSIDE_URL}/order-failed`)
            }
        })
    }catch(err){
        console.log(err)
        // res.redirect(`${process.env.CLIENTSIDE_URL}/course-payment/${response.course}`)
        res.status(400).json('Something went wrong')
    }
}

const isEntrolled=async(req,res)=>{
  try{
    const {courseId}=req.params
    const userId=req.userId
    const exist=Order.findOne({course:courseId,user:userId})
    if(exist){
      return res.status(200).json({entrolled:true,message:'Alredy entrolled'})
    }else{
      return res.status(400).json({entrolled:false,message:'Not entrolled yet'})
    }
  }catch(err){
    return res.status(400).json('something went wrong')
  }
}

export { CheckOut ,verifyPayment,cancelPayment,isEntrolled};
