import React, { useContext, useEffect } from 'react'
import { EventContext } from '../context/EventContext'
import EventCards from './EventCards'

const MyEvents = () => {
    const {events,setEvents} = useContext(EventContext)
    const fetchEvents = async()=>{
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8000/event/my/', {
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
        } 
    }
    useEffect(()=>{
        fetchEvents()
    },[])
  return (
    <div>
      <h2>My Events</h2>
      <EventCards events={events} usertype={'organizer'} />
    </div>
  )
}

export default MyEvents
