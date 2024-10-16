import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPost from './JobPost';
import Messaging from './Messaging';
import ProfileManagement from './ProfileManagement';

const AgencyDashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('/api/applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };
        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Agency Dashboard</h2>
            <ProfileManagement />
            <JobPost />
            <h3>Applications</h3>
            <ul>
                {applications.map((application) => (
                    <li key={application.id}>
                        {application.modelName} applied for {application.jobTitle}
                    </li>
                ))}
            </ul>
            <Messaging />
        </div>
    );
};

export default AgencyDashboard;