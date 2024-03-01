import React from 'react'

type Props = {
    isNavCollapsed: boolean
}


const ProfileDetails: React.FC<Props> = ({ isNavCollapsed }: Props) => {
    return (
        <div>
            <div className='ms-5 mt-lg-5 mt-xxx-5' id='policyDetailContainer'>
                <div className={`policy-detail-contain ${isNavCollapsed ? '' : 'blur'}`}>
                    <div className='h4 policy-name mb-4'>
                        Policy Name Here - (Policy Number Here)
                    </div>
                    <div className='flex'>
                        <div className='left-policy-contain'>
                            <div className='mb-3'>
                                <span className='title-txt'>Name</span>
                                <p className='content-txt mt-2'>King-of-food</p>
                            </div>
                            <div className='mb-3'>
                                <span className='title-txt'>E-mail</span>
                                <p className='content-txt mt-2'>kingoffood@annaraja.com</p>
                            </div>

                        </div>
                        <div className='right-policy-contain'>
                            <div className='mb-3'>
                                <span className='title-txt'>Primary Contact</span>
                                <p className='content-txt mt-2'>8989898989</p>
                            </div>
                            <div className='mb-3'>
                                <span className='title-txt'>Alternate Contact</span>
                                <p className='content-txt mt-2'>9898989898</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileDetails;