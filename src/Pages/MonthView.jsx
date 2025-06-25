import React from 'react';
import './MonthView.css';
import dayjs from 'dayjs';
import { useEventContext } from '../Context/EventContext';

const MonthView = () => {
  const { events } = useEventContext();
  const today = dayjs();
  const currentMonth = today.month();
  const currentYear = today.year();

  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();
  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

  const days = [];

  for (let i = 0; i < totalCells; i++) {
    const day = dayjs(new Date(currentYear, currentMonth, i - startDay + 1));
    const isToday = day.isSame(today, 'day');
    const isCurrentMonth = day.month() === currentMonth;

    const dayEvents = events.filter(e => dayjs(e.date).isSame(day, 'day'));

    days.push(
      <div
        key={i}
        className={`month-cell ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}`}
      >
        <div className="date">{day.date()}</div>
        <div className="events">
          {dayEvents.map((event, idx) => (
            <div key={idx} className={`event ${event.category}`}>
              {event.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="month-view">
      <div className="month-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>
      <div className="month-grid">{days}</div>
    </div>
  );
};

export default MonthView;
