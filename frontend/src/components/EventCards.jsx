import { useEffect, useState } from 'react';
import './EventCards.css'; 
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
    const [socket, setSocket] = useState(null);
    const [refreshEvents, setRefreshEvents] = useState(false); // New state for refreshing

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('http://localhost:8000/search/events/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the authorization token
                },
            });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setEvents(data);
                setFilteredEvents(data)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();

        // const ws = new WebSocket(WEBSOCKET_URL);
        // ws.onmessage = (event) => {
        //     const updatedEvent = JSON.parse(event.data);
        //     setEvents((prevEvents) =>
        //         prevEvents.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev)
        //     );
        // };
        // setSocket(ws);

        // return () => {
        //     if (ws) {
        //         ws.close();
        //     }
        // };
    }, []);

    const handleEventCreated = () => {
        setRefreshEvents(prev => !prev); // Toggle refresh state to fetch events again
    };

    // const filteredEvents = events.filter(event => {
    //     const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    //     const matchesLocation = locationFilter === '' || event.location.toLowerCase().includes(locationFilter.toLowerCase());
    //     const matchesDateRange = (startDateFilter === '' || new Date(event.start_date) >= new Date(startDateFilter)) &&
    //         (endDateFilter === '' || new Date(event.end_date) <= new Date(endDateFilter));
    //     return matchesSearchTerm && matchesLocation && matchesDateRange;
    // });

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
            setError(`Failed to toggle event status ${error}`);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='cards-dashboard'>
        
            <div className="search-filters">
                <div>
                    <label htmlFor="titleSearch">Search by Title</label>
                    <input
                        type="text"
                        id="titleSearch"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="locationFilter">Search by Location</label>
                    <input
                        type="text"
                        id="locationFilter"
                        className="search-input"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Date</label>
                    <input
                        type="date"
                        id="startDate"
                        className="search-input"
                        value={startDateFilter}
                        onChange={(e) => setStartDateFilter(e.target.value)}
                    />
                </div>
                {/* <div>
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        className="search-input"
                        value={endDateFilter}
                        onChange={(e) => setEndDateFilter(e.target.value)}
                    />
                </div> */}
            </div>

            {/* Event Cards */}
            <div className="cards-container">
                <h3>Event List</h3>
                {currentEvents.length > 0 ? (
                    currentEvents.map((event, index) => (
                        <div className="event-card" key={event.id}>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                            {/* <p><strong>Location:</strong> {event.location}</p> */}
                            <p><strong>Start Date:</strong> {new Date(event.start_date).toLocaleString()}</p>
                            <p><strong>End Date:</strong> {new Date(event.end_date).toLocaleString()}</p>
                            <p><strong>Organizer:</strong> {event.organizer}</p>
                            <p><strong>Status:</strong> {event.status}</p>
                            <div className="event-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => toggleEventStatus(event.id, event.status)}
                                >
                                    {event.status === 'public' ? 'Mark Private' : 'Mark Public'}
                                </button>
                                <button className="action-btn">View</button>
                                <button className="action-btn">Edit</button>
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
        </div>
    );
};

export default EventCards;
