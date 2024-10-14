import { useState, useEffect } from 'react';
import EventTable from './EventTable';
import axios from 'axios';

const Dashboard = () => {
    // States to store the calculated stats
    const [totalEvents, setTotalEvents] = useState(0);
    const [incompleteEvents, setIncompleteEvents] = useState(0);
    const [completeEvents, setCompleteEvents] = useState(0);
    const [eventCategories, setEventCategories] = useState(0);

    // Function to fetch data from backend
    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events'); // Adjust this API endpoint to your actual backend URL
            const events = response.data || []; // Ensure we get an array, even if the response is null or undefined

            if (events.length === 0) {
                // If there are no events, ensure all counts are 0
                setTotalEvents(0);
                setIncompleteEvents(0);
                setCompleteEvents(0);
                setEventCategories(0);
            } else {
                // Calculate total events
                setTotalEvents(events.length);

                // Calculate incomplete events
                const incomplete = events.filter(event => !event.isComplete); // Assuming `isComplete` field marks completion
                setIncompleteEvents(incomplete.length);

                // Calculate complete events
                const complete = events.filter(event => event.isComplete);
                setCompleteEvents(complete.length);

                // Calculate unique event categories
                const categories = [...new Set(events.map(event => event.category))]; // Extract unique categories
                setEventCategories(categories.length);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            // Set everything to 0 if there is an error fetching the events
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
            <EventTable />
        </div>
    );
};

export default Dashboard;
