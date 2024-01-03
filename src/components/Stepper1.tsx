import React, { useState, useEffect } from 'react';
import tick from '../assets/Group (3).svg'
import Add from '../assets/plus.png'
import minus from '../assets/minus.png'
import axios from 'axios';
interface Stepper1Props {
    onPrev?: () => void;
    onNext?: () => void;
}

interface FormData {
    self:any;
    spouse: any;
    children: number;
    // familyMembers: string;
    ageOfElderParent: number;
    ageOfElderParentInLaw: number;
    ageOfElder: number;
    parents: number;
    parentInLaws: number;
}

const Stepper1: React.FC<Stepper1Props> = ({ onPrev, onNext }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState(false);
    const [currentForm, setCurrentForm] = useState(true);
    const [self, setSelf] = useState(true);
    const [condition, setCondition] = useState(true);
    const [lawscondition, setLawsCondition] = useState(true);
    const [children, setChildren] = useState(true)
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [spouse, setSpouse] = useState(true);
    // const [state,setState]=useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // const [childrenCount, ChildrenCount] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        self:false,
        spouse: false,
        children: count,
        // familyMembers: '',
        ageOfElder: 0,
        ageOfElderParent: 0,
        ageOfElderParentInLaw: 0,
        parents: count1,
        parentInLaws: count2,
    });

    useEffect(() => {
        console.log('Refreshing data:', count, count1, count2, formData);
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
        // setChildren(false)
        if (operation === 'add') {
            setCount((prevCount) => prevCount + 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                children: count + 1,
            }));
            console.log(formData)
        } else if (operation === 'remove' && count > 0) {
            setCount((prevCount) => prevCount - 1);
            setFormData({
                ...formData,
                children: count - 1,
            });
            console.log(formData)

        }
    };

    const handleButtonClick = (operation: 'add' | 'remove') => {
        if (operation === 'add') {
            setCount1((prevCount) => prevCount + 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                parents: count1 + 1,
            }));
        } else if (operation === 'remove' && count1 > 0) {
            setCount1((prevCount) => prevCount - 1);
            setFormData({
                ...formData,
                parents: count1 - 1,
            });
        }
    };

    const handleButton = (operation: 'add' | 'remove') => {
        if (operation === 'add') {
            setCount2((prevCount) => prevCount + 1);
            setFormData((prevFormData) => ({
                ...prevFormData,
                parentInLaws: count2 + 1,
            }));
        } else if (operation === 'remove' && count2 > 0) {
            setCount2((prevCount) => prevCount - 1);
            setFormData({
                ...formData,
                parentInLaws: count2 - 1,
            });
        }
    };

    const handleNestedChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        category: keyof FormData,
        index: number
    ) => {
        const { value } = e.target;

        setFormData((prevState) => {
            const numericValue = parseInt(value, 10);

            return {
                ...prevState,
                [category]: isNaN(numericValue) ? prevState[category] : numericValue,
            };
        });
    };

    const selfTag = (state: boolean) => {
        setSelf(state)
        setFormData({
            ...formData,
            self:self,
        })
    }

    const handlespouseAdd = () => {
        setFormData({
            ...formData,
            spouse: true,
        });
        setSpouse(false);
    }
    const handlespouseRemove = () => {
        setFormData({
            ...formData,
            spouse: false,
        });
        setSpouse(true);
    }
    // const handlechildrenfun = () => {

    //     setCount((count) => count + 1)
    //     setChildren(false)
    //     setFormData({
    //         ...formData,
    //         children: count,
    //     });
    // console.log("form data:"  ,formData)
    // }
    // console.log(count)

    // const handleAdd = () => {
    //     setCount1(1);
    //     setCondition(false)
    // }

    // const handleLaws = () => {
    //     setCount2(1);
    //     setLawsCondition(false)
    // }

    const generateInputFields = (category: keyof FormData, count: number) => {
        const inputFields: JSX.Element[] = [];
        if (count >= 1) {
            for (let i = 0; i < 1; i++) {
                inputFields.push(
                    <li key={i} className='d-flex mx-3 mb-3 justify-content-between'>
                        <div className=' list-parent'>Age of the elder parent</div>
                        <input
                            className='form-control ms-5'
                            style={{ width: '12%', height: '30px' }}
                            type="number"
                            name={`${category}[${i}]`}
                            id={`${category}[${i}]`}
                            value={formData[category] || ''}
                            onChange={(e) => handleNestedChange(e, category, i)}
                            required
                        />
                    </li>
                );
            }
        }
        console.log(formData[category])
        return inputFields;
    };

    const generateParentInLaw = (category: keyof FormData, count: number) => {
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFormData: FormData = {
            ...formData
        };
    
        try {
            const response = await axios.post('http://localhost:1301/api/getQuote/generate', updatedFormData);
    
            // Handle the response if needed
            console.log('Backend response:', response.data);
        } catch (error) {
            // Handle error
            console.error('Error sending data to the backend:', error);
        }
    
        
    
        console.log('Form Data:', updatedFormData);
    };
    

    return (
        <form onSubmit={handleSubmit} className={formSubmitted ? 'form-submitted' : ''}>
            <div className='familyMembers d-flex justify-content-center  mt-3 mb-3'>
                <label htmlFor="familyMembers">Who in your family needs coverage?</label>
            </div>
            <div id='stepper-container-div'>
                <div className='sub-div'>
                    <div className='d-flex mx-3 mb-2 justify-content-between'>
                        <div className='txt-design'>
                            self
                        </div>
                        {self ? (<div className='tick-checkbox mb-1' onClick={() => selfTag(false)}></div>) : (<img src={tick} onClick={() => selfTag(true)} className='img mb-1' />)}
                    </div>
                    <div className='d-flex mx-3 mt-1 mb-3 justify-content-between'>
                        <label htmlFor='spouse' className='txt-design'>spouse</label>
                        {spouse ? (<span className='add-txt' onClick={handlespouseAdd}>Add</span>)
                            : (<span className='remove-txt' onClick={handlespouseRemove}>Remove</span>)}
                    </div>
                    <div className='d-flex mx-3 mb-3 justify-content-between'>
                        <label htmlFor='children' className='txt-design'>children</label>
                        {/* {children ? (<span className='add-txt' onClick={handlechildrenfun}>Add</span>) : */}
                        {children ? (
                            <div>
                                {count === 0 ? (
                                    <div className='add-txt' onClick={() => handlechildren('add')}>
                                        Add
                                    </div>
                                ) : (
                                    <div>
                                        <img onClick={() => handlechildren('remove')} src={minus} className='add-img pe1' />
                                        <span className=''>{` ${count.toString().padStart(2, '0')} `}</span>
                                        <img onClick={() => handlechildren('add')} src={Add} className='add-img' />
                                    </div>
                                )}
                            </div>
                        ) : null}

                    </div>
                    <div className='d-flex mx-3 mb-2 justify-content-between'>
                        <label htmlFor="elderMemberAge" className='txt-design'>Age of the elder member (You, spouse)</label>
                        <input
                            type="number"
                            name="elderMemberAge"
                            id="elderMemberAge"
                            // value={formData.elderMemberAge}
                            onChange={handleChange}
                            required
                            className='form-control ms-5'
                            style={{ width: '12%', height: '30px' }}
                        />
                    </div>
                    <div className='d-flex mx-3 mb-3 justify-content-between'>
                        <label htmlFor="parents" className='txt-design'>parents</label>
                        {condition ? (
                            //     <div className='add-txt' onClick={handleAdd}>Add</div>
                            // ) : (
                            <div>
                                {count1 === 0 ? (
                                    <div className='add-txt' onClick={() => handleButtonClick('add')}>Add</div>
                                ) : (
                                    <> <img onClick={() => handleButtonClick('remove')} src={minus} className='add-img pe1' />
                                        <span className=''>{` ${count1.toString().padStart(2, '0')} `}</span>
                                        <img onClick={() => handleButtonClick('add')} src={Add} className='add-img' />
                                    </>
                                )}
                            </div>
                        ) : null}
                    </div>
                    <div className='d-flex mx-3 mb-3 justify-content-between'>
                        <label htmlFor="parentInLaws" className='txt-design'>Parent - in - laws</label>
                        {lawscondition ?
                            // (<div className='add-txt' onClick={handleLaws}>Add</div>) :
                            (
                                <div>
                                    {count2 === 0 ? (
                                        <div className='add-txt' onClick={() => handleButton('add')}>Add</div>
                                    ) :
                                        (<div>
                                            {/* <button type="button" > */}
                                            <img onClick={() => handleButton('remove')} src={minus} className='add-img pe1' />
                                            {/* </button> */}
                                            <span className=''>{` ${count2.toString().padStart(2, '0')} `}</span>
                                            <img onClick={() => handleButton('add')} src={Add} className='add-img' />

                                        </div>
                                        )}
                                </div>
                            ) : null}
                    </div>
                    <div>{generateInputFields('ageOfElderParent', count1)}</div>
                    <div>
                        {generateParentInLaw("ageOfElderParentInLaw", count2)}
                    </div>
                    <div className='d-flex justify-content-center quote-div'>
                        <button type="submit" className='quote'>Get Quote</button>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <footer className='d-flex footer-div' >
                    <a ><pre > About Us  |</pre></a>
                    <a> <pre>  Terms & Conditions |</pre></a>
                    <a><pre>  Privacy Policy</pre></a>
                </footer>
            </div>
        </form >

    );
};

export default Stepper1;
