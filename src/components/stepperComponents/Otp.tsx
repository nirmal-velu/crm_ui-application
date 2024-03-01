import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Stepper from './Stepper';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Back from '../../assets/back-btn.svg'



const StepperOtp = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const currentStep = location.state?.currentStep;
    const navigate = useNavigate();
    // console.log(currentStep)
    const state = useContext(UserContext);

    const handleButtonClick = () => {
        if (otp.length === 4) {
            state.setS1state('true');
            state.setS2state('false');
            state.setColorStep(0);
            localStorage.setItem('activeStepBackgroundColor', '#E73493');
            navigate('/checkout', { state: { stepper1: true, currentStep, resetBackground: true } });
        }
        else {
            console.log('Enter the valid otp');
        }
    }

    const handleBack = () => navigate('/steppermobile')

    const handleOtpChange = (otpValue: React.SetStateAction<string>) => {
        setOtp(otpValue);
        console.log('Updated OTP:', otpValue);
    };

    return (
        <div className='container-fluid background-div'>
            <Stepper />
            <div className='otp-body p-5'>
                <p className='otp-body-text'>Enter your contact details</p>
                <div className='otp-container'>
                    <div className='otp-back' onClick={handleBack}>
                        <img src={Back} width="7" height="10" className='vector-logo'></img>
                        <p className='otp-back-text'>Back</p>
                    </div>
                    <div className='otp-text'>Enter the OTP received</div>
                    <div className='otp-field'>
                        <OtpInput inputStyle={{
                            height: '35px', width: '35px', borderRadius: '8px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#BDBDBD'
                        }}
                            value={otp}
                            onChange={handleOtpChange}
                            numInputs={4}
                            renderSeparator={<span style={{ color: "#fff" }}>-_</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <div className='otp-text1'>We will send a verification code to the number entered</div>
                    {/* <div className='otp-result'>invalid</div> */}
                    <div className='otp-Button'>
                        <button onClick={handleButtonClick} className='otp-button'>Verify</button>
                        {/* <div className={isButtonPressed ? 'steps active' : 'submitted'}> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StepperOtp;