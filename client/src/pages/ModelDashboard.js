import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobApplications from './JobApplications';
import PortfolioManagement from './PortfolioManagement';
import Messaging from './Messaging';
import Search from '../components/Search';
import ProfileManagement from './ProfileManagement';

const ModelDashboard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleSearch = async (query) => {
        try {
            const response = await axios.get(`/api/jobs/search?query=${query}`);
            setJobs(response.data);
        } catch (error) {
            console.error('Error searching jobs:', error);
        }
    };

    return (
        <div>
            <h2>Model Dashboard</h2>
            <ProfileManagement />
            <PortfolioManagement />
            <h3>Job Listings</h3>
            <Search onSearch={handleSearch} />
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>{job.title}</li>
                ))}
            </ul>
            <JobApplications />
            <Messaging />
        </div>
    );
};

export default ModelDashboard;