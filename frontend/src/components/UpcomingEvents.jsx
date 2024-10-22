import React, { useContext, useEffect, useState } from 'react';
import EventCards from './EventCards';
import { EventContext } from '../context/EventContext';

const UpcomingEvents = () => {
  const { events, setCurrRoute } = useContext(EventContext)
  useEffect(() => {
    setCurrRoute('upcoming')
  }, [])
  return (
    <div>
      <h2>Upcoming Events</h2>
      <EventCards events={events} usertype={'regular'} />
    </div>
  );
};

export default UpcomingEvents;
