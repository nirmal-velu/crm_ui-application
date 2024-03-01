import React from 'react'
import download from '../../assets/download.svg'
import '../../css/LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    isNavCollapsed: boolean
}

function PaymentHistory({ isNavCollapsed }: Props) {
    const data = [{ col1: '12345678', col2: 'HL123908456', col3: 'Health', col4: '₹123456', col5: '21-Jan-2024' },];
    const renderingdata = () => {

        return data.map((row, i) => (
            <tr key={i} className='payment-thead'>
                <td className='payment-tdata'>{row.col1}</td>
                <td className='payment-tdata'>{row.col2}</td>
                <td className='payment-tdata text-center'>{row.col3}</td>
                <td className='payment-tdata text-center'>{row.col4}</td>
                <td className='payment-tdata text-center'>{row.col5}</td>
                <td colSpan={2} style={{ textAlign: 'right' }} className='payment-tdata'><img style={{ width: "20px" }} src={download} alt='Download-Icon' /></td>
            </tr>
        ))
    }
    return (
        <div className={`${isNavCollapsed ? '' : 'blur'}`}>
            <div className='ms-5 mt-lg-5 mt-xxl-5 me-5' id='policyDetailContainer'>
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr className='row-cols row-cols-6 payment-thead' style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)' }}>
                                <th className='payment-thead' scope='col'>Bill Number</th>
                                <th className='payment-thead' scope='col'>Policy Number</th>
                                <th className='payment-thead text-center' scope='col'>Policy Type</th>
                                <th className='payment-thead text-center' scope='col'>Amount</th>
                                <th className='payment-thead text-center' scope='col'>Paid On</th>
                                <th className='payment-thead-download' scope='col'></th>
                            </tr>
                        </thead>
                        <tbody >
                            {renderingdata()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default PaymentHistory
