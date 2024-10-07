// src/components/JobCard.tsx

import React from 'react';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface JobCardProps {
  job: {
    jobName: string;
    companyName: string;
    hourlyRate: number;
    schedules?: Schedule[];
  };
  index: number;
  onAddSchedule: (index: number) => void;
  onEditSchedule: (jobIndex: number, scheduleIndex: number) => void;
  onDeleteSchedule: (jobIndex: number, scheduleIndex: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, onAddSchedule, onEditSchedule, onDeleteSchedule }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{job.jobName}</h3>
      <p className="text-gray-600">Company: {job.companyName}</p>
      <p className="text-gray-500">Hourly Rate: ${job.hourlyRate}/hour</p>
      <button
        className="mt-2 bg-blue-500 text-white rounded p-2"
        onClick={() => onAddSchedule(index)} 
      >
        Add Schedule for This Week
      </button>

      {/* Display Schedules */}
      {job.schedules && job.schedules.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">Schedules:</h4>
          <ul className="list-disc list-inside">
            {job.schedules.map((schedule, scheduleIndex) => (
              <li key={scheduleIndex} className="flex justify-between">
                <span>
                  {schedule.date} ({new Date(schedule.date).toLocaleString('default', { weekday: 'long', month: 'short', day: 'numeric' })}): {schedule.startTime} - {schedule.endTime}
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => onEditSchedule(index, scheduleIndex)} className="text-blue-500">Edit</button>
                  <button onClick={() => onDeleteSchedule(index, scheduleIndex)} className="text-red-500">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobCard;
