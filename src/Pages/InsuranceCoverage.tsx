import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import insurance from '../assets/Group (2).svg';
import login from '../assets/login-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

type Props = {}

const InsuranceCoverage = (props: Props) => {

  const navigate = useNavigate();
  const handleLogin = () => navigate('/login');

  return (
    <>
      <div className='container-fluid' style={{ backgroundColor: '#36256E' }}>
        <div className='row '>
          <div className='col-12 mt-3 d-flex justify-content-between '>
            <div>
              <img src={insurance} id='img-ins' className='mb-2 me-2' alt="Logo" />
              <span className='insurance-txt'>Insurance Company</span>
            </div>
            <div className='mt-2' onClick={handleLogin}>
              <span className='login-txt mt-1 mb-3 me-2'>Login</span>
              <img className='login-img' src={login} alt="Login" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InsuranceCoverage