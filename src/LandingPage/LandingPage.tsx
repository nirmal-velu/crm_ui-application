import React from 'react'
import '../LandingPage/LandingPage.css'
import insurance from '../assets/insuranceLogo.svg'
import login from '../assets/login-logo.png'
import car from '../assets/Group (4).png'
// import bike from '../../assets/Ellipse 2.png'
import bikelogo from '../assets/Group.png'
import healthlogo from '../assets/Group (1).png'
import lifelogo from '../assets/Group (2).png'
import travellogo from '../assets/Group (3).png'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface LandingPageProps {}
const LandingPage: React.FC<LandingPageProps> = () => {
const navigate=useNavigate();

    const handle = () => {
        window.location.href = '/login';
    };
    const handleLogin=()=>{
       navigate('/login');
    }


    return (
        <>
            <div id='container-div'>
                <div className='upper-div'>
                    <div className='ins-log-div'>
                        <div className='insurance-div'>
                            <img className='insurance-img' src={insurance} /><span className='insurance-txt'>Insurance Company</span>
                        </div>
                        <div className='login-div'>
                            
                            <span className='login-txt' onClick={handleLogin}>Login</span> <img className='login-img' onClick={handleLogin} src={login} />
                            
                        </div>
                    </div>
                    {/* <div className='ins-cont-div'> */}
                    <div className='total-container-div'>
                        <div className='ins-cont-div'>
                            <h2 id='ins-content'>
                                Start your insurance now,

                            </h2>
                            <span id='sub-content'>
                                be one step ahead
                            </span>
                        </div>
                        <div className='all-insurance-logos'>
                            <div>
                                <div className='logos'>
                                    <img src={car} className='img-logos' />
                                </div>
                                <div className='logos-text-div'>
                                    Car
                                </div>
                            </div>
                            <div>
                                <div className='logos'>
                                    <img src={bikelogo} className='img-logos' />
                                </div>
                                <div className='logos-text-div'>
                                    Bike
                                </div>
                            </div>
                            <div>
                                <div className='logos-health'>
                                    <img src={healthlogo} className='img-logos' />
                                </div>
                                <div style={{ color: "#E73493" }} className='logos-text-div'>
                                    Health
                                </div>
                            </div>
                            <div>
                                <div className='logos'>
                                    <img src={lifelogo} className='img-logos' />
                                </div>
                                <div className='logos-text-div'>
                                    Life
                                </div>
                            </div>
                            <div>
                                <div className='logos'>
                                    <img src={travellogo} className='img-logos' />
                                </div>
                                <div className='logos-text-div'>
                                    Travel
                                </div>
                            </div>
                        </div>
                        {/* <div className='ins-cont-div'>
                            <h2 id='ins-content'>
                                Start your insurance now,
                            </h2>
                            <span id='sub-content'>
                                be one step ahead
                            </span>
                        </div>
                        <div className='all-insurance-logos'>
                            <div>
                            <div className='logos'>
                                <img src={car} className='img-logos' />
                            </div> 
                            <div className='logos-text-div'>
                                Car
                            </div>
                            </div>
                            <div>
                            <div className='logos'>
                                <img src={bikelogo} className='img-logos' />
                            </div>
                            <div className='logos-text-div'>
                                Bike
                            </div>
                            </div>
                            <div>
                            <div className='logos-health'>
                                <img src={healthlogo} className='img-logos' />
                            </div>
                            <div className='logos-text-div'>
                                Health
                            </div>
                            </div>
                            <div>
                            <div className='logos'>
                                <img src={lifelogo} className='img-logos' />
                            </div>
                            <div className='logos-text-div'>
                                Life
                            </div>
                            </div>
                            <div>
                            <div className='logos'>
                                <img src={travellogo} className='img-logos' />
                            </div>
                            <div className='logos-text-div'>
                                Travel
                            </div>
                            </div>
                        </div> */}
                    </div>

                    {/* </div> */}
                    <div className='quote-div'>
                        <button id='quote-btn'>Get Quote</button>
                    </div>
                    <footer className='footer'>
                        <a ><pre onClick={handle}> About Us  |</pre></a>
                        <a> <pre>  Terms & Conditions |</pre></a>
                        <a><pre>  Privacy Policy</pre></a>
                    </footer>
                    
                </div>
            </div>
        </>
    )
}
export default LandingPage