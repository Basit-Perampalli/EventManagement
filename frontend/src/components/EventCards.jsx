import { useContext, useEffect, useState } from 'react';
import './EventCards.css';
import '../App.css'
import { EventContext } from '../context/EventContext';

const EventCards = ({events,usertype}) => {
    
    // const [currentPage, setCurrentPage] = useState(1);
    // const [eventsPerPage] = useState(10);
    // const [usertype,setUsertype] = useState('regular');
    const{searchTerm, setSearchTerm,locationFilter,toggleEventStatus, setLocationFilter,dateFilter, setDateFilter,loading} = useContext(EventContext)

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

            {/* Event Cards */}
            <h3>Event List</h3>
            {!loading&&
            <div className="cards-container">
                {/* <h3>Event List</h3> */}
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div className="event-card" key={event.id}>
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
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
                                    <button className="action-btn">Edit</button>
                                    <button className="action-btn delete-btn">Delete</button>
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
        </div>
    );
};

export default EventCards;
