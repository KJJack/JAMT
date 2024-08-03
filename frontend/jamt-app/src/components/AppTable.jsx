import { useState } from 'react';
import AppDetails from './AppDetails';
import AppCard from "./appCard";
import TableSearch from './TableSearch';

export default function AppTable({ dataPerPage, handleTableSort, sortConfiguration }) {

    const [selectedApp, setSelectedApp] = useState(null);

    const handleRowClick = (application) => {
        setSelectedApp(application);
    }

    return(
        <>
            {selectedApp && <AppDetails application={selectedApp} />}
            <TableSearch />
            <div className='apptable-container'>
                <div className='apptable-header'>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleTableSort('company')}>Company {sortConfiguration.key === 'company' && (sortConfiguration.direction === 'ascending' ? '↑' : '↓')}</th>
                                <th onClick={() => handleTableSort('position')}>Position {sortConfiguration.key === 'position' && (sortConfiguration.direction === 'ascending' ? '↑' : '↓')}</th>
                                <th onClick={() => handleTableSort('location')}>Location {sortConfiguration.key === 'location' && (sortConfiguration.direction === 'ascending' ? '↑' : '↓')}</th>
                                <th onClick={() => handleTableSort('appSource')}>Source {sortConfiguration.key === 'appSource' && (sortConfiguration.direction === 'ascending' ? '↑' : '↓')}</th>
                                <th onClick={() => handleTableSort('created')}>Applied {sortConfiguration.key === 'created' && (sortConfiguration.direction === 'ascending' ? '↑' : '↓')}</th>
                                <th>Status</th>
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