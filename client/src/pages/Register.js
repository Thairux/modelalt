import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', { username, password });
            alert('Registration successful! You can now log in.');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('Registration failed: ' + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;