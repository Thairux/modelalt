import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Log the input values for debugging
            console.log('Attempting to log in with:', { username, password });

            const response = await axios.post('/api/auth/login', { username, password });
            alert('Login successful! Token: ' + response.data.token);
            
            // Optionally store the token in local storage or state
            localStorage.setItem('token', response.data.token); // Store the token
        } catch (error) {
            // Check if error response exists
            if (error.response) {
                console.error('Login error response:', error.response.data); // Log the error response for debugging
                alert(error.response.data.message); // Use the error message from the server
            } else {
                console.error('Login failed:', error.message); // Log the fallback error
                alert('Login failed: ' + error.message); // Fallback for other errors
            }
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