import React, { createContext, useContext, useEffect, useState } from 'react';
import eventsData from '../data/events.json';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar-events');
    return saved ? JSON.parse(saved) : eventsData;
  });

  // Save to localStorage when events change
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const value = {
    events,
    setEvents,
    addEvent,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEventContext = () => useContext(EventContext);
