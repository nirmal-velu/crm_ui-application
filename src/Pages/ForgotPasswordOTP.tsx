import React, { FormEvent } from "react";
import insurance from "../assets/insurance.svg";
import "../css/LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import mobileimg from "../assets/mobileLogo.svg";
import AuthService, { VerifyOtpPayload } from "../service/authservice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


// ... (your existing imports and code)

// ... (your existing imports and code)

interface Props { }

const ForgotPasswordOTP: React.FC<Props> = () => {
  const [emailId, setEmailId] = useState<any>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);


  const navigate = useNavigate();
  const otpInputRefs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const alphabetRegex = /^[a-zA-Z@.]+$/;

    if (alphabetRegex.test(value)) {
      const email = value.toLowerCase();
      setEmailId(email);
    } else if (/^\d+$/.test(value)) {
      setPhoneNo(value);
    }
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   // Check if all OTP fields are filled
  //   if (otp.some(digit => !digit)) {
  //     // setErrorMessage("Please fill out all OTP fields.");
  //     setError(true);

  //     // Display tooltip message


  //     return;
  //   }

  //   try {
  //     let response;
  //     // Your existing code for API call goes here...

  //     setError(false);
  //   } catch (error: any) {
  //     console.error("API call error:", error);
  //     setErrorMessage(error.response?.data.message || "Error generating OTP. Please try again.");
  //     setError(true);
  //   }
  // };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if all OTP fields are filled
    if (otp.some(digit => !digit)) {
      setError(true);
      setErrorMessage("Please fill out all OTP fields.");
      return;
    }

    try {

      console.log('Before Retrieval - Local Storage:', localStorage);
      localStorage.setItem('userIdentifier', 'http://localhost:3001');

      // Retrieve the value from localStorage
      const userIdentifier = localStorage.getItem('enteredEmail');

      // Log the value to the console
      console.log('User Identifier:', userIdentifier);
      if (!userIdentifier) {
        setError(true);
        setErrorMessage("User identifier not found. Please try again.");
        return;
      }

      const otpVerificationLink = '/register/forgotPassword/verify-otp'; // Assuming this is your route
      const otpValue = otp.join(''); // Concatenate the OTP digits into a single string

      const payload: VerifyOtpPayload = {
        otp: otpValue,
      };

      // Determine whether to include phoneNumber or email in the payload based on local storage value
      if (userIdentifier.includes('@')) {
        payload.email = userIdentifier as string;
      } else {
        payload.phoneNumber = userIdentifier as string;
      }

      // Make the API call
      const response = await AuthService.verifyOtp(payload, otpVerificationLink);

      // Log the response status code to the console
      console.log('Response Status Code:', response.statusCode);

      // Check if response.data is null before accessing the message property
      const message = response.data ? response.data.message : null;

      // Display the message based on success or error
      if (response.statusCode === 200) {
        // It's a success, log to the console and navigate to the next screen
        console.log('OTP verified successfully!');
        navigate("/forgot-new-password");
      } else {
        // It's an error, log to the console and set error state and error message
        console.error('Error verifying OTP:', message);
        setError(true);
        setErrorMessage(message || "Error verifying OTP. Please try again.");
      }

      // Clear error state for subsequent attempts
      setError(false);
    }
    catch (error: any) {
      console.error("API call error:", error);
      setErrorMessage(error.response?.data.message || "Error verifying OTP. Please try again.");
      setError(true);
    }
  };


  const handleClose = () => {
    setError(false);
    setErrorMessage(null);
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the previous input box if backspace is pressed
    if (!value && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }

    // Move to the next input box automatically
    if (value && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  return (
    <>
      <div id="login-container-id">
        <div className="left-container">
          <form onSubmit={handleSubmit}>
            <div className="login-page-div">
              <img className="insurance-log-img" src={insurance} alt="insurance" />
              <span style={{ color: "#36256E" }} className="insurance-txt">
                Insurance Company
              </span>
            </div>

            <div className="login-border">
              <div className="login-page-border">
                <h2 id="login-page-txt">OTP Verification</h2>
              </div>
              <div className="input-field-div">

                <div className="otp-inputs" style={{ textAlign: 'center' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      maxLength={1}
                      required
                      style={{
                        width: '2.5em',
                        height: '2.5em',
                        fontSize: '1em',
                        margin: '0 0.3em',
                        textAlign: 'center',
                        border: `1px solid ${digit ? '#4A5568' : '#ccc'}`, // Added dynamic border color
                        borderRadius: '3px',
                        outline: 'none',
                      }}
                      ref={otpInputRefs[index]}
                    />
                  ))}
                </div>
                {/* {error ? <span>Error message</span> : <span></span>} */}
                <button type="submit" id="login-btn">
                  Verify OTP
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="right-container">
          <Snackbar
            open={error}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="error"
              onClose={handleClose}
            >
              {errorMessage}
            </MuiAlert>
          </Snackbar>
          <div className="login-content-div">
            <div className="align-content-div">
              <p>Incredibly low premiums</p>
              <p>100% paperless & digital</p>
              <p>Hassle-free claims</p>
            </div>
          </div>
          <div className="phone-img-div">
            <img src={mobileimg} id="phone-img" alt="phone" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordOTP;
