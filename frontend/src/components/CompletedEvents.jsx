import React, { useContext, useEffect, useState } from 'react';
import EventCards from './EventCards';
import { EventContext } from '../context/EventContext';

const CompletedEvents = () => {
  const {events,setCurrRoute} = useContext(EventContext)
  useEffect(()=>{
    setCurrRoute('completed')
  },[])
  return (
    <div>
      <h2>Completed Events</h2>
      <EventCards events={events} usertype={'regular'} />
    </div>
  );
};

export default CompletedEvents;
