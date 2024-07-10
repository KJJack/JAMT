import { useEffect, useState } from 'react';
import axios from 'axios';
import AppDetails from './AppDetails';
import AppCard from "./appCard";
import App from '../App';

export default function AppTable({ dataPerPage }) {

    const [selectedApp, setSelectedApp] = useState(null);

    const handleRowClick = (application) => {
        setSelectedApp(application);
    }

    return(
        <>
            {selectedApp && <AppDetails application={selectedApp} />}
            <div className='apptable-container'>
                <div className='apptable-header'>
                    <table>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Location</th>
                                <th>Prereqs</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='apptable-body'>
                    <table>
                        <tbody>
                            {dataPerPage.map((application) => (
                                <AppCard 
                                    key={application._id} 
                                    application={application}
                                    onRowClick={handleRowClick}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}