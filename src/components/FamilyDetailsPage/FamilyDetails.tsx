import { SetStateAction, useContext, useState } from 'react';
import '../../css/FamilyDetails.css';
import axios from 'axios';
import Form from './FDForms';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';


const Famdetails = () => {

    const [curstate, setCurrentstate] = useState(0); //form change

    const datas = ["you", "spouse", "child1", "child2", "parent1", "parent2", "parentInLaw1", "parentInLaw2"] //members

    const requiredFields = ['Name', 'Age', 'Email']; // required fields

    let required: string[] = []; //list to store name of req field

    const [submitError, setSubmitError] = useState('') //error

    const [formError, setFormError] = useState<{ [key: string]: string }>({}) // form errors

    // const [Finishedicon, setFinishedIcon] = useState<{ [key: string]: boolean }>({}); //Finish icon


    for (const Item of datas) {
        // required = requiredFields.map(field => `${Item}${field}`);
        required.push(...requiredFields.map(field => `${Item}${field}`));
    }

    const [formData, setFormData] = useState({}); //storing data

    const state = useContext(UserContext)
    const navigate = useNavigate()

    const handleclick = (index: SetStateAction<number>) => {
        setCurrentstate(index);
        // console.log(formData)
        // console.log(curstate)
    } //form change



    const validateFormData = () => {
        const isItemValid = required.every(field => (formData as any)[field]);
        console.log(isItemValid);
        if (!isItemValid) {
            setSubmitError("Fill all the required fields")
        }
        else {
            setSubmitError('')
        }
        return isItemValid;
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const keys = Object.keys(formError);
        const valuesAreEmpty = keys.every(key => formError[key] === '');
        if (validateFormData()) {
            console.log("valid");
            if (keys.length === 0 || valuesAreEmpty) {
                console.log("valid");
                // setFinishedIcon({ curstate: true });
                // console.log(Finishedicon)
                try {
                    console.log("no error added")
                    const response = await axios.post('http://10.54.7.80:1301/api/getQuote/getQuote/details', formData);
                    console.log(response.data.message);
                    console.log("data added");
                    setFormData({});
                    setFormError({});
                    state.setS3state('true');
                    state.setColorStep(2);
                    navigate('/approval');
                }
                catch (error) {
                    console.error("Error submitting form:", error);
                }
            }
            else {
                console.log("notvalid");
                console.log(formError)
            }
        }
    }

    return (
        <div className="details-body pt-xxl-2">
            <p className='fam-details-body-text'>Fill in your details</p>
            <div className="details-container">
                <div className='fam-names'>
                    {datas.map((data, index) => (
                        <a
                            className={`click ${curstate === index ? 'active' : ''}`}
                            key={index}
                            onClick={() => {
                                handleclick(index);
                            }}
                        >
                            {data}
                        </a>
                    ))}
                </div>
                <div className="fam-details">

                    {datas[curstate] && (
                        <Form
                            name={`${datas[curstate]}Name`}
                            age={`${datas[curstate]}Age`}
                            gender={`${datas[curstate]}Gender`}
                            phoneNumber={`${datas[curstate]}PhoneNumber`}
                            countrycode={`${datas[curstate]}CountryCode`}
                            email={`${datas[curstate]}Email`}
                            preExistingDisease={`${datas[curstate]}PreExistingDisease`}
                            medicalCondition={`${datas[curstate]}DesMedicalCon`}
                            formdata={formData}
                            setformdata={setFormData}
                            submit={handleSubmit}
                            setformerror={setFormError}
                        />
                    )}
                </div>
            </div>
            {submitError ? <div className='form-error'>{submitError}</div> : ""}
            <div className='fam-button'>
                <button className='form-button' form='details'>Request Approval</button>
            </div>
        </div>
    )
}

export default Famdetails
