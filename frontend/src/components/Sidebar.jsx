import EventImg from '../assets/event.png';
import CompleteImg from '../assets/calendar-check.png';
import Dashboard from '../assets/dashboard.png';
import PendingEvent from '../assets/agenda.png';
import '../App.css';

const Sidebar = ({ userRole, onCreateEventClick }) => {
    return (
        <div className="sidebar">
            <div className="profile-section">
                <h4>Hello, Name</h4>
                {/* Add Name dynamically using backend or props */}
            </div>
            <nav>
                <ul>
                    {userRole === 'organizer' && (
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
                    {userRole === 'user' && (
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
