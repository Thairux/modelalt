//client/src/pages
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const token = localStorage.getItem('token');
    let userRole = null;

    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        userRole = decodedToken.role;
    }

    // Check if the user's role is in the allowed roles
    if (!token || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/login" />;
    }

    return <Component />;
};

export default ProtectedRoute;