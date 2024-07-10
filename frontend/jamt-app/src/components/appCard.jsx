import React from 'react';
import '../styles/AppCard.css'

export default function AppCard({application, onRowClick}) {
    return(
        <tr className="table-row" onClick={() => onRowClick(application)}>
            <td>{application.company}</td>
            <td>{application.position}</td>
            <td>{application.location}</td>
            <td>{application.prereqs}</td>
            <td>{application.createdAt}</td>
            <td>
                <button>Test</button>
            </td>
        </tr>
    );
}