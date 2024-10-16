
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import { useWebSocket } from '../test/useWebSocket';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [currRoute,setCurrRoute] = useState('home');
    const url = 'ws://localhost:8000/ws/';
    const messages = useWebSocket(url);
    
    const fetchEvents = async () => {
        setLoading(true);
        try {
            var filters = ''
            // if (currRoute==='upcomingevents'){
            //     filters+=""
            // }
            if(searchTerm){
                filters+=`&search=${searchTerm}`
            }
            if(dateFilter){
                filters+=`&date=${dateFilter}`
            }
            console.log(filters)
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:8000/search/events/?event=${currRoute}${filters}`, {
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
    // const eventurl =
        useEffect(() => {
            const date = new Date();
            console.log(date)
            console.log(searchTerm, dateFilter)
            fetchEvents();
        }, [searchTerm, dateFilter,currRoute]);

        useEffect(()=>{
            console.log(messages)
            if (messages.event_type==='delete'){
                console.log(messages.data)
                // console.log(events[11].id)
                setEvents(events.filter((e)=>e.id!==messages.data.id))
            }
            if(messages.event_type==='create'){
                setEvents([...events,messages.data])
            }
            if(messages.event_type==='update'){
                setEvents(events.map((e)=>e.id===messages.data.id?messages.data:e))
            }
        },[messages])

    const deleteEvent = async (eventId) => {
        console.log(eventId);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/event/${eventId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                // toast.info('Successfully deleted');
                // Update the events state to remove the deleted event
                // setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            } else {
                throw new Error('Failed to delete the event');
            }
        } catch (error) {
            console.log(`Failed to delete event: ${error}`);
        }
    };

    const toggleEventStatus = async (eventId) => {
        console.log(eventId)
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/event/${eventId}/toggle/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
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

    const clearFilters = () =>{
        setSearchTerm('')
        setDateFilter('')
    }

    return (
        <EventContext.Provider value={{ events, loading, deleteEvent, toggleEventStatus, setEvents, searchTerm, setSearchTerm, locationFilter, setLocationFilter, dateFilter, setDateFilter,currRoute,setCurrRoute,clearFilters }}>
            {children}
        </EventContext.Provider>
    );
};
