
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './Otp.css';
import {addTeachersOtp,addTeacherResendOtp} from '../../services/adminApi'
import { resendOtp, userSignupOtp, verifyForgot } from '../../services/userApi';
import { teacherSignupOtp,verifyTeacherForgot,teacherResendOtp } from '../../services/teacherApi';
function Otp(props) {
    const [isLoading,setIsLoading]=useState(false)
    const navigate = useNavigate();
    const inputRef = useRef({});
    const [remainingTime, setRemainingTime] = useState(60);

    function validate(values) {

        const errors = {};
        
        if (Object.values(values.otp).some(data => data === "")) {
            errors.otp = "Please enter the otp";
        }
        if (errors.otp) {
            Object.values(values.otp).map((value, index) => {
                inputRef.current[index].classList.add('input-box-error')
            })
        } else {
            Object.values(values.otp).map((value, index) => {
                inputRef.current[index].classList.remove('input-box-error')
            })
        }
        return errors;

    }

    const formik = useFormik({
        initialValues: {
            otp: Array.from({ length: 4 }).fill(""),
        },
        validate,
        onSubmit: (values) => {
            handleSubmit(values)
        }

    })

    const handleSubmit=(values)=>{
        setIsLoading(true)
        console.log("handle Submit");
        if(props.data==='admin'){
            addTeachersOtp(values)
            .then((response) => {
                if (response) {
                    navigate("/admin/teachers")
                }else{
                    toast.error(response.data.message)
                }
            }).catch((err)=>{
                toast.error(err.message)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.data==='teacher'){
            console.log('dfsf')
            teacherSignupOtp(values)
        .then((response) => {
            if (response) {
                navigate("/teachers/login")
            }else{
                toast.error(response.data.message)
            }
        }).catch((err)=>{
            toast.error(err.message)
        }).finally(()=>{
            setIsLoading(false)
        })
        }else if(props.data==='user'){
            userSignupOtp(values).then((response)=>{
                if(response){
                    navigate('/login')
                }else{
                    toast.error(response.data.message)
                }
            }).catch((err)=>{
                toast.error(err.message)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.data==='user-forgot'){
            verifyForgot(values).then((response)=>{
                if(response){
                    navigate('/login')
                }else{
                    toast.error('error')
                    toast.error(response.data.message)
                }
            }).catch((err)=>{
                toast.error(err.message)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.data==='teacher-forgot'){
            verifyTeacherForgot(values).then((response)=>{
                if(response){
                    navigate('/teachers/login')
                }else{
                    toast.error(response.data)
                }
            }).catch((err)=>{
                console.log(err)
                toast.error(err.message)
            }).finally(()=>{
                setIsLoading(false)
            })
        }
        else{
            toast.error('props error')
        }
        
    }

    const [otp, setOtp] = useState({
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: ""
    })

    useEffect(() => {

        inputRef.current[0].focus();

        inputRef.current[0].addEventListener("paste", pasteText);

        // if (remainingTime > 0) {
        //     const interval = setInterval(() => {
        //       setRemainingTime(prevTime => prevTime - 1);
        //     }, 1000);
      
        //     return () => clearInterval(interval);
        //   }
        // return () => inputRef.current[0].removeEventListener("paste", pasteText)
    }, [remainingTime])

    function pasteText(event) {
        const pastedText = event.clipboardData.getData('text');

        const fieldValues = {}
        Object.keys(otp).forEach((key, index) => {
            fieldValues[key] = pastedText[index];
        })

        setOtp(fieldValues);

        inputRef.current[3].focus()
    }

    function handleChange(event, index) {
        const { value } = event.target;

        if (/[a-z]/gi.test(value)) return

        const currentOtp = [...formik.values.otp];

        currentOtp[index] = value.slice(-1);


        formik.setValues((prev) => ({
            ...prev,
            otp: currentOtp
        }))




        if (value && index < 3) {
            inputRef.current[index + 1].focus()
        }
    }

    function handleBack(event, index) {
        if (event.key === "Backspace") {
            if (index > 0) {
                inputRef.current[index - 1].focus();
            }
        }
    }

    function renderInput(keys) {
        return formik.values.otp.map((value, index) => (
            <input
                key={index}
                type="text"
                ref={(element) => (inputRef.current[index] = element)}
                name={value}
                value={value}
                className='w-16 h-12 rounded text-center text-xl input-box-border otp-input-box mr-3 '
                onChange={(event) => { handleChange(event, index) }}
                onKeyUp={(event) => { handleBack(event, index) }}
            />

        ))
    }

    function  handleResend(){
        setIsLoading(true)
        if(props.data==='user'){
            resendOtp().then((res)=>{
                if(res){
                    navigate('/otp')
                }else{
                    toast.error(res.data.message)
                }
            }).catch((err)=>{
                toast.error(err)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.data==='teacher'){
            teacherResendOtp().then((res)=>{
                if(res){
                    navigate('/teachers/otp')
                }else{
                    toast.error(res.data.message)
                }
            }).catch((err)=>{
                toast.error(err)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.data==='admin'){
                addTeacherResendOtp().then((result)=>{
                  if(result){
                    navigate('/admin/teachers/otp')
                  }else{
                    toast.error(result.data.message)
                  }
                }).catch((err)=>{
                  toast.error(err)
                }).finally(()=>{
                  setIsLoading(false)
                })
        }else if(props.data==='user-forgot'){
            resendOtp().then((res)=>{
                if(res){
                    navigate('/user-forgot/otp')
                }else{
                    toast.error(res.data.message)
                }
            }).catch((err)=>{
                toast.error(err)
            }).finally(()=>{
                setIsLoading(false)
            })
        }else if(props.data==='teacher-forgot'){
            teacherResendOtp().then((res)=>{
                if(res){
                    navigate('/teachers/forgot')
                }else{
                    toast.error(res.data.message)
                }
            }).catch((err)=>{
                toast.error(err)
            }).finally(()=>{
                setIsLoading(false)
            })
        }
        else{
            toast.error('props error')
        }
        
    }

    return (
        <section className='section-box'>
            {isLoading ? (
              <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
              <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
                <i className="fas fa-circle-notch fa-spin fa-5x"></i>
              </span>
              </div>
            ) : (
              <>
            <form action="">
                <div className='grid-cols-1 shadow-none sm:shadow-xl form-box p-7'>
                    <h2 style={{ color: "#6255a4" }} className='text-center text-2xl font-medium pb-5'>Enter OTP</h2>
                    <p className='text-center pb-6'>We sent you a verification code to your email</p>
                    <span className="countdown">
                        <span className='text-red-400'>{remainingTime}</span>
                    </span>
                        <div className='text-center flext justify-center'>
                            {renderInput()}
                        </div>

                    {formik.errors.otp && <p className='text-center text-red-600 pt-5 '>Please enter the otp</p>}

                    <div className='flex justify-center mt-5'>
                        <button className='form-btn mt-2 font-medium rounded'
                            onClick={formik.handleSubmit}
                            type="button">
                            Submit
                        </button>
                    </div>
                    <button className='text-blue-500' onClick={handleResend}>resend</button>
                </div>
            </form>
            <ToastContainer/>
     
            </>
            )}
                   <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
        </section >
    )
}

export default Otp