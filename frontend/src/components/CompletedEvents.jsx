// src/components/CompletedEvents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/event/completed/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching completed events:', error);
      }
    };

    fetchCompletedEvents();
  }, []);

  return (
    <div>
      <h2>Completed Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title} - {event.end_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedEvents;
