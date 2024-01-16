import React from 'react';
import logo from './logo.svg';
import './App.css';
// import './components/Stepper.css'
import LandingPage from './LandingPage/LandingPage';
import Login from './Pages/Login';
import InsuranceCoverage from './Pages/InsuranceCoverage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import ForgotPasswordOTP from './Pages/ForgotPasswordOTP';
import ForgotNewPassword from './Pages/ForgotNewPassword'
import { useState } from 'react';
import Stepper from './components/Stepper';
import Stepper1 from './components/Stepper1';
import Stepper3 from './components/Stepper3';
import Stepper4 from './components/Stepper4';
import Famdetails from './components/FamilyDetailsPage/FamilyDetails';
import Register from './Pages/RegisterPage/Register';
import StepperMobile from './components/Steppermobile';
import StepperOtp from './components/stepperotp';
import Stepper2 from './components/Stepper2';
// import Checkout from './Pages/Checkout/Checkout';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/insurancecoverage' element={<InsuranceCoverage />} />
          <Route path='/stepperlist' element={<Stepper1 />} />
          <Route path='/steppermobile' element={<StepperMobile />} />
          <Route path='/stepperotp' element={<StepperOtp />} />
          <Route path='/checkout' element={<Stepper2 />} />
          <Route path='/healthinfo' element={<Stepper3 />} />
          <Route path='/approval' element={<Stepper4 />} />
          <Route path='/forgot-password-otp' element={<ForgotPasswordOTP />} />
          <Route path='/forgot-new-password' element={<ForgotNewPassword />} />
          {/* <Route path='/quote-details' element={<Famdetails/>}/> */}
          {/* <Route path='/checkout' element={<Checkout/>}/> */}
        </Routes>
      </Router>

      {/* <Login/> */}
      {/* <InsuranceCoverage/> */}




    </>
  );
}

export default App;