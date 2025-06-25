import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import CalendarView from './Pages/CalendarView';
import MonthView from './Pages/MonthView';
import DayView from './Pages/DayView';
import { EventProvider, useEventContext } from './Context/EventContext';

const MainApp = () => {
  const [selectedView, setSelectedView] = React.useState('Week');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [visibleCalendars, setVisibleCalendars] = React.useState({
    work: true,
    education: true,
    personal: true,
  });

  const { events } = useEventContext();

  const filteredEvents = events.filter((event) => visibleCalendars[event.category]);

  return (
    <div className="app-container">
      <Navbar selectedView={selectedView} onViewChange={setSelectedView} />
      <div className="main-content">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          visibleCalendars={visibleCalendars}
          toggleCategory={(key) =>
            setVisibleCalendars((prev) => ({
              ...prev,
              [key]: !prev[key],
            }))
          }
        />
        {selectedView === 'Week' && <CalendarView selectedView="Week" events={filteredEvents} />}
        {selectedView === 'Month' && <MonthView events={filteredEvents} />}
        {selectedView === 'Day' && <DayView events={filteredEvents} />}
      </div>
    </div>
  );
};

const App = () => (
  <EventProvider>
    <MainApp />
  </EventProvider>
);

export default App;
