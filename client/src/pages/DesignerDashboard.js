import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioManagement from './PortfolioManagement';
import Messaging from './Messaging';
import Search from '../components/Search';
import ProfileManagement from './ProfileManagement';

const DesignerDashboard = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('/api/models');
                setModels(response.data);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };
        fetchModels();
    }, []);

    const handleSearch = async (query) => {
        try {
            const response = await axios.get(`/api/models/search?query=${query}`);
            setModels(response.data);
        } catch (error) {
            console.error('Error searching models:', error);
        }
    };

    return (
        <div>
            <h2>Designer Dashboard</h2>
            <ProfileManagement />
            <PortfolioManagement />
            <h3>Available Models</h3>
            <Search onSearch={handleSearch} />
            <ul>
                {models.map((model) => (
                    <li key={model.id}>{model.username}</li>
                ))}
            </ul>
            <Messaging />
        </div>
    );
};

export default DesignerDashboard;