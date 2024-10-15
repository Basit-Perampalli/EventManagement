import EventImg from '../assets/event.png';
import CompleteImg from '../assets/calendar-check.png';
import Dashboard from '../assets/dashboard.png';
import PendingEvent from '../assets/agenda.png';
import '../App.css';
import { useEffect, useState } from 'react';

const Sidebar = ({ onCreateEventClick }) => {
    const [user_type,setUser_type] = useState('');
    
    useEffect(()=>{
        const userType = localStorage.getItem('usertype')
        setUser_type(userType)
    })
    return (
        <div className="sidebar">
            <div className="profile-section">
                <h4>Hello, Name</h4>
                {/* Add Name dynamically using backend or props */}
            </div>
            <nav>
                <ul>
                    {user_type === 'organizer' && (
                        <>
                            <li>
                                <div className='sidebar-icons'>
                                    <img src={Dashboard} alt="Dashboard" />
                                </div>
                                <div>My Events</div>
                            </li>
                            <li>
                                <div className='sidebar-icons'>
                                    <img src={PendingEvent} alt="Upcoming Events" />
                                </div>
                                <div>Upcoming Events</div>
                            </li>
                            <li>
                                <div className='sidebar-icons'>
                                    <img src={CompleteImg} alt="Completed Events" />
                                </div>
                                <div>Completed Events</div>
                            </li>
                            <li onClick={onCreateEventClick}>
                                <div className='sidebar-icons' style={{ height: '25px', width: '25px' }}>
                                    <img src={EventImg} alt="Create Event" />
                                </div>
                                <div>Create Event</div>
                            </li>
                        </>
                    )}
                    {user_type === 'regular' && (
                        <>
                            <li>
                                <div className='sidebar-icons'>
                                    <img src={PendingEvent} alt="Upcoming Events" />
                                </div>
                                <div>Upcoming Events</div>
                            </li>
                            <li>
                                <div className='sidebar-icons'>
                                    <img src={CompleteImg} alt="Completed Events" />
                                </div>
                                <div>Completed Events</div>
                            </li>
                        </>
                    )}
                    {/* Add other common menu items if needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
