import { useState } from 'react';
import '../../css/FamilyDetails.css';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'



const Form = (props: { name: string; age: any; gender: string; phoneNumber: any; countrycode: string; email: string; preExistingDisease: string; medicalCondition: string; formdata: any, setformdata: any, submit: any, setformerror: any }) => {

    const { name, age, gender, phoneNumber, countrycode, email, preExistingDisease, medicalCondition, formdata, setformdata, submit, setformerror } = props;

    const [error, setError] = useState<{ [key: string]: string }>({});//for error handling

    // const [Value, setValue] = useState<string | undefined>()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        event.preventDefault();
        setformdata((prev: any) => ({ ...prev, [name]: value }))
        console.log(formdata)
    };


    const handlenameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        event.preventDefault();
        if (value === "") {
            setError((prev: any) => ({ ...prev, [name]: 'Name required' }))
            setformerror((prev: any) => ({ ...prev, [name]: 'Name required' }))
            console.log("error")
        } else {
            setError((prev: any) => ({ ...prev, [name]: "" }))
            setformerror((prev: any) => ({ ...prev, [name]: '' }))
        }
        setformdata((prev: any) => ({ ...prev, [name]: value }))
        console.log(formdata)
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        event.preventDefault();
        if (value === "") {
            setError((prev: any) => ({ ...prev, [name]: 'Email required' }))
            setformerror((prev: any) => ({ ...prev, [name]: 'Email required' }))
            console.log("error")
        }
        else if (!/^\S+@\S+\.\S+$/.test(value)) {
            setError((prev: any) => ({ ...prev, [name]: 'Invalid email address' }))
            setformerror((prev: any) => ({ ...prev, [name]: 'Invalid email address' }))
        }
        else {
            setError((prev: any) => ({ ...prev, [name]: "" }))
            setformerror((prev: any) => ({ ...prev, [name]: '' }))
        }
        setformdata((prev: any) => ({ ...prev, [name]: value }))
        console.log(formdata)
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        event.preventDefault();
        if (value === "") {
            setError((prev: any) => ({ ...prev, [name]: 'Age required' }))
            setformerror((prev: any) => ({ ...prev, [name]: 'Age required' }))
            console.log("error")
        } else {
            setError((prev: any) => ({ ...prev, [name]: "" }))
            setformerror((prev: any) => ({ ...prev, [name]: '' }))
        }
        setformdata((prev: any) => ({ ...prev, [name]: value }))
        console.log(formdata)
    };

    const handleMedConditionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        event.preventDefault();
        if (value === "") {
            setError((prev: any) => ({ ...prev, [name]: 'Field should not be empty' }))
            setformerror((prev: any) => ({ ...prev, [name]: 'Field should not be empty' }))
            console.log("error")
        } else {
            setError((prev: any) => ({ ...prev, [name]: "" }))
            setformerror((prev: any) => ({ ...prev, [name]: '' }))
        }
        setformdata((prev: any) => ({ ...prev, [name]: value }))
        console.log(formdata)
    };


    // const handleNumChange = (input: any) => {
    //     if (input && input.target) {
    //         const { name, value } = input.target;
    //         console.log(value)
    //         setValue(value);
    //     }
    //     console.log(Value);
    // };

    return (
        <form key={name} id='details' onSubmit={submit}>
            <div className='fam-row1'>
                <div className='form-name'>
                    <label>Name<sup>*</sup></label>
                    <input className='form-input-name' type='text' required name={name} value={formdata[name]} onChange={handlenameChange}
                        onKeyDown={(e) => {
                            if (!/[a-zA-Z]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                            }
                        }}
                    />
                    {error[name] ? <div className='err-msg'>{error[name]}</div> : ""}
                </div>
                <div className='form-age'>
                    <label>Age<sup>*</sup></label>
                    <input className='form-input-age' required name={age} value={formdata[age]} onChange={handleAgeChange}
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                            }
                        }}
                        maxLength={3}
                    />
                    {error[age] ? <div className='err-msg'>{error[age]}</div> : ""}
                </div>
                <div className='form-gender'>
                    <label>Gender<sup>*</sup></label>
                    <select className='form-input-gender' required onChange={handleChange} name={gender} value={formdata[gender]}>
                        <option value='' disabled selected>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>
            </div>

            <div className='fam-row2'>
                <div className='form-number'>
                    <label>Phone Number</label>
                    <div className='form-num'>
                        <select className='form-input-no' onChange={handleChange} name={countrycode} value={formdata[countrycode]}>
                            <option value='' disabled selected></option>
                            <option value={91}>India</option>
                            <option value={49}>Germany</option>
                            <option value={1}>US</option>
                            <option value={44}>UK</option>
                            <option value={33}>France</option>
                        </select>
                        <input className='form-input-number' onChange={handleChange} name={phoneNumber} value={formdata[phoneNumber]}
                            onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                    e.preventDefault();
                                }
                            }}
                            maxLength={15}
                            minLength={8} />
                        {/* <PhoneInput
                            value={Value}
                            onChange={handleNumChange}
                        /> */}
                    </div>
                </div>
                <div className='form-email'>
                    <label>Email</label>
                    <input className='form-input-email' name={email} value={formdata[email]} onChange={handleEmailChange} />
                    {error[email] ? <div className='err-msg'>{error[email]}</div> : ""}
                </div>
            </div>

            <div className='form-disease'>
                <label>Pre existing disease</label>
                <select className='form-input-disease' onChange={handleChange} name={preExistingDisease} value={formdata[preExistingDisease]}></select>
            </div>

            <div className='form-med-condition'>
                <label>Describe your medical condition</label>
                <input className='form-input-medcon' placeholder='Enter Attribute' name={medicalCondition} onChange={handleMedConditionChange} value={formdata[medicalCondition]}
                    onKeyDown={(e) => {
                        if (!/[a-zA-Z]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                            e.preventDefault();
                        }
                    }}
                />
                {error[medicalCondition] ? <div className='err-msg'>{error[medicalCondition]}</div> : ""}
            </div>
        </form>
    )
}

export default Form;