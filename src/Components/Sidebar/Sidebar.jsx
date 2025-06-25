import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import './Sidebar.css';
import EventModal from '../Events/EventModal'; // ✅ Correct import

const Sidebar = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [showModal, setShowModal] = useState(false); // ✅ Control modal

  const today = new Date(2025, 5, 25); // June 25, 2025
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day prev-month">
          {prevMonthDays - i}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday =
        cellDate.getFullYear() === today.getFullYear() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getDate() === today.getDate();

      const isTomorrow =
        cellDate.getFullYear() === tomorrow.getFullYear() &&
        cellDate.getMonth() === tomorrow.getMonth() &&
        cellDate.getDate() === tomorrow.getDate();

      days.push(
        <div
          key={day}
          className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${isToday ? 'today' : ''} ${isTomorrow ? 'tomorrow' : ''}`}
          onClick={() => setSelectedDate(day)}
        >
          {day}
        </div>
      );
    }

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(<div key={`next-${day}`} className="calendar-day next-month">{day}</div>);
    }

    return days;
  };

  const categories = [
    { name: 'Work', color: '#3B82F6' },
    { name: 'Education', color: '#F59E0B' },
    { name: 'Personal', color: '#EF4444' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Mini Calendar */}
        <div className="calendar-widget">
          <div className="calendar-header">
            <button onClick={() => navigateMonth(-1)}>
              <ChevronLeft size={16} />
            </button>
            <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
            <button onClick={() => navigateMonth(1)}>
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="calendar-grid">{renderCalendar()}</div>
        </div>

        {/* Schedule Header */}
        <div className="sidebar-section">
          <div className="section-header">
            <span>Schedule</span>
            <Plus size={16} className="add-btn" onClick={() => setShowModal(true)} />
          </div>
        </div>

        {/* My Calendars */}
        <div className="sidebar-section">
          <div className="section-header clickable" onClick={() => setMyCalendarsOpen(!myCalendarsOpen)}>
            <span>My Calendars</span>
            {myCalendarsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {myCalendarsOpen && (
            <div className="calendar-list">
              <div className="calendar-item">
                <span className="calendar-emoji">🤗</span>
                <span className="calendar-name">Esther Howard</span>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="sidebar-section">
          <div className="section-header clickable" onClick={() => setCategoriesOpen(!categoriesOpen)}>
            <span>Categories</span>
            {categoriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {categoriesOpen && (
            <div className="categories-list">
              {categories.map((category) => (
                <div key={category.name} className="category-item">
                  <div className="category-dot" style={{ backgroundColor: category.color }}></div>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Show Modal Overlay */}
      {showModal && <EventModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Sidebar;
