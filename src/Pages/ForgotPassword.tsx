import React, { FormEvent } from 'react'
import insurance from '../assets/insurance.svg';
import '../LandingPage/LandingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import mobileimg from '../assets/mobileLogo.svg'
import AuthService from '../service/authservice';




interface Props { }

const ForgotPassword: React.FC<Props> = () => {
    const [emailId, setEmailId] = useState<any>('');
    const [phoneNo, setPhoneNo] = useState<string>()
    // const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false)


    const [inputType, setInputType] = useState<any>('text')
    const [inputValue, setInputValue] = useState<string>('')
    
    const navigate = useNavigate();

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(value)
        const alphabetRegex = /^[a-zA-Z@.]+$/;

        if (alphabetRegex.test(value)) {
            console.log("email @" + value)
            console.log("email")

            const email = value.toLowerCase();
            setInputType('email');
            setEmailId(email);
        } else if (/^\d+$/.test(value)) {
            // const number=value.slice(0,20);
            console.log("number")
            setPhoneNo(value);
            // Check if the input contains only digits
            setInputType('number');
        }
        else {
            console.log("text")
            setInputType('text');
            setInputValue(value);
        }
    };



    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const pass = e.target.value;
        //setPassword(pass)
    }


    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
       
        if (inputType == "email") {
            const body = {
                "email": emailId,
                //"newPassword": password
            }
            //const response = axios.post(apiBaseUrl + "register/generate-otp", body)

            const response = await AuthService.generateOtp(body);

            setError(false);
        } else if (inputType == "number") {
            const data = {
                "phoneNumber": phoneNo,
               // "newPassword": password
            }
            //const response = axios.post(apiBaseUrl + "register/generate-otp", data)

            const response = await AuthService.generateOtp(data);

            console.log("testing", response)

            if (response.statusCode === 200) {
                navigate('/register'); // Use navigate to go to the register page OTP SCREEN
              } else {
                setError(true);
              }

            console.log("submit called")
            setError(false)
        } else {
            setError(true)
        }

    };

    return (
        <>
            <div id='login-container-id'>
                <div className='left-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='login-page-div'>
                            <img className='insurance-log-img' src={insurance} alt='insurance' /><span style={{ color: "#36256E" }} className='insurance-txt'>Insurance Company</span>
                        </div>

                        <div className='login-border'>
                            <div className='login-page-border'>
                                <h2 id='login-page-txt'>Forgot-Password</h2>
                            </div>
                            <div className='input-field-div'>
                                <label id='email-label'>Email or Phone Number</label>
                                {/* <input type='text' id='email-id-input' placeholder='Email or Phone Number' value={emailId} onChange={handleEmailData} /> */}
                                {inputType === 'text' && (
                                    <input
                                        type="text"
                                        className='email-id-input'
                                        value={inputValue}
                                        autoFocus
                                        required
                                        onChange={handleInputChange}
                                        placeholder='Email or Phone Number' />
                                )}
                                {inputType === 'email' && (
                                    <input
                                        type="email"
                                        className='email-id-input'
                                        value={emailId}
                                        autoFocus
                                        required
                                        onChange={handleInputChange}
                                        placeholder='Email or Phone Number' />
                                )}
                                {inputType === 'number' && (
                                    <input
                                        type="number"
                                        className='email-id-input'
                                        value={phoneNo}
                                        autoFocus
                                        required
                                        onChange={handleInputChange}
                                        placeholder='Email or Phone Number' />
                                )}

                                {/* <label className='password-label'>Enter New Password</label>
                                <input type='password' id='password-input' placeholder='Password' value={password} onChange={handlePassword} /> */}
                                {/* <div className='btn-div'> */}
                                {error ? <span>error</span> : <span></span>}
                                <button type='submit' id='login-btn'>Change Password</button>
                                 {/* </div> */}
                            </div>
                        </div>
                    </form>

                </div>

                <div className='right-container'>
                    <div className='login-content-div'>
                        <div className='align-content-div'>
                            <p> Incredibly low premiums</p>
                            <p>100% paperless & digital</p>
                            <p>Hassle-free claims</p>
                        </div>
                    </div>
                    <div className='phone-img-div'>
                        <img src={mobileimg} id='phone-img' />
                    </div>

                </div>
            </div>
        </>

    )
}

export default ForgotPassword

