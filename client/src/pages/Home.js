//client/src/pages
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to ModelAlt</h1>
            <p>Your platform for connecting models, designers, and agencies.</p>
            <p>Please log in or register to get started!</p>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
    );
};

export default Home;