import React from 'react'
// import './Otp.css'
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Stepper from './Stepper';
// import Formstepper from './stepper';

const StepperOtp = () => {
    const [otp, setOtp] = useState('');
    const [isButtonPressed, setButtonPressed] = useState(false);

    const handleButtonClick = () => {
        // Toggle the state when the button is clicked
        setButtonPressed(!isButtonPressed);
        const steps = document.querySelectorAll('.actives')
        steps.forEach(function (step) {
            step.classList.add('bgk')
        })
    }

    const handleOtpChange = (otpValue: React.SetStateAction<string>) => {
        setOtp(otpValue);
        console.log('Updated OTP:', otpValue);
    };

    return (
        // <div className='otp-screen'>
        //     <div className='otp-header'>
        //         <div className='otp-title'>
        //             <img src='group1.svg' width="38" height="45" className='logo'></img>
        //             <p className='otp-titlename'>Insurance Company</p>
        //         </div>
        //         <div className='otp-login-logo'>
        //             <p className='otp-login-text'>Login</p>
        //             <img src='login-logo.svg' width="30" height="30" className='logo'></img>
        //         </div>
        //     </div>
        <div className='container-fluid background'>
                <Stepper/>
        <div className='otp-body p-5'>
            <p className='otp-body-text'>Enter your contact details</p>
            <div className='otp-container'>
                <div className='otp-back'>
                    <img src='Vector.svg' width="7" height="10" className='vector-logo'></img>
                    <p className='otp-back-text'>Back</p>
                </div>
                <div className='otp-text'>Enter the OTP received</div>
                <div className='otp-field'>
                    <OtpInput inputStyle={{
                        height: '35px', width: '30px', borderRadius: '8px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#BDBDBD'
                    }}
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={4}
                        renderSeparator={<span style={{color:"#fff"}}>-_</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <div className='otp-text1'>We will send a verification code to the number entered</div>
                {/* <div className='otp-result'>invalid</div> */}
                <div className='otp-Button'><button onClick={handleButtonClick} className='otp-button'>Verify</button>
                    {/* <div className={isButtonPressed ? 'steps active' : 'submitted'}> */}
                </div>
            </div>
        </div>
        </div>
    )
}
export default StepperOtp;