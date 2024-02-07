import React from 'react';
import '../css/Dashboard.css'
import insurance from '../assets/insuranceLogo.svg';
import login from '../assets/login-logo.png';
import alert from '../assets/alert.svg';
import support from '../assets/support-img.png';
import healthlogo from '../assets/health.svg';

interface PolicyDetailsProps {
    policyName: string;
    policyID: string;
    validTill: string;
}

interface AlertProps {
    name: string;
    id: string;
    validTill: string;
}

const Policy: React.FC<PolicyDetailsProps> = ({ policyName, policyID, validTill }) => {
    return (
        <div className='policy-details'>
            <div className='policy-details-box1'>
                <div className='policy-box1-logo'>
                    <img className='policy-box1-img' src={healthlogo} />
                </div>
                <div className='policy-box1-details'>
                    <p className='policy-box1-tit-text'>{policyName}</p>
                    <p className='policy-box1-text'>ID/Number: {policyID}</p>
                    <p className='policy-box1-text'>Valid Till: {validTill}</p>
                </div>
            </div>
            <div className='policy-details-box2'>
                <button className='policy-box2-btn1'>View Details</button>
                <button className='policy-box2-btn2'>Claim Request</button>
            </div>
        </div>
    )
}

const generateAlert = (policies: AlertProps[]): JSX.Element[] => {
    const Alerts: React.JSX.Element[] = [];
    let currentdate = new Date();
    console.log(currentdate);
    policies.forEach((policy, index) => {
        const policyDate = new Date(policy.validTill);
        console.log(policyDate);
        const timeDiff = policyDate.getTime() - currentdate.getTime();
        console.log(timeDiff);
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (daysDiff < 10 && daysDiff > 0) {
            console.log(currentdate);
            Alerts.push(
                <div className='policy-alert' key={index}>
                    <div className='alert-details'>
                        <div className='alert-img'>
                            <img src={alert} />
                        </div>
                        <div className='alert-text'>
                            <p>Your policy <span className='alert-text-bold'>{policy.name}</span> expires in <span className='alert-text-bold'>{daysDiff}</span>  days. Please renew immediately.</p>
                            <p>Policy Number: 1234567890</p>
                        </div>
                    </div>
                    <div className='alert-btn'>
                        <button className='alert-button'>Renew Now</button>
                    </div>
                </div>
            );
        } else if (daysDiff <= 0) {
            console.log(currentdate);
            Alerts.push(
                <div className='policy-alert' key={index}>
                    <div className='alert-details'>
                        <div className='alert-img'>
                            <img src={alert} />
                        </div>
                        <div className='alert-text'>
                            <p>Your policy <span className='alert-text-bold'>{policy.name}</span> has expired. Please renew it to ensure continuous coverage.</p>
                            <p>Policy Number: 1234567890</p>
                        </div>
                    </div>
                    <div className='alert-btn'>
                        <button className='alert-button'>Renew Now</button>
                    </div>
                </div>
            );
        }

    });

    return Alerts;
};

// main component

const PolicyDetails = () => {

    const policies: AlertProps[] = [
        { name: 'Policy 1', id: '1234567890', validTill: '01-Apr-2024 , 23:59' },
        { name: 'Policy 2', id: '0987654321', validTill: '02-Feb-2024 , 23:59' },
        { name: 'Policy 3', id: '1111111111', validTill: '21-Jul-2024 , 23:59' },
        { name: 'Policy 4', id: '2222222222', validTill: '10-Aug-2024 , 23:59' }
    ];

    return (
        <div className='policy'>
            <div className='policy-header'>
                <div className='policy-title'>
                    <img src={insurance} width="38" height="45" className='logo'></img>
                    <p>Insurance Company</p>
                </div>
                <div className='login-logo'>
                    <p>Login</p>
                    <img src={login} width="15" height="25" className='logo'></img>
                </div>
            </div>
            <div className='policy-alert-container'>
                {generateAlert(policies)}
            </div>
            <div className='policy-container'>
                <div className='policy-data'>
                    {policies.map((policy, index) => (
                        <Policy
                            key={index}
                            policyName={policy.name}
                            policyID={policy.id}
                            validTill={policy.validTill}
                        />
                    ))}
                </div>
                <div className='policy-support'>
                    <div className='img-box'>
                        <img src={support} className='policy-support-img' />
                        <div className='img-text'>
                            <p className='img-text1'>24/7 Support</p>
                            <p className='img-text2'>1800 200 3030</p>
                        </div>
                    </div>
                    <button className='policy-support-btn'>View Past Policies</button>
                </div>
            </div>
            <div className='policy-footer'>
                <a className='policy-footer-text'>About Us <span> | </span> </a>
                <a className='policy-footer-text'>Terms & Conditions <span> | </span> </a>
                <a className='policy-footer-text'>Privacy Policy</a>
            </div>
        </div>
    )
}

export default PolicyDetails