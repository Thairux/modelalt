//client/src/pages
import React, { useState } from 'react';
import axios from 'axios';

const PortfolioManagement = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/api/portfolio/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Portfolio uploaded successfully!');
        } catch (error) {
            console.error('Error uploading portfolio:', error);
            alert('Error uploading portfolio');
        }
    };

    return (
        <div>
            <h2>Manage Portfolio</h2>
            <form onSubmit={handleUpload}>
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default PortfolioManagement;