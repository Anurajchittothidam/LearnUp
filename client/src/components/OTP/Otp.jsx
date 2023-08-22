
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik, Formik } from 'formik';
import './Otp.css';
// import 'boxicons/css/boxicons.min.css';
import {addTeachersOtp} from '../../services/adminApi'
function Otp() {
    const navigate = useNavigate();
    const inputRef = useRef({});
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
        console.log("handle Submit");
        addTeachersOtp(values)
        .then((response) => {
            console.log(response.data);
            if (response.data.status) {
                navigate("/admin/teachers")
            }
        })
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

        // return () => inputRef.current[0].removeEventListener("paste", pasteText)
    }, [])

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

    return (
        <section className='section-box'>
            <form action="">
                <div className='grid-cols-1 shadow-none sm:shadow-xl form-box p-7'>
                    <h2 style={{ color: "#6255a4" }} className='text-center text-2xl font-medium pb-5'>Enter OTP</h2>
                    <p className='text-center pb-6'>We sent you a verification code to your email</p>
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

                </div>
            </form>
        </section >
    )
}

export default Otp