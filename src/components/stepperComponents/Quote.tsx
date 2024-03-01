import React, { useState, useEffect, useContext } from 'react';
import tick from '../../assets/Group (3).svg'
import Add from '../../assets/plus.png'
import minus from '../../assets/minus.png'
import Stepper from './Stepper';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


interface Stepper1Props {
    onPrev?: () => void;
    onNext?: () => void;
}

interface FormData {
    self: any;
    spouse: any;
    children: number;
    // familyMembers: string;
    ageOfElderParent: number | null;
    ageOfElderParentInLaw: number | null;
    ageOfElder: number | null;
    parents: number;
    phoneNumber: number | null;
    parentInLaws: number;
}

const Stepper1: React.FC<Stepper1Props> = () => {

    const [condition, setCondition] = useState(true);
    const [lawscondition, setLawsCondition] = useState(true);
    const [children, setChildren] = useState(true)
    const state = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate();
    const getDefaultFormData = () => ({
        self: false,
        spouse: false,
        children: 0,
        ageOfElder: null,
        ageOfElderParent: null,
        ageOfElderParentInLaw: null,
        parents: 0,
        parentInLaws: 0,
        phoneNumber: null,
    });


    const [formData, setFormData] = useState<FormData>(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : getDefaultFormData();
    });
    const formDataString = JSON.stringify(formData);
    localStorage.setItem('formData', formDataString);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('formData');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);



    const currentStep = location.state ? location.state.currentStep : 0;

    useEffect(() => {
        console.log('Refreshing data:', formData);
    }, [formData]); // Only re-run the effect if count or formData changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = parseInt(value, 10);
        setFormData((prevState) => ({
            ...prevState,
            [name]: isNaN(numericValue) ? value : numericValue,
        }));
    };

    const handlechildren = (operation: 'add' | 'remove') => {
        if (operation === 'add') {
            // setCount((prevCount) => prevCount + 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                children: formData.children + 1,
            }));
            console.log(formData)
        } else if (operation === 'remove' && formData.children > 0) {
            // setCount((prevCount) => prevCount - 1);
            setFormData({
                ...formData,
                children: formData.children - 1,
            });
            console.log(formData)

        }
    };

    const handleButtonClick = (operation: 'add' | 'remove') => {
        if (operation === 'add') {
            // setCount1((prevCount) => prevCount + 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                parents: formData.parents + 1,
            }));
        } else if (operation === 'remove' && formData.parents > 0) {
            // setCount1((prevCount) => prevCount - 1);
            setFormData({
                ...formData,
                parents: formData.parents - 1,
            });
        }
    };

    const handleButton = (operation: 'add' | 'remove') => {
        if (operation === 'add') {
            // setCount2((prevCount) => prevCount + 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                parentInLaws: formData.parentInLaws + 1,
            }));
        } else if (operation === 'remove' && formData.parentInLaws > 0) {
            // setCount2((prevCount) => prevCount - 1);
            setFormData({
                ...formData,
                parentInLaws: formData.parentInLaws - 1,
            });
        }
    };

    const selfTag = (value: any) => {

        console.log(value + "self tag")
        setFormData({
            ...formData,
            self: value,
        })
    }

    const handlespouseAdd = () => {
        setFormData({
            ...formData,
            spouse: true,
        });
    }
    const handlespouseRemove = () => {
        setFormData({
            ...formData,
            spouse: false,
        });
    }

    const generateInputFields = (category: keyof FormData, count: number) => {
        const inputFields: JSX.Element[] = [];
        if (count >= 1) {
            for (let i = 0; i < 1; i++) {
                inputFields.push(
                    <li key={i} className='d-flex mx-3 mb-3  justify-content-between'>
                        <div className=' list-parent'>Age of the elder parent</div>
                        <input
                            className='form-control ms-5'
                            style={{ width: '12%', height: '30px' }}
                            type="number"
                            name={`${category}[${i}]`}
                            id={`${category}[${i}]`}
                            value={formData[category] || ''}
                            onChange={(e) => handleNestedChange(e, category, i)}
                        // required
                        />
                    </li>
                );
            }
        }
        console.log(formData[category])
        return inputFields;
    };

    const generateParentInLaw = (category: keyof FormData, count2: number) => {
        const parentinlaw: JSX.Element[] = [];
        if (count2 >= 1) {
            for (let i = 0; i < 1; i++) {
                parentinlaw.push(
                    <li key={i} className='d-flex mx-3 mb-3 justify-content-between' >
                        <div className='list-parent'>Enter the parent-in law elder </div>
                        <input
                            type="number"
                            name={`${category}[${i}]`}
                            className='form-control ms-5'
                            style={{ width: '12%', height: '30px' }}
                            // id={`${category}[${i}]`} 
                            value={formData[category] || ''}
                            onChange={(e) => handleNestedChange(e, category, i)}
                            required
                        />
                    </li>
                );
            }
        }
        return parentinlaw;
    };
    const handleNestedChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        category: keyof FormData,
        index: number
    ) => {
        const { value } = e.target;
        const numericValue = parseInt(value, 10);
        setFormData((prevState) => ({
            ...prevState,
            [category]: isNaN(numericValue) ? null : numericValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFormData: FormData = {
            ...formData
        };

        setFormData(updatedFormData);
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        console.log(updatedFormData + "this is  the updated form data");
        state.setS1state('false')
        state.setColorStep(0);
        navigate('/steppermobile', { state: { formData, currentStep } });
    }

    return (
        <>
            <div className='container-fluid background-div'>
                <Stepper />
                <form onSubmit={handleSubmit} >
                    <div className='familyMembers d-flex justify-content-center  p-3 pb-5  pt-xxl-4'>
                        <label htmlFor="familyMembers">Who in your family needs coverage?</label>
                    </div>
                    <div id='stepper-container-div'>
                        <div className='sub-div'>
                            <div className='d-flex px-3 pb-2 justify-content-between'>
                                <div className='txt-design'>
                                    self
                                </div>
                                {formData.self ? (<img src={tick} onClick={() => selfTag(false)} className='img mb-1' />) : (<div className='tick-checkbox mb-1' onClick={() => selfTag(true)}></div>)}
                            </div>
                            <div className='d-flex mx-3 mb-3 justify-content-between'>
                                <label htmlFor='spouse' className='txt-design'>spouse</label>
                                {formData.spouse ? (<span className='remove-txt' onClick={handlespouseRemove}>Remove</span>) : (<span className='add-txt' onClick={handlespouseAdd}>Add</span>)}
                            </div>
                            <div className='d-flex mx-3 mb-3 justify-content-between'>
                                <label htmlFor='children' className='txt-design'>children</label>
                                {children ? (
                                    <div>
                                        {formData.children === 0 ? (
                                            <div className='add-txt' onClick={() => handlechildren('add')}>
                                                Add
                                            </div>
                                        ) : (
                                            <div>
                                                <img onClick={() => handlechildren('remove')} src={minus} className='add-img pe1' />
                                                <span className=''>{` ${formData.children.toString().padStart(2, '0')} `}</span>
                                                <img onClick={() => handlechildren('add')} src={Add} className='add-img' />
                                            </div>
                                        )}
                                    </div>
                                ) : null}

                            </div>
                            <div className='d-flex mx-3 mb-2 justify-content-between'>
                                <label htmlFor="ageOfElder" className='txt-design'>Age of the elder member (You, spouse)</label>
                                <input
                                    type="number"
                                    name="ageOfElder"
                                    id="ageOfElder"
                                    onChange={handleChange}
                                    required
                                    className='form-control ms-5'
                                    style={{ width: '12%', height: '30px' }}
                                />
                            </div>
                            <div className='d-flex mx-3 mb-3 justify-content-between'>
                                <label htmlFor="parents" className='txt-design'>parents</label>
                                {condition ? (
                                    <div>
                                        {formData.parents === 0 ? (
                                            <div className='add-txt' onClick={() => handleButtonClick('add')}>Add</div>
                                        ) : (
                                            <> <img onClick={() => handleButtonClick('remove')} src={minus} className='add-img pe1' />
                                                <span className=''>{` ${formData.parents.toString().padStart(2, '0')} `}</span>
                                                <img onClick={() => handleButtonClick('add')} src={Add} className='add-img' />
                                            </>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            <div className='d-flex mx-3 mb-3 justify-content-between'>
                                <label htmlFor="parentInLaws" className='txt-design'>Parent - in - laws</label>
                                {lawscondition ?
                                    (
                                        <div>
                                            {formData.parentInLaws === 0 ? (
                                                <div className='add-txt' onClick={() => handleButton('add')}>Add</div>
                                            ) :
                                                (<div>
                                                    <img onClick={() => handleButton('remove')} src={minus} className='add-img pe1' />
                                                    <span className=''>{` ${formData.parentInLaws.toString().padStart(2, '0')} `}</span>
                                                    <img onClick={() => handleButton('add')} src={Add} className='add-img' />

                                                </div>
                                                )}
                                        </div>
                                    ) : null}
                            </div>
                            <div>{generateInputFields('ageOfElderParent', formData.parents)}</div>
                            <div>
                                {generateParentInLaw("ageOfElderParentInLaw", formData.parentInLaws)}
                            </div>
                            <div className='d-flex justify-content-center quote-div'>
                                <button type="submit" className='quote'>Get Quote</button>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center p-4 pt-xxl-4'>
                        <footer className='d-flex footer-div mt-xxl-3' >
                            <a ><pre > About Us  |</pre></a>
                            <a> <pre>  Terms & Conditions |</pre></a>
                            <a><pre>  Privacy Policy</pre></a>
                        </footer>
                    </div>
                </form >

            </div>
        </>
    );
};

export default Stepper1;
