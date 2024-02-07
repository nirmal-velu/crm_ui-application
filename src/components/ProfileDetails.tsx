import React from 'react'

type Props = {}

export default function ProfileDetails({ }: Props) {
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
                                <span className='title-txt'>Name</span>
                                <p className='content-txt'>King-of-food</p>
                            </div>
                            <div>
                                <span className='title-txt'>E-mail</span>
                                <p className='content-txt'>kingoffood@annaraja.com</p>
                            </div>

                        </div>
                        <div className='right-policy-contain'>
                            <div>
                                <span className='title-txt'>Primary Contact</span>
                                <p className='content-txt'>8989898989</p>
                            </div>
                            <div>
                                <span className='title-txt'>Alternate Contact</span>
                                <p className='content-txt'>9898989898</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}