import EventImg from '../assets/event.png';
import CompleteImg from '../assets/calendar-check.png';
import Dashboard from '../assets/dashboard.png';
import PendingEvent from '../assets/agenda.png';
import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const Sidebar = ({ onCreateEventClick }) => {
    const [user_type,setUser_type] = useState('');
    const navigate = useNavigate();
    const {setCurrRoute,clearFilters}=useContext(EventContext)
    
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
                            <li onClick={()=> {navigate('/home');setCurrRoute('home');clearFilters()}}>
                                <div className='sidebar-icons'>
                                    <img src={Dashboard} alt="Dashboard" />
                                </div>
                                <div>Dashboard</div>
                            </li>
                            {/* <li onClick={()=> {navigate('upcomingevents');setCurrRoute('upcomingevents');clearFilters()}}>
                                <div className='sidebar-icons'>
                                    <img src={PendingEvent} alt="Upcoming Events" />
                                </div>
                                <div>Upcoming Events</div>
                            </li>
                            <li onClick={()=> {navigate('completedevents');setCurrRoute('completedevents');clearFilters()}}>
                                <div className='sidebar-icons'>
                                    <img src={CompleteImg} alt="Completed Events" />
                                </div>
                                <div>Completed Events</div>
                            </li> */}
                            {user_type === 'organizer' &&
                            <>
                            <li onClick={()=> {navigate('myevents');setCurrRoute('myevents');clearFilters()}}>
                                <div className='sidebar-icons'>
                                    <img src={Dashboard} alt="My Events" />
                                </div>
                                <div>My Events</div>
                            </li>
                            <li onClick={onCreateEventClick}>
                                <div className='sidebar-icons' style={{ height: '25px', width: '25px' }}>
                                    <img src={EventImg} alt="Create Event" />
                                </div>
                                <div>Create Event</div>
                            </li>
                            </>}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
