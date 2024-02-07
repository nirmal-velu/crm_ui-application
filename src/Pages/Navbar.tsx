import React, { useState } from 'react';
import '../css/LandingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import InsuranceCoverage from './InsuranceCoverage';
import backArrow from '../assets/backarrow.svg'
import menu from '../assets/menu-icon.jpg'
import PolicyDetails from '../components/PolicyDetails';
import ProfileDetails from '../components/ProfileDetails';
type Props = {};

const Navbar = (props: Props) => {
  const [activeLink, setActiveLink] = useState(Number);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  enum navigation {
    policyDetails,
    profileDetails,
    PaymentHistory,
    HealthCards,
    NetworkHospitals,
    PreviousClaims

  }
  console.log(typeof (navigation.policyDetails))

  const handleLinkClick = (value: any) => {
    console.log(value + "data")
    setActiveLink(value);
    setIsNavCollapsed(true);
    console.log('Active link:', activeLink);

  };

  const renderedComponents = () => {
    switch (activeLink) {
      case 0:
        return <PolicyDetails />
      case 1:
        return <ProfileDetails />
      default:
      // return <PolicyDetails />

    }

  }

  return (
    <>
      <div className="container-fluid background-div">
        <InsuranceCoverage />
        <div className='policy-contain mt-lg-3 mt-xxl-5 mb-5 p-2'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex ms-5'>
              <img src={backArrow} alt="" className='pe-2 dark' />
              <p className='mt-3 txt-color'>Back</p>
            </div>
            <div className='d-lg-none'>
              <button
                className="navbar-toggler custom-toggle-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded={!isNavCollapsed}
                aria-label="Toggle navigation"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              >
                <img src={menu} className='menu-img' alt="menu" />
              </button>
            </div>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light menu-bar">
            <div className={`collapse  navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
              <ul className="navbar-nav nav-fill mx-5">
                <li className={`list-nav ${activeLink == navigation.policyDetails ? 'active' : ''}`}>
                  <a className="nav-link  txt-color" onClick={() => handleLinkClick(navigation.policyDetails)} >
                    Policy Details
                  </a>
                </li>
                <li className={`list-nav ${activeLink == navigation.profileDetails ? 'active' : ''}`}>
                  <a className="nav-link txt-color" onClick={() => handleLinkClick(navigation.profileDetails)} >
                    Profile Details
                  </a>
                </li>
                <li className={`list-nav ${activeLink == navigation.PaymentHistory ? 'active' : ''}`}>
                  <a className="nav-link txt-color" onClick={() => handleLinkClick(navigation.PaymentHistory)} >
                    <span className=''> Payment History</span>
                  </a>
                </li>
                <li className={`list-nav ${activeLink == navigation.HealthCards ? 'active' : ''}`}>
                  <a className="nav-link txt-color" onClick={() => handleLinkClick(navigation.HealthCards)} >
                    Health Cards
                  </a>
                </li>
                <li className={`list-nav ${activeLink == navigation.NetworkHospitals ? 'active' : ''}`}>
                  <a className="nav-link txt-color" onClick={() => handleLinkClick(navigation.NetworkHospitals)} >
                    Network Hospitals
                  </a>
                </li>
                <li className={`list-nav ${activeLink == navigation.PreviousClaims ? 'active' : ''}`}>
                  <a className="nav-link txt-color" onClick={() => handleLinkClick(navigation.PreviousClaims)} >
                    Previous Claims
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {renderedComponents()}
        </div>
      </div>
    </>
  );
};

export default Navbar;
