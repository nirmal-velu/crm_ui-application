
import React, { useState, ReactElement, ReactNode } from "react";
import '../components/Stepper.css'
import insurance from '../assets/insuranceLogo.svg'
import login from '../assets/login-logo.png'
import { useNavigate } from "react-router";


interface StepperProps {
  list: ReactElement[];
}

const Stepper: React.FC<StepperProps> = ({ list }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const stepsCount = list.length;
  const steps: ReactNode[] = [];
  const steps1: ReactNode[] = [];
  const stepsArray = ['Quote', 'Checkout', 'Health Info', 'Approval'];

  for (let i = 0; i < stepsCount; i++) {
    steps.push(

      <div
        onClick={() => setCurrentStep(i)}
        className={`steps ${currentStep >= i ? "active" : ""}`}
        key={i}
      >
      </div>

    );
  }
  for (let i = 0; i < stepsCount; i++) {
    steps1.push(
      <div
        onClick={() => setCurrentStep(i)}
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

  const handleLogin = () => {
    navigate('/login');
}

  const onNext = () => {
    if (currentStep !== list.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (

    <section className="container-fluid stepper">
      <div className="row d-flex p-2 mt-2 justify-content-between  align-items-center  " >
        <div className="col-auto ms-2 ">
          <img className='me-3' src={insurance} /><span className='insurance-txt'>Insurance Company</span>
        </div>
        <div className="col-auto me-2">
        <span className='login-txt' onClick={handleLogin}>Login</span> <img className='login-img' onClick={handleLogin} src={login} />
        </div>
      </div>
      <div className="steps-container mt-4">
        <div className="steps-wrapper progress-line">{steps}</div>
      </div>

      <div className="steps1 mt-3">{steps1}</div>

      <div>{React.cloneElement(list[currentStep], { onPrev, onNext })}</div>
    </section>
  );
};

export default Stepper;
