import React from 'react';
import './DayView.css';
import dayjs from 'dayjs';
import { useEventContext } from '../Context/EventContext';

const hours = Array.from({ length: 24 }, (_, i) => i);

const DayView = ({ dateOverride }) => {
  const { events } = useEventContext();
  const day = dateOverride ? dayjs(dateOverride) : dayjs();

  return (
    <div className="day-view">
      <div className="time-column">
        {hours.map((h) => <div key={h} className="hour-label">{String(h).padStart(2, '0')}:00</div>)}
      </div>

      <div className="day-column">
        {hours.map((h) => <div key={h} className="hour-cell"></div>)}

        {events.filter(e => dayjs(e.date).isSame(day, 'day')).map(event => {
          const start = dayjs(`${event.date}T${event.time}`);
          const height = (event.duration / 60) * 50;
          const top = start.hour() * 50 + (start.minute() / 60) * 50;
          return (
            <div
              key={event.id}
              className={`event-block ${event.category}`}
              style={{ top: `${top}px`, height: `${height}px` }}
              title={event.description}
            >
              <strong>{event.title}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
