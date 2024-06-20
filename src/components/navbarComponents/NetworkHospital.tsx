import { ChangeEvent, useState } from 'react'
import searchIcon from '../../assets/searchicon.svg'

type Props = {
    isNavCollapsed: boolean
}

export default function NetworkHospitals({ isNavCollapsed }: Props) {

    const datalist: any[] = [
        { state: "tamilnadu", district: "chennai", hospital: 'hospital 1', address: 'chennai', contact: '1234567890' },
        { state: "tamilnadu", district: "salem", hospital: 'hospital 2', address: 'salem', contact: '1234567890' },
        { state: "tamilnadu", district: "chennai", hospital: 'hospital 3', address: 'chennai', contact: '1234567890' }
    ];

    const [StateList, setStateList] = useState(datalist);
    const [DistrictList, setDistrictList] = useState(datalist);
    const [List, setList] = useState(datalist);
    const [District, setDistrict] = useState<string>("");
    const [State, setState] = useState<string>("");

    const handleStateChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputValue = event.target.value.toLowerCase();
        const filteredBySearch = datalist.filter((item) => item.state.toLowerCase().includes(inputValue));

        setState(inputValue);
        setStateList(filteredBySearch);
        setDistrictList(filteredBySearch);
        setList(filteredBySearch);
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputValue = event.target.value.toLowerCase();
        const filteredBySearch = StateList.filter((item) => item.district.toLowerCase().includes(inputValue));

        setDistrict(inputValue);
        setDistrictList(filteredBySearch);
        setList(filteredBySearch);
    };

    const handleSearchAndClick = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();

        if (inputValue === "") {
            setList(DistrictList);
        } else {
            const filteredBySearch = DistrictList.filter((item) => item.hospital.toLowerCase().includes(inputValue));
            setList(filteredBySearch);
        }
    };

    const renderState = () => {

        const uniquevalue = (Search: any[]) => {
            let value: any[] = [];
            Search.forEach((item) => {
                if (!value.includes(item.state)) {
                    value.push(item.state);
                }
            })

            return value;
        }

        const state = uniquevalue(datalist);

        return state.map((item, index) => (
            <option className='text-center' key={index}>{item}</option>
        ))
    }

    const renderDistrict = () => {

        const uniquevalue = (Search: any[]) => {
            let value: any[] = [];
            Search.forEach((item) => {
                if (!value.includes(item.district)) {
                    value.push(item.district);
                }
            })

            return value;
        }

        const district = uniquevalue(StateList);

        return district.map((item, index) => (
            <option className='text-center' key={index}>{item}</option>
        ))
    }

    return (
        <div className={`${isNavCollapsed ? '' : 'blur'}`}>
            <div className='ms-5 mt-lg-5 mt-xxl-5 me-5' id='policyDetailContainer'>
                <div className='d-flex mb-xxl-3'>
                    <div style={{ width: '18%' }} className="dropdown show">
                        <select className='btn bg-col-netHos custom-dropdown-toggle' required onChange={handleStateChange} value={State}>
                            {renderState()}
                        </select>
                    </div>
                    <div style={{ width: '18%' }} className="dropdown show">
                        <select className='btn bg-col-netHos custom-dropdown-toggle' required onChange={handleDistrictChange} value={District}>
                            {renderDistrict()}
                        </select>
                    </div>
                    <div className="search-hospital" style={{ width: "20%", borderRadius: '5px', border: '1px solid gray', height: '38px' }} >
                        <input className='search-bar' style={{ width: '80%', height: '100%', border: "none", outline: 'none' }} type="text" placeholder="Search Hospital" name="search" onChange={handleSearchAndClick} />
                        <span><img src={searchIcon} alt='Search-icon' style={{ cursor: 'pointer' }} /></span>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className='table net-hos-table'>
                        <thead>
                            <tr className='row-cols row-cols-6 payment-thead' style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)' }}>
                                <th className='payment-thead' scope='col'>State</th>
                                <th className='payment-thead' scope='col'>District/City</th>
                                <th className='payment-thead' scope='col'>Hospital Name</th>
                                <th className='payment-thead' scope='col'>Address</th>
                                <th className='payment-thead text-end' scope='col'>Contact Number</th>
                            </tr>
                        </thead>
                        <tbody >
                            {List.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.state}</td>
                                    <td>{data.district}</td>
                                    <td>{data.hospital}</td>
                                    <td>{data.address}</td>
                                    <td className='text-center'>{data.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
