
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    
    const fetchEvents = async () => {
        setLoading(true);
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
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };
    const eventurl = 
    useEffect(() => {
        console.log(searchTerm,dateFilter)
        fetchEvents(eventurl);
    }, [searchTerm,dateFilter]);

    const toggleEventStatus = async (eventId) => {
        console.log(eventId)
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/event/${eventId}/toggle/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                 },
                
            });
            if (response.ok) {
                toast.info('Successfully changed the visibility')
            }
        } catch (error) {
            console.log(`Failed to toggle event status: ${error}`);
        }
    };

    return (
        <EventContext.Provider value={{ events, loading, toggleEventStatus, setEvents,searchTerm, setSearchTerm,locationFilter, setLocationFilter,dateFilter, setDateFilter }}>
            {children}
        </EventContext.Provider>
    );
};
