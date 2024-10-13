import React from 'react';
import '../App.css'
const TopNavBar = () => {
    return (
        <div className="top-nav">
            <div className="logo">Event Management</div>
            <nav className='navbar-topnav'>
                <input type="text" placeholder="Search" />
                <div className="notifications">
                    <span>🔔 3</span>
                    <span>💬 15</span>
                </div>
            </nav>
        </div>
    );
};

export default TopNavBar;
