import { SetStateAction, useState } from 'react';
import './FamilyDetails.css';
// import Formstepper from './stepper';
import axios from 'axios';
import Form from './Forms';


const Famdetails = () => {

    const [curstate, setCurrentstate] = useState(0); //form change

    const datas = ["you", "spouse", "child1", "child2", "parent1", "parent2", "parentInLaw1", "parentInLaw2"] //members

    const requiredFields = ['Name', 'Age', 'Email']; // required fields

    let required: string[] = []; //list to store name of req field

    const [submitError, setSubmitError] = useState('') //error

    const [formError, setFormError] = useState<{ [key: string]: string }>({}) // form errors

    for (const Item of datas) {
        // required = requiredFields.map(field => `${Item}${field}`);
        required.push(...requiredFields.map(field => `${Item}${field}`));
    }
    // console.log(required);


    const [formData, setFormData] = useState({}); //storing data

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
                try {
                    console.log("no error added")
                    const response = await axios.post('http://10.54.7.80:1301/api/getQuote/getQuote/details', formData);
                    console.log(response.data.message);
                    console.log("data added");
                    setFormData({});
                    setFormError({});
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
        <div className='family-details-screen'>
            <div className='fam-details-header'>
                <div className='fam-details-title'>
                    <img src='group1.svg' width="38" height="45" className='logo'></img>
                    <p className='fam-details-titlename'>Insurance Company</p>
                </div>
                <div className='fam-details-login-logo'>
                    <p className='fam-details-login-text'>Login</p>
                    <img src='login-logo.svg' width="30" height="30" className='logo'></img>
                </div>
            </div>
            <div className="details-body">
                {/* <Formstepper /> */}
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
        </div>
    )
}

export default Famdetails
