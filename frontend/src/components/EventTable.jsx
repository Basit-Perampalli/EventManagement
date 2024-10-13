import React, { useEffect, useState } from 'react';
import './EventTable.css'
const WEBSOCKET_URL = 'ws://your-django-backend-url/ws/events/';

const EventTable = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/event/all/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();

        const ws = new WebSocket(WEBSOCKET_URL);
        ws.onmessage = (event) => {
            const updatedEvent = JSON.parse(event.data);
            setEvents((prevEvents) =>
                prevEvents.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev)
            );
        };
        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toggleEventStatus = async (eventId, currentStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/events/${eventId}/toggle/`, {
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
        <div className='table-dashboard'>
            <input
                type="text"
                className="search-input"
                placeholder="Search events"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="table-container">
                <table className="table">
                    <thead className='thead-eventfrom'>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Organizer</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.length > 0 ? (
                            currentEvents.map((event, index) => (
                                <tr key={event.id}>
                                    <td>{indexOfFirstEvent + index + 1}</td>
                                    <td>{event.title}</td>
                                    <td>{event.description}</td>
                                    <td>{event.location}</td>
                                    <td>{new Date(event.start_date).toLocaleString()}</td>
                                    <td>{new Date(event.end_date).toLocaleString()}</td>
                                    <td>{event.organizer}</td>
                                    <td>{event.status}</td>
                                    <td>
                                        <button
                                            className="action-btn"
                                            onClick={() => toggleEventStatus(event.id, event.status)}
                                        >
                                            {event.status === 'public' ? 'Mark Private' : 'Mark Public'}
                                        </button>
                                        <button className="action-btn">View</button>
                                        <button className="action-btn">Edit</button>
                                        <button className="action-btn delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="no-events">No events available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

export default EventTable;
