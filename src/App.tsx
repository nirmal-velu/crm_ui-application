import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Login from './Pages/Login';
import InsuranceCoverage from './Pages/InsuranceCoverage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Register';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import ForgotPasswordOTP from './Pages/ForgotPasswordOTP';
import ForgotNewPassword from './Pages/ForgotNewPassword'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/insurancecoverage' element={<InsuranceCoverage/>}/>
        <Route path='/forgot-password-otp' element={<ForgotPasswordOTP/>}/>
        <Route path='/forgot-new-password' element={<ForgotNewPassword/>}/>
        
        </Routes>
      </Router>

      {/* <Login/> */}
      {/* <InsuranceCoverage/> */}
    </>
  );
}

export default App;
