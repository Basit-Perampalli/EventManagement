import EventImg from '../assets/event.png'
import CompleteImg from '../assets/calendar-check.png'
import Dashboard from '../assets/dashboard.png'
import PendingEvent from '../assets/agenda.png'
import '../App.css'
const Sidebar = ({ onCreateEventClick }) => {
    return (
        <div className="sidebar">
            <div className="profile-section">
                <h4>Hello, Name</h4>
                {/* Add Name using backend or props */}
            </div>
            <nav>
                <ul>
                    <li>
                        <div className='sidebar-icons'>
                            <img src={Dashboard} alt="" />
                        </div>
                        <div>Dashboard</div>
                    </li>
                    <li>
                        <div className='sidebar-icons' >
                            <img src={CompleteImg} alt="" />
                        </div>
                        <div>Completed Events</div>
                    </li>
                    <li>
                        <div className='sidebar-icons' style={{ fontWeight: '600' }}>
                            <img src={PendingEvent} alt="" />
                        </div>
                        <div>Incomplete Events</div>
                    </li>
                    <li onClick={onCreateEventClick}>
                        <div className='sidebar-icons' style={{ height: '25px', width: '25px' }}>
                            <img src={EventImg} alt="" />
                        </div>
                        <div>Create Event</div>
                    </li>
                    {/* Add other menu items */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
