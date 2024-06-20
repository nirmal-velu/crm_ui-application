import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InsuranceCoverage from './InsuranceCoverage';
import backArrow from '../assets/backarrow.svg'
import menu from '../assets/menu-icon.png'
import { useLocation, useNavigate } from 'react-router-dom';
import NetworkHospitals from '../components/navbarComponents/NetworkHospital';
import PaymentHistory from '../components/navbarComponents/PaymentHistory';
import ProfileDetails from '../components/navbarComponents/ProfileDetails';
import PolicyDetails from '../components/navbarComponents/PolicyDetails';
import HealthCard from '../components/navbarComponents/HealthCard';
import '../css/LandingPage.css';

type Props = {};

const Navbar = (props: Props) => {

  const navigate = useNavigate();

  const location = useLocation();

  const policyId = location.state && location.state.policyID;

  console.log("policyID:", policyId);

  const [activeLink, setActiveLink] = useState(Number);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  enum navigation {
    policyDetails,
    profileDetails,
    PaymentHistory,
    HealthCards,
    NetworkHospitals,
    PreviousClaims

  }
  console.log(typeof (navigation.policyDetails))

  const handleBack = () => {
    if (activeLink === 0) {
      navigate('/dashboard');
    }
    else {
      setActiveLink(activeLink - 1);
    }
  }

  const handleLinkClick = (value: any) => {
    console.log(value + "data")
    setActiveLink(value);
    setIsNavCollapsed(true);
    console.log('Active link:', activeLink);

  };

  const handleToggleClick = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };
  console.log(setIsNavCollapsed + "nav collapsed")

  const renderedComponents = () => {
    switch (activeLink) {
      case 0:
        return <PolicyDetails isNavCollapsed={isNavCollapsed} />
      case 1:
        return <ProfileDetails isNavCollapsed={isNavCollapsed} />
      case 2:
        return <PaymentHistory isNavCollapsed={isNavCollapsed} />
      case 3:
        return <HealthCard />
      case 4:
        return <NetworkHospitals isNavCollapsed={isNavCollapsed} />
      // default:
      //   return <PolicyDetails isNavCollapsed={isNavCollapsed} />
    }
  }

  return (
    <>
      <div className="container-fluid background-div d-flex flex-column">
        <InsuranceCoverage />
        <div className={`policy-contain mt-4 mt-xxl-5 mb-5 p-2`}>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex ms-5 mt-4' onClick={handleBack}>
              <img src={backArrow} alt="Arrow" className='pe-2 dark' />
              <p className='txt-color'>Back</p>
            </div>
            <div className='d-lg-none me-4 mt-3'>
              <button
                className="navbar-toggler custom-toggle-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded={!isNavCollapsed}
                aria-label="Toggle navigation"
                onClick={handleToggleClick}                            >
                <img src={menu} className='menu-img' alt="Menu" />
              </button>
            </div>
          </div>
          <nav className={`navbar mt-4 navbar-expand-lg  ${isNavCollapsed ? '' : 'menu-bar'}`}>
            <div id="navbarNav" className={`collapse  navbar-collapse  ${isNavCollapsed ? '' : 'show'}`} >
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
        <footer className='nav-footer mb-3 mt-auto'>
          <a ><pre> About Us  |</pre></a>
          <a> <pre>  Terms & Conditions |</pre></a>
          <a><pre>  Privacy Policy</pre></a>
        </footer>
      </div>
    </>
  );
};

export default Navbar;
