import React, { useEffect, useState } from 'react';
import './CalendarView.css';
import dayjs from 'dayjs';
import { useEventContext } from '../Context/EventContext';

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarView({ selectedView, events: propEvents }) {
  const [days, setDays] = useState([]);
  const { events: allEvents } = useEventContext();
  const events = propEvents || allEvents;

  useEffect(() => {
    const today = dayjs();
    if (selectedView === 'Week') {
      const start = today.startOf('week');
      setDays(Array.from({ length: 7 }, (_, i) => start.add(i, 'day')));
    } else if (selectedView === 'Day') {
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

  const getOverlappingGroups = (dayEvents) => {
    const groups = [];
    dayEvents.forEach((event) => {
      const start = dayjs(`${event.date}T${event.time}`);
      const end = start.add(event.duration, 'minute');
      const ext = { ...event, start, end };
      let added = false;
      for (let group of groups) {
        if (group.some(e => !(e.end.isBefore(ext.start) || e.start.isAfter(ext.end)))) {
          group.push(ext);
          added = true;
          break;
        }
      }
      if (!added) groups.push([ext]);
    });
    return groups;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="time-column-header"></div>
        {days.map((d, i) => (
          <div key={i} className="day-header">
            {d.format('ddd DD')}
          </div>
        ))}
      </div>

      <div className="calendar-body">
        <div className="time-column">
          {hours.map(h => (
            <div key={h} className="time-slot">
              {String(h).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {days.map((d, di) => {
          const dayEvents = events.filter(e => dayjs(e.date).isSame(d, 'day'));
          const groups = getOverlappingGroups(dayEvents);

          return (
            <div key={di} className="day-column">
              {hours.map(h => <div key={h} className="hour-cell"></div>)}
              {groups.map((group, gi) =>
                group.map((ev, idx) => {
                  const pos = getEventPosition(ev, group.length, idx);
                  const isConflict = group.length > 1;
                  return (
                    <div
                      key={ev.id}
                      className={`event-block ${ev.category}`}
                      style={pos}
                      title={`${ev.title}\n${dayjs(`${ev.date}T${ev.time}`).format('HH:mm')} – ${dayjs(`${ev.date}T${ev.time}`).add(ev.duration, 'minute').format('HH:mm')}`}
                    >
                      <strong>{ev.title}</strong>
                      <div className="event-time">
                        {dayjs(`${ev.date}T${ev.time}`).format('HH:mm')}–{dayjs(`${ev.date}T${ev.time}`).add(ev.duration, 'minute').format('HH:mm')}
                      </div>
                      {isConflict && <div className="conflict-badge">!</div>}
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
}
