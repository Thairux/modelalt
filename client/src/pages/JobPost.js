//client/src/pages
import React, { useState } from 'react';
import axios from 'axios';

const JobPost = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/jobs/post', { title: jobTitle, description });
            alert('Job posted successfully!');
            setJobTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job');
        }
    };

    return (
        <div>
            <h2>Post a Job</h2>
            <form onSubmit={handlePostJob}>
                <input 
                    type="text" 
                    placeholder="Job Title" 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Job Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default JobPost;