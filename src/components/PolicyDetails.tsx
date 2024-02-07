import React from 'react'
import '../css/LandingPage.css'

type Props = {}

export default function PolicyDetails({ }: Props) {


    const handlePrint = () => {
        const printContent = document.getElementById('policyDetailContainer');

        if (printContent) {
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = printContent.innerHTML;

            window.print();

            document.body.innerHTML = originalContents;
        } else {
            console.error('Element with ID "policyDetailContainer" not found.');
        }
    };


    return (
        <div>
            <div className='ms-5 mt-3' id='policyDetailContainer'>
                <div className='policy-detail-contain'>
                    <div className='h4 policy-name'>
                        Policy Name Here - (Policy Number Here)
                    </div>
                    <div className='flex'>
                        <div className='left-policy-contain'>
                            <div>
                                <span className='title-txt'>Sum  Insured</span>
                                <p className='content-txt'>₹5,00,000</p>
                            </div>
                            <div>
                                <span className='title-txt'>Valid Till</span>
                                <p className='content-txt'>23 - Feb - 2024, 23:59</p>
                            </div>
                            <div>
                                <span className='title-txt'>Nominee</span>
                                <p className='content-txt'>No nominee added</p>
                            </div>
                            <div >
                                <span className='title-txt'>Policy Start Date</span>
                                <p className='content-txt'>24 - Feb - 2023</p>
                            </div>
                        </div>
                        <div className='right-policy-contain'>
                            <div>
                                <span className='title-txt'>Premium Amount</span>
                                <p className='content-txt'>₹50,000</p>
                            </div>
                            <div>
                                <span className='title-txt'>Tenure</span>
                                <p className='content-txt'>1 Year</p>
                            </div>
                            <div>
                                <span className='title-txt'>Premium Frequency</span>
                                <p className='content-txt'>Annual</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex download-receipt-btn justify-content-end'>
                <div className='download-box' onClick={handlePrint}>
                    <span className='download-txt'>Download Recipt</span>
                </div>
            </div>

        </div>
    )
}