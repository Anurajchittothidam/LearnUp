import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

let OtpValue;

const sendEmail=(email)=>{
    const OTP=Math.floor(1000+Math.random()*9000)
    return new Promise((resolve,reject)=>{
        const transporter=nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            },
        })

        var mailOptions={
            from: process.env.EMAIL,
            to: email,
            subject: "LearnUp Email verification",
            html: `
            <h1>Verify Your Email For LearnUp</h1>
              <h3>use this code in LearnUp application to verify your email</h3>
              <h2>${OTP}</h2>
            `,
          }
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("error", error, info)
              reject(error)

            } else {
              console.log("success")
              OtpValue = OTP
              console.log(OTP)
              resolve({success:true, message:"Email sent successfull"})
            }
          });
    })
}

const verifyOTP=(Otp)=>{
    return new Promise((resolve,reject)=>{
        if(OtpValue==Otp){
            resolve({status:true})
        }else{
            reject({staus:false})
        }
    }).catch((err)=>{
        console.log(err)
    })
}

export {sendEmail,verifyOTP}