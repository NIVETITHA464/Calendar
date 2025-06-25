import React, { useEffect, useState } from 'react';
import './CalendarView.css';
import dayjs from 'dayjs';
import { useEventContext } from '../Context/EventContext';

const hours = Array.from({ length: 24 }, (_, i) => i);

const CalendarView = ({ selectedView }) => {
  const [days, setDays] = useState([]);
  const { events } = useEventContext();

  useEffect(() => {
    const today = dayjs();
    if (selectedView === 'Week') {
      const start = today.startOf('week');
      setDays(Array.from({ length: 7 }, (_, i) => start.add(i, 'day')));
    }
    if (selectedView === 'Day') {
      setDays([today]);
    }
  }, [selectedView]);

  const getEventPosition = (event, overlapCount, index) => {
    const start = dayjs(`${event.date}T${event.time}`);
    const top = start.hour() * 50 + (start.minute() / 60) * 50;
    const height = (event.duration / 60) * 50;
    const width = `calc(${100 / overlapCount}% - 4px)`;
    const left = `calc(${(100 / overlapCount) * index}% + 2px)`;

    return { top: `${top}px`, height: `${height}px`, width, left };
  };

  const getOverlappingGroups = (events) => {
    let groups = [];
    events.forEach((event) => {
      const start = dayjs(`${event.date}T${event.time}`);
      const end = start.add(event.duration, 'minute');
      const currentEvent = { ...event, start, end };
      let added = false;

      for (let group of groups) {
        if (group.some(e => !(e.end.isBefore(start) || e.start.isAfter(end)))) {
          group.push(currentEvent);
          added = true;
          break;
        }
      }
      if (!added) groups.push([currentEvent]);
    });
    return groups;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="time-column-header"></div>
        {days.map((d, i) => (
          <div key={i} className="day-header">{d.format('ddd DD')}</div>
        ))}
      </div>
      <div className="calendar-body">
        <div className="time-column">
          {hours.map(h => (
            <div key={h} className="time-slot">{String(h).padStart(2, '0')}:00</div>
          ))}
        </div>
        {days.map((day, i) => {
          const dayEvents = events.filter(e => dayjs(e.date).isSame(day, 'day'));
          const groups = getOverlappingGroups(dayEvents);

          return (
            <div key={i} className="day-column">
              {hours.map(h => <div key={h} className="hour-cell"></div>)}
              {groups.map((group, gIndex) =>
                group.map((event, idx) => {
                  const pos = getEventPosition(event, group.length, idx);
                  return (
                    <div
                      key={event.id}
                      className={`event-block ${event.category}`}
                      style={pos}
                      title={event.description}
                    >
                      <strong>{event.title}</strong><br />
                      {dayjs(`${event.date}T${event.time}`).format('HH:mm')} - {dayjs(`${event.date}T${event.time}`).add(event.duration, 'minute').format('HH:mm')}
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
