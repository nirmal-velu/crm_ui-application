import axios from 'axios';
import React from 'react'
import Stepper from './Stepper';
import { useLocation, useNavigate } from 'react-router-dom';

const StepperMobile = () => {
    const location = useLocation();
    const formData = location.state?.formData;
    const currentStep = location.state?.currentStep;
    const navigate = useNavigate();
    console.log(formData)
    console.log(currentStep)

    const apiBaseurl = process.env.REACT_APP_API_BASE_URL;

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const num: number = parseInt(e.target.value);
        console.log('num', num)
        formData.phoneNumber = num
        console.log(formData.phoneNumber);
        console.log(formData)
    }

    const handlesubmit = async (formData: any) => {
        try {
            const response = await axios.post(apiBaseurl + '/getQuote/generate', formData);
            navigate('/stepperotp', { state: { currentStep } })
            console.log("response", response)
            console.log('Backend response:', response.data);
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }

        console.log('Form Data:', formData);
    };


    return (
        <>
            <div className='container-fluid background-div'>
                <Stepper />
                <div className='mob-num-body p-5'>
                    <p className='mob-num-body-text'>Enter your contact details</p>
                    <div className='mob-num-container'>
                        <p className='mob-num-text'>Whats your mobile number?</p>
                        <div className='mob-num-inputfield'>
                            <input className='mob-num-input' id="mobileNumber" inputMode='numeric' onChange={handleChange} onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                    e.preventDefault();
                                }
                            }}
                                minLength={10}
                                maxLength={10}>
                            </input>
                        </div>
                        <div className='mob-num-text1'>We will send a verification code to the number entered</div>
                        <div className='mob-num-Button' onClick={() => handlesubmit(formData)}><button className='mob-num-button'>Get OTP</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepperMobile;