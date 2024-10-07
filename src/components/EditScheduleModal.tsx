// src/components/EditScheduleModal.tsx

import React, { useState } from 'react';

interface EditScheduleModalProps {
  show: boolean;
  toggle: () => void;
  schedule: { date: string; startTime: string; endTime: string };
  onSave: (updatedSchedule: { date: string; startTime: string; endTime: string }) => void;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({ show, toggle, schedule, onSave }) => {
  const [date, setDate] = useState(schedule.date);
  const [startTime, setStartTime] = useState(schedule.startTime);
  const [endTime, setEndTime] = useState(schedule.endTime);

  const handleSave = () => {
    onSave({ date, startTime, endTime });
    toggle(); // Close the modal
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button className="text-red-500 float-right" onClick={toggle}>
          &times;
        </button>

        <h2 className="text-xl mb-4">Edit Schedule</h2>
        <label>
          Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-1 w-full"
          />
        </label>
        <label className="mt-2">
          Start Time:
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded p-1 w-full"
          />
        </label>
        <label className="mt-2">
          End Time:
          <input
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded p-1 w-full"
          />
        </label>

        <button onClick={handleSave} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditScheduleModal;
