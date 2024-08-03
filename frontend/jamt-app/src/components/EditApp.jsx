import { useState, useContext } from 'react';
import { UserContext } from '../util/UserContext';
import { updateUserApplication, getUserApplications } from '../api/api';

export default function EditApp({ application }) {

    const { user, setApplications } = useContext(UserContext);
    const [company, setCompany] = useState(application.company);
    const [companyUrl, setCompanyUrl] = useState(application.companyUrl);
    const [position, setPosition] = useState(application.position);
    const [location, setLocation] = useState(application.location);
    const [appSource, setAppSource] = useState(application.appSource);
    const [custSource, setCustSource] = useState(application.custSource);
    const [prereqs, setPrereqs] = useState(application.prereqs);


    const tempApplicationClick = () => {
        console.log(application);
    }

    const handleSubmit = async () => {
        
        const userId = user.id || user._id;
        const applicationId = application.id || application._id;
        const updatedApplication = {
            company,
            companyUrl,
            position,
            location,
            appSource,
            custSource,
            prereqs
        };

        try {
            const response = await updateUserApplication(userId, applicationId, updatedApplication);
            const updatedApps = await getUserApplications(userId);
            setApplications(updatedApps);
            console.log(`Update Response: `, response);

        } catch (error) {
            console.log(error);
        }
    }

    // need to create a handle function to change custSouce to ''
    // when all but 'other' radio buttons have been cheked

    const handleAppSourceChange = (e) => {
        const selectedSource = e.target.value;
        setAppSource(selectedSource);

        if (selectedSource !== 'Other') {
            setCustSource('');
        }
    }

   const handleCheck = () => {
    const test = {
        company,
        companyUrl,
        position,
        location,
        appSource,
        custSource,
        prereqs
    }
    console.log(test);
   }

    return(
        <div>
            <label>Company: </label>
            <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <label>Company Url: </label>
            <input
                type='text'
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
            />

            <label>Position: </label>
            <input
                type='text'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />

            <label>Location: </label>
            <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)} 
            />

            <label>App Source: </label>
            <input
                type='radio'
                value='Indeed'
                id='indeed'
                checked={appSource === 'Indeed'}
                onChange={handleAppSourceChange}
            />
            <label htmlFor='indeed'>Indeed</label>
            <input
                type='radio'
                value='Linkedin'
                id='linkedin'
                checked={appSource === 'Linkedin'}
                onChange={handleAppSourceChange}
            />
            <label htmlFor='lindedin'>Linkedin</label>
            <input
                type='radio'
                value='Company'
                id='company'
                checked={appSource === 'Company'}
                onChange={handleAppSourceChange}
            />

            <label htmlFor='company'>Company</label>
            <input
                type='radio'
                value='Other'
                id='other'
                checked={appSource === 'Other'}
                onChange={handleAppSourceChange}
            />
            <label htmlFor='other'>Other</label>
            {
                appSource === 'Other' && (
                    <input
                        value={custSource}
                        onChange={(e) => setCustSource(e.target.value)}
                        placeholder={custSource}
                    />
                )
            }

            <label>Language Requirements</label>
            <input
                type='text'
                value={prereqs}
                onChange={(e) => setPrereqs(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCheck}>Check</button>
        </div>
    ); 
}