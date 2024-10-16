//client/src/pages
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobApplications = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs'); // Fetch available jobs
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = async (jobId) => {
        try {
            await axios.post(`/api/jobs/apply/${jobId}`);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Error applying for job');
        }
    };

    return (
        <div>
            <h2>Available Jobs</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        {job.title}
                        <button onClick={() => handleApply(job.id)}>Apply</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobApplications;