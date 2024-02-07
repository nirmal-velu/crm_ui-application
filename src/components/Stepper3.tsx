import React from 'react';
import Stepper from './Stepper';
import Famdetails from './FamilyDetailsPage/FamilyDetails';

const Stepper3: React.FC = () => {
  return (
    <>
      <div className='container-fluid background-div'>
        <Stepper />
        <Famdetails />
      </div>
    </>
  );
};

export default Stepper3;
