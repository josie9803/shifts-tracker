// src/components/ScheduleModal.tsx
//import ScheduleForm from './ScheduleForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers'; // Ensure correct imports
import { Button, TextField, Typography, Box } from '@mui/material';
interface ScheduleModalProps {
  show: boolean;
  toggle: () => void;
  addSchedule: (schedules: { date: string; startTime: string; endTime: string }[]) => void;
}
interface ScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ show, toggle, addSchedule }) => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setSelectedDate(date);
      setSchedules((prev) => [...prev, { date: formattedDate, startTime: '', endTime: '' }]);
    }
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string | null) => {
    const newSchedules = [...schedules];
    if (value !== null) {
      newSchedules[index][field] = value; // Only update if value is not null
    }
    
    setSchedules(newSchedules);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSchedule(schedules);
    setSchedules([]);
    setSelectedDate(null);
    //closeModal();
  };
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs }> 
        <Box className={`p-4`}>
      <Typography variant="h6" gutterBottom>
        Add Schedule
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
        <DatePicker
        label="Select Work Day"
        value={selectedDate} // Controlled value
        onChange={(newValue) => {
          setSelectedDate(newValue); // Update the state
          handleDateChange(newValue); // Call the date change handler
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
        </Box>

        {schedules.map((schedule, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1">{schedule.date}:</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TimePicker
                label="Start Time"
                value={schedule.startTime || null} // Ensure a string is passed
                onChange={(value) => handleTimeChange(index, 'startTime', value?.toString() || '')}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="End Time"
                value={schedule.endTime || null} // Ensure a string is passed
                onChange={(value) => handleTimeChange(index, 'endTime', value?.toString() || '')}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="secondary" onClick={toggle} style={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Add Schedule
          </Button>
        </Box>
      </form>
    </Box>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default ScheduleModal;
