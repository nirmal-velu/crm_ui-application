import React, { useState } from 'react'
import '../css/Register.css'
import axios from 'axios'
import insurance from '../assets/insurance.svg';
import mobileimg from '../assets/mobileLogo.svg'
import { useNavigate } from 'react-router-dom';

function Register() {

    // const navigate = useNavigate();

    const initvalues = {
        "fullName": "",
        "email": "",
        "phoneNumber": "",
        "password": "",
        "confirmPassword": "",
        "createdOn": "2023-11-29T09:20:21.707Z",
        "createdBy": "string"
    }

    const [details, setDetails] = useState(initvalues)


    const [Error, setError] = useState<Partial<typeof initvalues>>({})

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    const [result, setResult] = useState('')


    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }))
    }


    const validate = (values: typeof initvalues) => {
        const error: Partial<typeof initvalues> = {}

        if (!values.fullName) {
            error.fullName = "name is required"
        }
        if (!values.email) {
            error.email = "email is required"
        }
        else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
            error.email = 'Invalid email address';
        }
        if (!values.phoneNumber) {
            error.phoneNumber = " number is required"
        }
        else if (!/^\d{10}$/.test(values.phoneNumber)) {
            error.phoneNumber = 'Invalid phone number';
        }
        if (!values.password) {
            error.password = "password is required"
        }
        else if (values.password.length < 8) {
            error.password = 'Password must be at least 8 characters';
        }
        if (!values.confirmPassword) {
            error.confirmPassword = "confirm password is required"
        }
        else if (values.confirmPassword !== values.password) {
            error.confirmPassword = 'Passwords do not match';
        }
        return error
    }


    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationError = validate(details);
        if (Object.keys(validationError).length > 0) {
            console.log("error added")
            setError(validationError);
        }
        // await setError(validate(details));

        // const response = await axios.post('http://localhost:8081/api/register/register', details)
        // console.log(response.data)
        // console.log("added")

        try {
            if (!Object.keys(validationError).length) {
                setError({})
                console.log("no error form added")
                const response = await axios.post(apiBaseUrl + '/register/register', details);
                console.log(response.data.message);
                setResult(response.data.message);
                console.log("added");
                setDetails({
                    "fullName": "",
                    "email": "",
                    "phoneNumber": "",
                    "password": "",
                    "confirmPassword": "",
                    "createdOn": "2023-11-29T09:20:21.707Z",
                    "createdBy": "string"
                })
                // navigate('/dashboard');
            }
        }
        catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    console.log(details)


    return (
        <>
            <div className='container1'>
                <div className='first-section'>
                    <div className='header'>
                        <img src={insurance} alt='Logo' width="38" height="45"></img>
                        <h1>Insurance Company</h1>
                    </div>
                    <div className='reg-form'>
                        <form onSubmit={handlesubmit}>
                            <div className='ins-title'>Create  a  Secure  Account</div>
                            <div className='subtitle'>Welcome to the future of insurance</div>
                            <div className='inputfield1'>
                                <label>Full Name </label>
                                <br></br>
                                <input className='input'
                                    placeholder='Full Name'
                                    name="fullName"
                                    value={details.fullName}
                                    onChange={handlechange}
                                    type='text'
                                    id='f1'
                                    onKeyDown={(e) => {
                                        if (!/[a-zA-Z]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                            e.preventDefault();
                                        }
                                        if (e.key == 'Enter') {
                                            e.preventDefault();
                                            const nf = document.getElementById('f2')
                                            nf?.focus();
                                        }
                                    }}
                                    maxLength={20}>
                                </input>
                            </div>
                            <p className='reg-err-msg'>{Error.fullName ? <span>{Error.fullName}</span> : ""}</p>
                            <div className='inputfield1'>
                                <label>Email Address </label>
                                <br></br>
                                <input className='input'
                                    type='text'
                                    placeholder='Email Address'
                                    name="email"
                                    value={details.email}
                                    id='f2'
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            e.preventDefault();
                                            const nf = document.getElementById('f3')
                                            nf?.focus();
                                        }
                                    }}
                                    onChange={handlechange}>
                                </input>
                            </div>
                            <p className='reg-err-msg'>{Error.email ? <span>{Error.email}</span> : ""}</p>
                            <div className='inputfield1'>
                                <label>Phone Number </label>
                                <br></br>
                                <input className='input'
                                    type='tel'
                                    inputMode='numeric'
                                    placeholder='Phone Number'
                                    name="phoneNumber"
                                    value={details.phoneNumber}
                                    id='f3'
                                    onChange={handlechange}
                                    onKeyDown={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                            e.preventDefault();
                                        }
                                        if (e.key == 'Enter') {
                                            e.preventDefault();
                                            const nf = document.getElementById('f4')
                                            nf?.focus();
                                        }
                                    }}
                                    maxLength={10}>
                                </input>
                            </div>
                            <p className='reg-err-msg'>{Error.phoneNumber && <span>{Error.phoneNumber}</span>}</p>
                            <div className='inputfield1'>
                                <label>Password </label>
                                <br></br>
                                <input className='input'
                                    type='password'
                                    placeholder='Password'
                                    name="password"
                                    value={details.password}
                                    id='f4'
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            e.preventDefault();
                                            const nf = document.getElementById('f5')
                                            nf?.focus();
                                        }
                                    }}
                                    onChange={handlechange}
                                    maxLength={10}>
                                </input>
                            </div>
                            <p className='reg-err-msg'>{Error.password && <span>{Error.password}</span>}</p>
                            <div className='inputfield1'>
                                <label>Confirm password </label>
                                <br></br>
                                <input className='input'
                                    placeholder='Confirm password'
                                    name="confirmPassword"
                                    type='password'
                                    value={details.confirmPassword}
                                    id='f5'
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            const nf = document.getElementById('button')
                                            nf?.focus();
                                        }
                                    }}
                                    onChange={handlechange}
                                    maxLength={10}>
                                </input>
                            </div>
                            <p className='reg-err-msg'>{Error.confirmPassword && <span>{Error.confirmPassword}</span>}</p>
                            <p id='success'>{result}</p>
                            <div className='Button'><button type='submit' id='button' className='button'> CREATE ACCOUNT</button></div>
                        </form>
                    </div>
                </div>
                <div className='second-section'>
                    <div className='ss-text'>
                        <h3>Incredibly low premiums</h3>
                        <h3> 100% paperless & digital</h3>
                        <h3>Hassle-free claims</h3>
                    </div>
                    <div className='image1'>
                        <img src={mobileimg} alt='Image' width="350" height="250" ></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
