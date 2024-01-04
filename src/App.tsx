import React from 'react';
import logo from './logo.svg';
import './App.css';
// import './components/Stepper.css'
import LandingPage from './LandingPage/LandingPage';
import Login from './Pages/Login';
import InsuranceCoverage from './Pages/InsuranceCoverage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/RegisterPage/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import ForgotPasswordOTP from './Pages/ForgotPasswordOTP';
import ForgotNewPassword from './Pages/ForgotNewPassword'
import { useState } from 'react';
import Stepper from './components/Stepper';
import Stepper1 from './components/Stepper1';
import Stepper2 from './components/Stepper2';
import Stepper3 from './components/Stepper3';
import Stepper4 from './components/Stepper4';
import Famdetails from './components/FamilyDetailsPage/FamilyDetails';

function App() {

  const list = [
    <Stepper1 />,
    <Stepper2 />,
    <Stepper3 />,
    <Stepper4 />
    // <Example5 />
  ];
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
          <Route path='/forgot-password-otp' element={<ForgotPasswordOTP />} />
          <Route path='/quote-details' element={<Famdetails />} />
          <Route path='/stepperlist' element={<Stepper list={list} />} />
        </Routes>
      </Router>

      {/* <Login/> */}
      {/* <InsuranceCoverage/> */}




    </>
  );
}

export default App;
