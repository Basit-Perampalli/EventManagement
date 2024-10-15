
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const WEBSOCKET_URL = 'ws://your-django-backend-url/ws/events/';
    const { user } = useContext(UserContext);
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
            setError(`Failed to toggle event status: ${error}`);
        }
    };

    return (
        <EventContext.Provider value={{ events, loading, error, toggleEventStatus, setEvents }}>
            {children}
        </EventContext.Provider>
    );
};
