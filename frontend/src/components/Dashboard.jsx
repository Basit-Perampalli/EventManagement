import { useState, useEffect } from 'react';
import EventCards from './EventCards';
import axios from 'axios';

const Dashboard = () => {
    
    const [totalEvents, setTotalEvents] = useState(0);
    const [incompleteEvents, setIncompleteEvents] = useState(0);
    const [completeEvents, setCompleteEvents] = useState(0);
    const [eventCategories, setEventCategories] = useState(0);

    
    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events'); 
            const events = response.data || []; 

            if (events.length === 0) {
            
                setTotalEvents(0);
                setIncompleteEvents(0);
                setCompleteEvents(0);
                setEventCategories(0);
            } else {
                
                setTotalEvents(events.length);

                
                const incomplete = events.filter(event => !event.isComplete); // Assuming `isComplete` field marks completion
                setIncompleteEvents(incomplete.length);

        
                const complete = events.filter(event => event.isComplete);
                setCompleteEvents(complete.length);

                
                const categories = [...new Set(events.map(event => event.category))]; // Extract unique categories
                setEventCategories(categories.length);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            
            setTotalEvents(0);
            setIncompleteEvents(0);
            setCompleteEvents(0);
            setEventCategories(0);
        }
    };

    // Fetch events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="dashboard">
            <div className="stats">
                <div className="stat-card" style={{ backgroundColor: '#17a2b8' }}>
                    <h3>{eventCategories}</h3>
                    <p>Event Categories</p>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#28a745' }}>
                    <h3>{totalEvents}</h3>
                    <p>Total Events</p>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ffc107' }}>
                    <h3>{incompleteEvents}</h3>
                    <p>Incomplete Events</p>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ce3844' }}>
                    <h3>{completeEvents}</h3>
                    <p>Complete Events</p>
                </div>
            </div>
            <EventCards/>
        </div>
    );
};

export default Dashboard;
