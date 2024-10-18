import { useContext, useEffect, useState } from 'react';
import './EventCards.css';
import '../App.css'
import { EventContext } from '../context/EventContext';
import { motion } from 'framer-motion'; // Framer Motion for animations

const EventCards = ({ events, usertype }) => {

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { searchTerm, setSearchTerm, locationFilter, deleteEvent, toggleEventStatus, setLocationFilter, dateFilter, setDateFilter, loading } = useContext(EventContext);

    const handleEditChange = (e) => {
        setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (eventId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:8000/event/${eventId}/update/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(selectedEvent)
            });
            if (response.ok) {
                closeEditPopup();
            }
        } catch (error) {
            console.log(`Failed to edit event: ${error.message}`);
        }
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedEvent(null);
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setIsEditPopupOpen(true);
    };

    return (
        <div className='cards-dashboard'>
            {usertype === 'regular' && (
                <motion.div 
                    className="search-filters"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='innerdiv-eventcard'>
                        <label htmlFor="titleSearch" className='label-eventcard'>Search by Title</label>
                        <input
                            type="text"
                            id="titleSearch"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='innerdiv-eventcard'>
                        <label htmlFor="locationFilter" className='label-eventcard'>Search by Location</label>
                        <input
                            type="text"
                            id="locationFilter"
                            className="search-input"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        />
                    </div>
                    <div className='innerdiv-eventcard'>
                        <label htmlFor="date" className='label-eventcard'>Filter by Date</label>
                        <input
                            type="date"
                            id="date"
                            className="search-input"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </motion.div>
            )}

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <motion.div 
                    className="cards-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {events.length > 0 ? (
                        events.map((event) => (
                            <motion.div 
                                className="event-card" 
                                key={event.id}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p><strong>Start Date:</strong> {new Date(event.start_time).toLocaleString()}</p>
                                <p><strong>End Date:</strong> {new Date(event.end_time).toLocaleString()}</p>
                                <p><strong>Type:</strong> {event.is_public ? 'Public' : 'Private'}</p>
                                {usertype === 'organizer' && (
                                    <div className="event-actions">
                                        <button className="action-btn" onClick={() => toggleEventStatus(event.id)}>
                                            {event.is_public ? 'Mark Private' : 'Mark Public'}
                                        </button>
                                        <button className="action-btn">View</button>
                                        <button className="action-btn" onClick={() => handleEditClick(event)}>Edit</button>
                                        <button className="action-btn delete-btn" onClick={() => deleteEvent(event.id)}>Delete</button>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="no-events">No events available</div>
                    )}
                </motion.div>
            )}

            {isEditPopupOpen && selectedEvent && (
                <motion.div 
                    className="edit-popup"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="edit-popup-content">
                        <h3>Edit Event</h3>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={selectedEvent.title}
                            onChange={handleEditChange}
                        />
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={selectedEvent.description}
                            onChange={handleEditChange}
                        />
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={selectedEvent.location}
                            onChange={handleEditChange}
                        />
                        <button onClick={() => handleEditSubmit(selectedEvent.id)}>Save</button>
                        <button onClick={closeEditPopup}>Cancel</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default EventCards;
