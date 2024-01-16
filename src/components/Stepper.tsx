import React, { useState, ReactElement, ReactNode, useEffect } from "react";
import '../components/Stepper.css'
import insurance from '../assets/insuranceLogo.svg'
import login from '../assets/login-logo.png'
import { useLocation, useNavigate } from "react-router-dom";
import Stepper1 from "./Stepper1";
import Stepper2 from "./Stepper2";


interface StepperProps {
  // components: React.ComponentType<any>[];
}
const Stepper: React.FC<StepperProps> = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  // const stepsCount = list.length;
  const steps: ReactNode[] = [];
  const steps1: ReactNode[] = [];
  const stepsArray = ['Quote', 'Checkout', 'Health Info', 'Approval'];

  const route = location.pathname;



  useEffect(() => {
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      setCurrentStep(parseInt(storedStep, 10));
    }

    if (location.pathname === '/stepperlist') {
      setCurrentStep(0)
    }
    else if (location.pathname === '/checkout') {
      setCurrentStep(1)
    }
    else if (location.pathname === '/healthinfo') {
      setCurrentStep(2)
    }
    else if (location.pathname === '/approval') {
      setCurrentStep(3)
    }
  }, []); // Empty dependency array to run the effect only once when the component mounts


  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    localStorage.setItem("currentStep", stepIndex.toPrecision());
    setCurrentStep(stepIndex)
    switch (stepIndex) {
      case 0:
        navigate('/stepperlist');
        break;
      case 1:
        navigate('/checkout');
        break;
      case 2:
        navigate('/healthinfo');
        break;
      case 3:
        navigate('/approval');
        break;
      default:
        break;
    }
    console.log(stepIndex + "step index")

  };

  console.log(handleStepClick + "index step")

  for (let i = 0; i < 4; i++) {
    steps.push(
      <div
        id="indicator"
        onClick={() => handleStepClick(i)}
        className={`steps ${currentStep >= i ? "actives" : ""}`}
        key={i}
      >
      </div>

    );
  } console.log(currentStep + "current step")
  for (let i = 0; i < 4; i++) {
    steps1.push(
      <div
        onClick={() => handleStepClick(i)}
        className={`steps1 ${currentStep >= i ? "active" : ""}`}
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
  };
  const indicator = document.getElementById('indicator')
  const setCurrent = (num: any) => {
    setCurrentStep(num)
  }
  return (
    <>
      <div className="container-fluid stepper">
        <div className=" d-flex py-2 py-xxl-4  justify-content-between align-items-center  " >
          <div className="col-auto ">
            <img className='me-3' src={insurance} /><span className='insurance-txt'>Insurance Company</span>
          </div>
          <div className="col-auto">
            <span className='login-txt me-2' >Login</span> <img className='login-img' src={login} />
          </div>
        </div>
        {/* <div className='otp-header'>
          <div className='otp-title'>
            <img src='group1.svg' width="38" height="45" className='logo'></img>
            <p className='otp-titlename'>Insurance Company</p>
          </div>
          <div className='otp-login-logo '>
            <p className='otp-login-text'>Login</p>
            <img src='login-logo.svg' width="30" height="30" className='logo'></img>
          </div>
        </div> */}
        <div className="steps-container mt-4 mt-xxl-5">
          <div className="steps-wrapper progress-line">{steps}</div>
        </div>

        <div className="steps1 mt-3">{steps1}</div>
        {/* <div>{React.createElement(components[currentStep])}</div> */}

        {/* <div>{React.cloneElement(list[currentStep], { onPrev, onNext } )}</div> */}
      </div>
    </>
  );
};

export default Stepper;
