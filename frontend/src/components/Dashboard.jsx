import React from 'react';
import EventTable from './EventTable';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="stats">
                <div className="stat-card" style={{ backgroundColor: '#1ea488' }}>
                    <h3>2</h3>
                    <p>Event Category</p>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#28a745' }}>
                    <h3>3</h3>
                    <p>Events</p>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ffc107' }}>
                    <h3>6</h3>
                    <p>User Registrations</p>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ce3844' }}>
                    <h3>1</h3>
                    <p>Complete Event</p>
                </div>
            </div>
            <EventTable />
        </div>
    );
};

export default Dashboard;
