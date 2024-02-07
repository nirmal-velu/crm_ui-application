import React, { useState, ReactElement, ReactNode, useEffect, useContext } from "react";
import '../css/Stepper.css'
import insurance from '../assets/insuranceLogo.svg'
import login from '../assets/login-logo.png'
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";



interface StepperProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const Stepper: React.FC<StepperProps> = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const steps: ReactNode[] = [];
  const steps1: ReactNode[] = [];
  const stepsArray = ['Quote', 'Checkout', 'Health Info', 'Approval'];
  const states = useContext(UserContext)
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/stepperlist':
        setCurrentStep(0);
        console.log("step 1")
        break;

      case '/checkout':
        setCurrentStep(1);
        console.log("step 2")
        break;

      case '/healthinfo':
        setCurrentStep(2);
        console.log("step 3")
        break;

      case '/approval':
        setCurrentStep(3);
        console.log("step 4")
        break;
      default:
        break;
    }
  }, [location.pathname]);


  const handleStepClick = (stepIndex: number) => {

    switch (stepIndex) {
      case 0:
        navigate('/stepperlist');
        break;
      case 1:
        if (states.s1state === 'true') {
          navigate('/checkout');
          console.log(states.s1state)
        }
        break;
      case 2:
        if (states.s2state === 'true') {
          navigate('/healthinfo');
          console.log(states.s2state)
        }
        break;
      case 3:
        if (states.s3state === 'true') {
          navigate('/approval');
          console.log(states.s3state)

        }
        break;
      default:
        break;
    }

  };
  const handleFocus = (i: number) => {
    const indicatorElement = document.getElementById("indicator");
    if (indicatorElement) {
      indicatorElement.classList.remove('backgroundColor');
    }
  };


  for (let i = 0; i < 4; i++) {
    const backgroundColor = localStorage.getItem('activeStepBackgroundColor') || 'null';
    steps.push(
      <div
        id="indicator"
        onFocus={() => handleFocus(i)}
        onClick={() => handleStepClick(i)}
        className={`steps ${currentStep >= i ? "actives" : ""} `}
        style={{ backgroundColor: states.colorStep !== undefined && states.colorStep >= i ? backgroundColor : '' }}
        data-step={i}
        key={i}
      >
      </div>
    );
  }

  for (let i = 0; i < 4; i++) {
    const backgroundColor = localStorage.getItem('activeStepBackgroundColor') || 'null';
    steps1.push(
      <div
        onClick={() => handleStepClick(i)}
        className={`steps1 ${currentStep >= i ? "active" : ""}`}
        style={{ color: states.colorStep !== undefined && states.colorStep >= i ? backgroundColor : '' }}
        key={i}
      >{stepsArray[i]}
      </div>
    );
  }
  const onPrev = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    if (currentStep !== 4 - 1) {
      setCurrentStep(currentStep + 1);
    }
    console.log(currentStep + "currentStep")
  };

  return (
    <>
      <div className={`container-fluid stepper ${formSubmitted ? 'form-submitted-bg' : ''}`}>
        <div className="row d-flex p-2 justify-content-between align-items-center mt-xxl-3" >
          <div className="col-auto ms-2">
            <img className='me-3' src={insurance} /><span className='insurance-txt'>Insurance Company</span>
          </div>
          <div className="col-auto me-2">
            <span className='login-txt' >Login</span> <img className='login-img' src={login} />
          </div>
        </div>
        <div className="steps-container pt-4 mt-xxl-5">
          <div className="steps-wrapper progress-line">{steps}</div>
        </div>

        <div className="steps1 pt-3">{steps1}</div>

      </div>
    </>
  );
};

export default Stepper;
