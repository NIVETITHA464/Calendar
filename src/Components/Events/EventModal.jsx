import React, { useState } from 'react';
import './EventModal.css';
import { useEventContext } from '../../Context/EventContext';

const EventModal = ({ onClose }) => {
  const { addEvent } = useEventContext(); // ✅ Ensure this works now

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    category: 'work',
    calendarId: '',
    date: '2025-06-25',
    time: '10:00',
    duration: 60,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) return;
    addEvent({ ...formData, id: Date.now() }); // ✅ Use addEvent from context
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">📌 Task Settings</h2>
        <div className="modal-form">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Name" />
          <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <input name="owner" value={formData.owner} onChange={handleChange} placeholder="Owner" />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="work">Work</option>
            <option value="education">Education</option>
            <option value="personal">Personal</option>
          </select>
          <input name="calendarId" value={formData.calendarId} onChange={handleChange} placeholder="Calendar ID" />
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
          <input name="time" type="time" value={formData.time} onChange={handleChange} />
          <input name="duration" type="number" value={formData.duration} onChange={handleChange} placeholder="Duration in minutes" />
          <div className="modal-actions">
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="save" onClick={handleSubmit}>Save Change</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
