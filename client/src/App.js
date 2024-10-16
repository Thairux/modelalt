import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ModelDashboard from './pages/ModelDashboard';
import AgencyDashboard from './pages/AgencyDashboard';
import DesignerDashboard from './pages/DesignerDashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route 
                    path="/model-dashboard" 
                    element={<ProtectedRoute element={ModelDashboard} allowedRoles={['model']} />} 
                />
                <Route 
                    path="/agency-dashboard" 
                    element={<ProtectedRoute element={AgencyDashboard} allowedRoles={['agency']} />} 
                />
                <Route 
                    path="/designer-dashboard" 
                    element={<ProtectedRoute element={DesignerDashboard} allowedRoles={['designer']} />} 
                />
            </Routes>
        </Router>
    );
};

export default App;