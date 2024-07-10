import { useState } from 'react';


export default function AppDetails({ application }) {

    const [details, setDetails] = useState();

    return(
        <div className='application-details-container'>
            <span>Company: <a href='https://www.google.com' target='_'>{application.company}</a></span>
            <span>Position: {application.position}</span>
            <span>Location: {application.location}</span>
            <span>Applied Date: {application.addedAt}</span>
            <span>Contacted: {application.contacted ? 'Yes' : 'No'}</span>
            <span>Contacted Date: {application.contactedAt}</span>
            <span>Reqs: {application.prereqs}</span>
        </div>
    );
}