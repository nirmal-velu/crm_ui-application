import axios from 'axios';
import React from 'react'
import Stepper from './Stepper';
import { useLocation, useNavigate } from 'react-router-dom';
import { CLIENT_RENEG_LIMIT } from 'tls';
import Stepper1 from './Stepper1';

// type StepperMobile = {

//     updateMobileNumber: (newMobileNumber: number) => void;
//     setNextForm: React.Dispatch<React.SetStateAction<boolean>>;
//     formData: any;
// }
const StepperMobile = () => {
    // { updateMobileNumber, formData, setNextForm }
    const location = useLocation();
    const formData = location.state?.formData;
    const navigate = useNavigate()
    console.log(formData)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const num: number = parseInt(e.target.value);
        // setNumber(num);
        console.log('num', num)
        // updateMobileNumber(num);
        formData.phoneNumber = num
        console.log(formData.phoneNumber);
        console.log(formData)
    }

    // console.log('Form Data:', formData);

    const handlesubmit = async (formData: any) => {
        try {
            const response = await axios.post('http://localhost:1301/api/getQuote/generate', formData);
            // setNextForm(false);
            navigate('/stepperotp')
            console.log("response", response)
            console.log('Backend response:', response.data);
        } catch (error) {
            // Handle error
            console.error('Error sending data to the backend:', error);
        }

        console.log('Form Data:', formData);
    };


    return (
        <>
            {/* <div className='mob-num-screen'> */}
            {/* <div className='mob-num-header'>
                <div className='mob-num-title'>
                    <img src='group1.svg' width="38" height="45" className='logo'></img>
                    <p className='mob-num-titlename'>Insurance Company</p>
                </div>
                <div className='mob-num-login-logo'>
                    <p className='mob-num-login-text'>Login</p>
                    <img src='login-logo.svg' width="30" height="30" className='logo'></img>
                </div>
            </div> */}
            <div className='container-fluid background'>
                <Stepper />
                <div className='mob-num-body p-5'>
                    <p className='mob-num-body-text'>Enter your contact details</p>
                    <div className='mob-num-container'>
                        <p className='mob-num-text'>Whats your mobile number?</p>
                        <div className='mob-num-inputfield'>
                            {/* <label htmlFor="mobileNumber"></label> */}
                            <input className='mob-num-input' id="mobileNumber" inputMode='numeric' onChange={handleChange} onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                    e.preventDefault();
                                }
                            }}
                                maxLength={10}>
                            </input>
                        </div>
                        <div className='mob-num-text1'>We will send a verification code to the number entered</div>
                        <div className='mob-num-Button' onClick={() => handlesubmit(formData)}><button className='mob-num-button'>Get OTP</button></div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default StepperMobile;