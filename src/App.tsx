import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import './App.css';
import Login from './Pages/Login';
import InsuranceCoverage from './Pages/InsuranceCoverage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Stepper1 from './components/Stepper1';
import Stepper2 from './components/Stepper2';
import Stepper3 from './components/Stepper3';
import Stepper4 from './components/Stepper4';
import StepperOtp from './components/stepperotp';
import StepperMobile from './components/Steppermobile';
import LandingPage from './Pages/LandingPage';
import ForgotPassword from './Pages/ForgotPassword';
import ForgotPasswordOTP from './Pages/ForgotPasswordOTP';
import ForgotNewPassword from './Pages/ForgotNewPassword'
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Navbar from './Pages/Navbar';


interface ContextValues {
  s1state: string;
  setS1state: Dispatch<SetStateAction<string>>;
  s2state: string;
  setS2state: Dispatch<SetStateAction<string>>;
  s3state: string;
  setS3state: Dispatch<SetStateAction<string>>;
  colorStep: number;
  setColorStep: Dispatch<SetStateAction<number>>;

}
// localStorage.clear()
const initialContextValues: ContextValues = {
  s1state: 'false',
  setS1state: () => { },
  s2state: 'false',
  setS2state: () => { },
  s3state: 'false',
  setS3state: () => { },
  colorStep: -1, // Set the default color step value here
  setColorStep: () => { },
};

export const UserContext = createContext(initialContextValues);

function App() {
  const storedS1 = localStorage.getItem('s1state') || 'false';
  const storedS2 = localStorage.getItem('s2state') || 'false';
  const storedS3 = localStorage.getItem('s3state') || 'false';
  const storedColorStep = localStorage.getItem('colorStep');
  const initialColorStep = storedColorStep ? parseInt(storedColorStep, 10) : 0;

  const [s1state, setS1state] = useState(storedS1);
  const [s2state, setS2state] = useState(storedS2);
  const [s3state, setS3state] = useState(storedS3);
  const [colorStep, setColorStep] = useState<number>(initialColorStep);

  useEffect(() => {
    localStorage.setItem('s1state', s1state);
    localStorage.setItem('s2state', s2state);
    localStorage.setItem('s3state', s3state);
    localStorage.setItem('colorStep', colorStep.toString());
  }, [s1state, s2state, s3state, colorStep]);

  const values = {
    s1state,
    setS1state,
    s2state,
    setS2state,
    s3state,
    setS3state,
    colorStep,
    setColorStep
  };

  const [showStepper, setShowStepper] = useState(false);

  // useEffect(() => {
  //   if (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/insurancecoverage' || window.location.pathname === '/navbar' || window.location.pathname === '/register') {
  //     setShowStepper(false);
  //   } else {
  //     setShowStepper(true);
  //   }
  // }, []);

  return (
    <>
      <UserContext.Provider value={{ ...values, colorStep, setColorStep }}>
        <Router>
          {/* {showStepper && <Stepper />} */}
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/insurancecoverage' element={<InsuranceCoverage />} />
            <Route path='/stepperlist' element={<Stepper1 />} />
            <Route path='/steppermobile' element={<StepperMobile />} />
            <Route path='/stepperotp' element={<StepperOtp />} />
            <Route path='/checkout' element={<Stepper2 />} />
            <Route path='/healthinfo' element={<Stepper3 />} />
            <Route path='/approval' element={<Stepper4 />} />
            <Route path='/ins' element={<InsuranceCoverage />} />
            <Route path='/insurancecoverage' element={<InsuranceCoverage />} />
            <Route path='/forgot-password-otp' element={<ForgotPasswordOTP />} />
            <Route path='/forgot-new-password' element={<ForgotNewPassword />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/navbar' element={<Navbar />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;