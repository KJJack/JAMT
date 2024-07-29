import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { validateAndFormatURL } from '../util/UtilFunctions';
import { useContext } from 'react';
import { UserContext } from '../util/UserContext';
import { createUserApplication, getUserApplications } from '../api/api';

export default function CreateApp() {

    const { user, setApplications } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [customSource, setCustomSource] = useState('');
    const [reqs, setReqs] = useState('');
    const [payType, setPayType] = useState('');
    const [newApplication, setNewApplication] = useState({
        company: '',
        companyUrl: '',
        position: '',
        location: '',
        description: '',
        appSource: '',
        salary: 0,
        hourly: 0,
        custSource: '',
        confidence: 0,
        prereqs: []
    })

    const toggleVisible = () => {
        setVisible(v => v = !v);
        setStep(1);
        console.log(visible);
    }

    const nextStep = () => {
        setStep(s => s + 1);
        console.log(newApplication);
        console.log('here is the custom source: ', customSource);
        console.log('here are the prereqs: ', reqs);
    }

    const prevStep = () => {
        setStep(s => s - 1);
    }

    const reqsToArray = () => {
        return reqs.split(',').map(req => req.trim());
    }

    // semi-works, there seems to be a token issue when the user has logged out from a different user and
    // tries posting an application to the current user that is logged in.
    // confirmed was logged into 5790 but when switched to 7590 the token was still the previous (5790) token
    // need to check login and logout token assignment and deletion
    const handleSubmit = async () => {
        const updatedApplication = {
            ...newApplication,
            companyUrl: validateAndFormatURL(newApplication.companyUrl),
            prereqs: reqsToArray()
        }

        console.log(user);

        try {
            const userId = user._id || user.id
            const response = await createUserApplication(userId, updatedApplication);
            console.log('Application created:', response);
            const updatedApplications = await getUserApplications(userId);
            setApplications(updatedApplications);
            toggleVisible();
            //window.location.reload();
            setNewApplication({
                company: '',
                companyUrl: '',
                position: '',
                location: '',
                description: '',
                appSource: '',
                salary: 0,
                hourly: 0,
                custSource: '',
                confidence: 0,
                prereqs: []
            });
        } catch(error) {
            console.log('Error creating application: ', error);
        }

        console.log(updatedApplication);
    }

    const handleFinalize = () => {
        setNewApplication(prevState => ({
            ...newApplication,
            companyUrl: validateAndFormatURL(newApplication.companyUrl),
            prereqs: reqsToArray()
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewApplication(prevState => ({ 
            ...newApplication, 
            [name]: name === 'confidence' ? parseInt(value) : value,
        }));

        if (name === 'appSource' && value !== 'Other') {
            setCustomSource('');
        }
    }

    const handleCustomSourceChange = (e) => {
        const { value } = e.target;
        setCustomSource(value);
        setNewApplication({
            ...newApplication,
            appSource: 'Other',
            custSource: value
        });
    };

    const handleConfidence = (e) => {
        const { name, value } = e.target;
        setNewApplication(prevState => ({
            ...prevState,
            confidence: parseInt(value)
        }))
    }

    const handlePayTypeChange = (e) => {
        setPayType(e.target.value);
    }

    const handlePayAmountChange = (e) => {
        const { value } = e.target;
        setNewApplication(prevState => ({
            ...prevState,
            [payType]: value
        }))
    }

    const renderApplicationSteps = () => {
        switch (step) {

            //////////////////////////////////////////////////////////////////////////////////////
            //                              Company information
            //////////////////////////////////////////////////////////////////////////////////////
            case 1:
                return (
                    <div>
                        <h1>Company</h1>
                        <input
                            name='company'
                            value={newApplication.company}
                            type='text'
                            onChange={handleChange}
                        />

                        <h1>Company URL</h1>
                        <input
                                name="companyUrl"
                                value={newApplication.companyUrl}
                                type='url'
                                onChange={handleChange}
                        />

                        <p>Application source: </p>
                        <input
                            name='appSource'
                            value='Indeed'
                            type='radio'
                            id='indeed'
                            onChange={handleChange}
                            checked={newApplication.appSource === 'Indeed'}
                        />
                        <label htmlFor='indeed'>Indeed</label>

                        <input
                            name='appSource'
                            value='Linkedin'
                            type='radio'
                            id='linkedin'
                            onChange={handleChange}
                            checked={newApplication.appSource === 'Linkedin'}
                        />
                        <label htmlFor='linkedin'>Linkedin</label>

                        <input
                            name='appSource'
                            value='Company'
                            type='radio'
                            id='company'
                            onChange={handleChange}
                            checked={newApplication.appSource === 'Company'}
                        />
                        <label htmlFor='company'>Company</label>

                        <input
                            name='appSource'
                            value='Other'
                            type='radio'
                            id='other'
                            onChange={handleChange}
                            checked={newApplication.appSource === 'Other'}
                        />
                        <label htmlFor='other'>Other</label>

                        {newApplication.appSource === 'Other' && (
                            <input
                                name='customSource'
                                value={customSource}
                                onChange={handleCustomSourceChange}
                                placeholder='Please specify'
                            />
                        )}
                    </div>
                )

            //////////////////////////////////////////////////////////////////////////////////////
            //                              Position Details
            //////////////////////////////////////////////////////////////////////////////////////
            case 2:
                return (
                    <div>
                        <h1>Position</h1>
                        <input
                            name='position'
                            value={newApplication.position}
                            type='text'
                            onChange={handleChange} 
                        />

                        <h1>Language requirements</h1>
                        <p>Please seperate each language with a comma ','</p>
                        <input
                            name='prereqs'
                            value={reqs}
                            type='text'
                            onChange={(e) => setReqs(e.target.value)} 
                        />

                        <h1>Location</h1>
                        <input
                            name='location'
                            value={newApplication.location}
                            type='text'
                            placeholder='city, state'
                            onChange={handleChange} 
                        />
                    </div>
                )

            case 3:
                return(
                    <div>
                        <h1>Details</h1>

                        <h1>Pay</h1>

                        <input
                            name='payType'
                            value='salary'
                            type='radio'
                            id='salary'
                            onChange={handlePayTypeChange}
                            checked={payType === 'salary'}
                        />
                        <label htmlFor='salary'>Salary</label>

                        <input
                            name='payType'
                            value='hourly'
                            type='radio'
                            id='hourly'
                            onChange={handlePayTypeChange}
                            checked={payType === 'hourly'}
                        />

                        <label htmlFor='hourly'>Hourly</label>

                        {payType && (
                            <div>
                                <h2>{payType.charAt(0).toUpperCase() + payType.slice(1)} Amount</h2>
                                <input
                                    name={payType}
                                    value={newApplication[payType]}
                                    type='text'
                                    onChange={handlePayAmountChange}
                                    placeholder={`Enter ${payType} amount`}
                                />
                            </div>
                        )}

                        <h1>Match Rating</h1>
                        <select
                            name='confidence'
                            value={newApplication.confidence}
                            onChange={handleChange}
                        >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>


                        {/* handleSubmit
                        <button onClick={handleFinalize}>Submit</button> */}
                    </div>
                )
            
            case 4:
                return (
                    <div>
                        <p>Company: {newApplication.company}</p>
                        <p>CompanyURL: {newApplication.companyUrl}</p>
                        <p>Application Source: {newApplication.appSource === 'Other' ? newApplication.custSource : newApplication.appSource}</p>
                        <p>Position: {newApplication.position}</p>
                        <p>Pay: {newApplication.salary === 0 ? newApplication.hourly : newApplication.salary}</p>
                        <p>Location: {newApplication.location}</p>
                        <p>Confidence: {newApplication.confidence}</p>

                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )

            default:
                return null;
        }
    }

    return(
        <>
            <div className="create-application-btn" onClick={toggleVisible}>
                <FontAwesomeIcon id='create-app-icon' icon={faPlus} style={{ color: 'white', height: '25px', width: '25px'}} />
            </div>

            {visible && <div className='overlay' onClick={e => e.stopPropagation()}></div>}

            { visible && <div className='create-application-field-container'>
                <div className='exit-application-field-btn' onClick={toggleVisible}></div>

                {renderApplicationSteps()}

                {step !== 4 && <div><button onClick={prevStep}>Prev</button><button onClick={nextStep}>Next</button></div>}

            </div>}
        
        </>
    );
}