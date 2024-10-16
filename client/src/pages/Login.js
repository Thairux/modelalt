//client/src/pages
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token); // Store the token

            alert('Login successful!');

            // Decode the token to get the user's role
            const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
            const userRole = decodedToken.role;

            // Redirect based on role
            if (userRole === 'agency') {
                navigate('/agency-dashboard'); // Route for agencies
            } else if (userRole === 'model') {
                navigate('/model-dashboard'); // Route for models
            } else if (userRole === 'designer') {
                navigate('/designer-dashboard'); // Route for designers
            } else {
                navigate('/dashboard'); // Default route if role is unrecognized
            }
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;