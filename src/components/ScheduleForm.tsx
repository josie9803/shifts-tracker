// src/components/ScheduleForm.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

interface ScheduleEntry {
  date: string; // Change to string if you're using a string representation of the date
  startTime: string;
  endTime: string;
}

interface ScheduleFormProps {
  addSchedule: (schedules: ScheduleEntry[]) => void;
  closeModal: () => void;
  className?: string; // Accept className prop
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ addSchedule, closeModal, className }) => {
  const [schedules, setSchedules] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]); // State to hold selected dates

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      setSelectedDates([...selectedDates, date]);
      setSchedules((prev) => [...prev, { date: formattedDate, startTime: '', endTime: '' }]);
    }
  };

  const handleChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSchedule(schedules);
    setSchedules([]); // Clear schedules after submitting
    setSelectedDates([]); // Clear selected dates
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className={`mb-4 ${className}`}>
      <h3>Select Work Days:</h3>
      <DatePicker
        selected={selectedDates.length ? selectedDates[selectedDates.length - 1] : null}
        onChange={(date) => handleDateChange(date)} // Pass the date correctly
        dateFormat="yyyy/MM/dd"
        placeholderText="Select a date"
        isClearable
      />
      {schedules.map((schedule, index) => (
        <div key={index} className="flex justify-between mb-4">
          <span>{schedule.date}:</span>
          <div className="flex space-x-2">
            <input
              type="time"
              value={schedule.startTime}
              onChange={(e) => handleChange(index, 'startTime', e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="time"
              value={schedule.endTime}
              onChange={(e) => handleChange(index, 'endTime', e.target.value)}
              className="border rounded p-2"
            />
          </div>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
