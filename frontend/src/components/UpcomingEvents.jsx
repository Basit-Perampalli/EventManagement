
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/event/upcoming/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title} - {event.start_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
