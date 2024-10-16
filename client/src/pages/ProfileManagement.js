import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileManagement = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile');
                setBio(response.data.bio);
                setEmail(response.data.email); // Fetch email data
                setPortfolio(response.data.portfolio);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
        formData.append('bio', bio);
        formData.append('email', email); // Add email to form data

        try {
            await axios.post('/api/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Profile Management</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label>Profile Picture:</label>
                    <input type="file" onChange={handleProfilePictureChange} accept="image/*" />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea value={bio} onChange={handleBioChange} placeholder="Tell us about yourself..." />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                </div>
                <button type="submit">Update Profile</button>
            </form>

            <h3>Your Portfolio</h3>
            <ul>
                {portfolio.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileManagement;