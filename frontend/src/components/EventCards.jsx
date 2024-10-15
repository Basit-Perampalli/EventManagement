import { useEffect, useState } from 'react';
import './EventCards.css';
import '../App.css';

const WEBSOCKET_URL = 'ws://your-django-backend-url/ws/events/';

const EventCards = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('http://localhost:8000/search/events/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data);
                setFilteredEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Filter Events based on search, location, and date
    useEffect(() => {
        const filtered = events.filter(event => {
            const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = locationFilter === '' || event.location.toLowerCase().includes(locationFilter.toLowerCase());
            const matchesDateRange = (startDateFilter === '' || new Date(event.start_date) >= new Date(startDateFilter)) &&
                (endDateFilter === '' || new Date(event.end_date) <= new Date(endDateFilter));
            return matchesSearchTerm && matchesLocation && matchesDateRange;
        });
        setFilteredEvents(filtered);
    }, [events, searchTerm, locationFilter, startDateFilter, endDateFilter]);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toggleEventStatus = async (eventId, currentStatus) => {
        try {
            const response = await fetch(`http://localhost:8000/event/${eventId}/toggle/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: currentStatus === 'public' ? 'private' : 'public' })
            });
            if (response.ok) {
                const updatedEvent = await response.json();
                setEvents((prevEvents) =>
                    prevEvents.map(event => (event.id === eventId ? updatedEvent : event))
                );
            }
        } catch (error) {
            setError(`Failed to toggle event status: ${error.message}`);
        }
    };

    const handleEditChange = (e) => {
        setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:8000/event/${eventId}/edit/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedEvent)
            });
            if (response.ok) {
                const updatedEvent = await response.json();
                setEvents(prevEvents => prevEvents.map(event => (event.id === eventId ? updatedEvent : event)));
                closeEditPopup();
            }
        } catch (error) {
            setError(`Failed to edit event: ${error.message}`);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='cards-dashboard'>
            <div className="search-filters">
                {/* Search filters for title, location, and date */}
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
                    <label htmlFor="startDate" className='label-eventcard'>Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        className="search-input"
                        value={startDateFilter}
                        onChange={(e) => setStartDateFilter(e.target.value)}
                    />
                </div>
                <div className='innerdiv-eventcard'>
                    <label htmlFor="endDate" className='label-eventcard'>End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        className="search-input"
                        value={endDateFilter}
                        onChange={(e) => setEndDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Event Cards */}
            <h3>Event List</h3>
            <div className="cards-container">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <div className="event-card" key={event.id}>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                            <p><strong>Start Date:</strong> {new Date(event.start_date).toLocaleString()}</p>
                            <p><strong>End Date:</strong> {new Date(event.end_date).toLocaleString()}</p>
                            <p><strong>Organizer:</strong> {event.organizer}</p>
                            <p><strong>Status:</strong> {event.is_public ? 'Public' : 'Private'}</p>
                            <div className="event-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => toggleEventStatus(event.id, event.is_public)}
                                >
                                    {event.is_public ? 'Mark Private' : 'Mark Public'}
                                </button>
                                <button className="action-btn" onClick={() => handleEditClick(event)}>Edit</button>
                                <button className="action-btn delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-events">No events available</div>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {[...Array(Math.ceil(filteredEvents.length / eventsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>

            {/* Edit Event Popup */}
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
