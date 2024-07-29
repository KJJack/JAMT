import React from 'react';
import '../styles/AppCard.css'
import { formatDate } from '../util/UtilFunctions';

export default function AppCard({application, onRowClick}) {
    return(
        <tr className="table-row" onClick={() => onRowClick(application)}>
            <td>{application.company}</td>
            <td>{application.position}</td>
            <td>{application.location}</td>
            <td>{application.appSource !== 'Other' ? application.appSource : application.custSource}</td>
            <td>{formatDate(application.createdAt)}</td>
            <td>{application.contacted ? 'Yes' : 'Pending'}</td>
        </tr>
    );
}