import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const TopNavBar = () => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('accessToken');  // Remove access token from localStorage
        localStorage.removeItem('refreshToken'); // Remove refresh token from localStorage
        navigate('/');  // Redirect to login page
    };

    return (
        <div className="top-nav">
            <div className="logo">Event Management</div>
            <div className="nav-links">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default TopNavBar;
