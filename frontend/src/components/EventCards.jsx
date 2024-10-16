import { useContext, useEffect, useState } from 'react';
import './EventCards.css';
import '../App.css'
import { EventContext } from '../context/EventContext';

const EventCards = ({ events,usertype }) => {

    // const [currentPage, setCurrentPage] = useState(1);
    // const [eventsPerPage] = useState(10);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { searchTerm, setSearchTerm, locationFilter, deleteEvent, toggleEventStatus, setLocationFilter, dateFilter, setDateFilter, loading } = useContext(EventContext)

    const handleEditChange = (e) => {
        setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (eventId) => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch(`http://localhost:8000/event/${eventId}/update/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
                body: JSON.stringify(selectedEvent)
            });
            if (response.ok) {
                // const updatedEvent = await response.json();
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

    // useEffect(() => {
    //     const ut = localStorage.getItem('usertype');
    //     setUsertype(ut)
    // }, []);

    // const indexOfLastEvent = currentPage * eventsPerPage;
    // const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    // events = events.slice(indexOfFirstEvent, indexOfLastEvent);
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className='cards-dashboard'>

            {usertype==='regular'&&
              <>
                <div className="search-filters">
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
                <div className='innerdiv-eventcard' >
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
            </div>
            </>}

            {/* Event Cards */}
            <h3>Event List</h3>
            {!loading&&
            <div className="cards-container">
                {/* <h3>Event List</h3> */}
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div className="event-card" key={event.id}>
                            <h3 style={{marginBottom:"20px"}}>{event.title}</h3>
                            <p style={{marginBottom:"20px"}}>{event.description}</p>
                            {/* <p><strong>Location:</strong> {event.location}</p> */}
                            <p><strong>Start Date:</strong> {new Date(event.start_time).toLocaleString()}</p>
                            <p><strong>End Date:</strong> {new Date(event.end_time).toLocaleString()}</p>
                            <p><strong>Organizer:</strong> {event.organizer}</p>
                            <p><strong>Type:</strong> {event.is_public? 'Public' : 'Private'}</p>
                            {
                                usertype=='organizer'&&
                                <div className="event-actions">
                                    <button
                                        className="action-btn"
                                        style={{width:"100px"}}
                                        onClick={() => toggleEventStatus(event.id)}
                                    >
                                        {event.is_public ? 'Mark Private' : 'Mark Public'}
                                    </button>
                                    <button className="action-btn">View</button>
                                    <button className="action-btn" onClick={() => handleEditClick(event)}>Edit</button>
                                    <button className="action-btn delete-btn" onClick={() => deleteEvent(event.id)}>Delete</button>
                                </div>
                            }
                        </div>
                    ))
                ) : (
                    <div className="no-events">No events available</div>
                )}
            </div>}

            {/* Pagination */}
            {/* <div className="pagination">
                {[...Array(Math.ceil(events.length / eventsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div> */}
            {isEditPopupOpen && selectedEvent && (
                <div className="edit-popup">
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
                </div>
            )}
        </div>
    );
};

export default EventCards;