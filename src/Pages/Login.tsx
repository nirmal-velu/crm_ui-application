import React, { FormEvent } from 'react'
import insurance from '../assets/insurance.svg';
import '../css/LandingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import mobileimg from '../assets/mobileLogo.svg'
import AuthService from '../service/authservice';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";




interface Props { }

const Login: React.FC<Props> = () => {
    const [emailId, setEmailId] = useState<any>('');
    const [phoneNo, setPhoneNo] = useState<string>()
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            console.log("number")
            setPhoneNo(value);
            setInputType('number');
        }
        else {
            console.log("text")
        }
    };


    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const pass = e.target.value;
        setPassword(pass)
    }

    const redirectToRegisterPage = () => {
        navigate('/register');
    };

    const setForgotPasswordVisible = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            if (inputType === "email") {
                const body = {
                    "email": emailId,
                    "password": password
                };

                const response = await AuthService.Login(body);

                if (response.statusCode === 200) {
                    navigate('/dashboard');
                } else {
                    setErrorMessage(
                        response.message || "Error Login. Please try again."
                    );
                }

                setError(false);
            } else if (inputType === "number") {
                const data = {
                    "phoneNumber": phoneNo,
                    "password": password
                };

                const response = await AuthService.Login(data);

                if (response.statusCode === 200) {
                    navigate('/dashboard');
                } else {
                    setErrorMessage(
                        response.message || "Error Login. Please try again."
                    );
                }

                console.log("submit called");
                setError(false);
            } else {
                setError(true);
            }
        } catch (error: any) {
            console.error("Error:", error.message);
            setErrorMessage(
                error.response.data.message || "Error generating OTP. Please try again."
            );
            setError(true);
            // Handle the error as needed, e.g., set an error state or display a message.
        }
    };


    const handleClose = () => {
        setError(false);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    return (
        <>
            <div className='container-fluid login-container-id'>
                <div className='left-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='login-page-div mt-xxl-2'>
                            <img className='insurance-log-img' src={insurance} alt='insurance' /><span style={{ color: "#36256E" }} className='insurance-txt'>Insurance Company</span>
                        </div>

                        <div className='login-border'>
                            <div className='login-page-border mt-xxl-4'>
                                <h2 id='login-page-txt'>Login to your account</h2>
                            </div>
                            <div className='input-field-div mt-xxl-5'>
                                <label id='email-label'>Email or Phone Number</label>

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

                                <label className='password-label mt-xxl-4'>Password</label>
                                <input type='password' id='password-input' placeholder='Password' value={password} onChange={handlePassword} />

                                {error ? <span>error</span> : <span></span>}
                                <button type='submit' className='mt-xxl-5' id='login-btn'>Login</button>

                            </div>
                        </div>
                    </form>
                    <footer className='footer-div'>
                        <div className='footer-login-div'>
                            <div className='Register-div'>
                                <p id='register-account-txt'>Don’t have an account?</p><span onClick={redirectToRegisterPage} id='register-txt'> Register</span>
                            </div>
                            <div className='forgot-pass-div'>

                                <span onClick={setForgotPasswordVisible} id='forgot-pass-txt'>Forgot Password ? </span>
                            </div>
                        </div>
                    </footer>

                </div>

                <div className='right-container background-div'>
                    <Snackbar
                        open={error || successMessage !== null}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MuiAlert
                            elevation={6}
                            variant={error ? "filled" : "filled"}
                            severity={error ? "error" : "success"}
                            onClose={handleClose}
                        >
                            {error && errorMessage && errorMessage}
                            {successMessage && successMessage}
                        </MuiAlert>
                    </Snackbar>
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

export default Login

