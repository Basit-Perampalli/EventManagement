import { useState, useEffect, useContext } from 'react';
import EventCards from './EventCards';
import '../App.css'
import axios from 'axios';
import { EventContext } from '../context/EventContext';

const Dashboard = () => {

    const [totalEvents, setTotalEvents] = useState(0);
    const [incompleteEvents, setIncompleteEvents] = useState(0);
    const [completeEvents, setCompleteEvents] = useState(0);
    // const [eventCategories, setEventCategories] = useState(0);
    const {events} = useContext(EventContext)

    const fetchEventsAnalytics = async () => {
        try {
            
            if (events.length === 0) {
                setTotalEvents(0);
                setIncompleteEvents(0);
                setCompleteEvents(0);
                // setEventCategories(0);
            } else {
                setTotalEvents(events.length);
                const incomplete = events.filter(event => !event.isComplete);
                setIncompleteEvents(incomplete.length);
                const complete = events.filter(event => event.isComplete);
                setCompleteEvents(complete.length);
                // const categories = [...new Set(events.map(event => event.category))];
                // setEventCategories(categories.length);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setTotalEvents(0);
            setIncompleteEvents(0);
            setCompleteEvents(0);
            // setEventCategories(0);
        }
    };


    // Fetch events when the component mounts
    useEffect(() => {
        fetchEventsAnalytics();
    }, []);

    return (
        <div className="dashboard">
            <div className="stats">
                {/* <div className="stat-card" style={{ backgroundColor: '#17a2b8' }}>
                    <h3>{eventCategories}</h3>
                    <p>Event Categories</p>
                </div> */}
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
            <EventCards events={events} usertype={'regular'}/>
        </div>
    );
};

export default Dashboard;
