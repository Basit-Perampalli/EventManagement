import React from 'react';

const Sidebar = ({ onCreateEventClick }) => {
    return (
        <div className="sidebar">
            <div className="profile-section">
                <h4>Hello, Name</h4>
                {/* Add Name using backend or props */}
            </div>
            <nav>
                <ul>
                    <li>Dashboard</li>
                    <li>Event Category</li>
                    <li>Create Category</li>
                    <li>Events</li>
                    <li onClick={onCreateEventClick}>Create Event</li>
                    {/* Add other menu items */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
