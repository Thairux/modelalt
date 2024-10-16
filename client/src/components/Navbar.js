import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    let userRole = null;

    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        userRole = decodedToken.role;
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to home after logout
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {userRole === 'agency' && <Link to="/agency-dashboard">Agency Dashboard</Link>}
            {userRole === 'model' && <Link to="/model-dashboard">Model Dashboard</Link>}
            {userRole === 'designer' && <Link to="/designer-dashboard">Designer Dashboard</Link>}
            {!token ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;