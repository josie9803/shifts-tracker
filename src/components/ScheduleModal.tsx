// src/components/ScheduleModal.tsx

import React, { useState, useEffect } from 'react';

// Make sure the interface expects the right props
interface ScheduleModalProps {
  show: boolean;
  toggle: () => void;
  addSchedule: (schedules: { date: string; startTime: string; endTime: string }[]) => void;
  editedSchedule?: { date: string; startTime: string; endTime: string } | null; // Added optional
  saveEditedSchedule?: (date: string, startTime: string, endTime: string) => void; // Added optional
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  show,
  toggle,
  addSchedule,
  editedSchedule,
  saveEditedSchedule,
}) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // If there's an edited schedule, populate the form fields with its data
  useEffect(() => {
    if (editedSchedule) {
      setDate(editedSchedule.date);
      setStartTime(editedSchedule.startTime);
      setEndTime(editedSchedule.endTime);
    }
  }, [editedSchedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedSchedule && saveEditedSchedule) {
      saveEditedSchedule(date, startTime, endTime); // Save the edited schedule
    } else {
      addSchedule([{ date, startTime, endTime }]); // Add a new schedule
    }
    toggle(); // Close the modal after submission
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button className="text-red-500 float-right" onClick={toggle}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editedSchedule ? 'Save Changes' : 'Add Schedule'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
