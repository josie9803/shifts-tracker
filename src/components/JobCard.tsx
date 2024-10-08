// src/components/JobCard.tsx

import React from 'react';
import { JobEntry } from './JobTracker';

interface JobCardProps {
  job: JobEntry;
  index: number;
  onAddSchedule: (index: number) => void;
  onEditSchedule: (jobIndex: number, scheduleIndex: number) => void;
  onDeleteSchedule: (jobIndex: number, scheduleIndex: number) => void;
  onDeleteJob: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  index,
  onAddSchedule,
  onEditSchedule,
  onDeleteSchedule,
  onDeleteJob,
}) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{job.jobName}</h3>
      <p className="text-gray-600">Company: {job.companyName}</p>
      <p className="text-gray-600">Hourly Rate: ${job.hourlyRate.toFixed(2)}</p>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Schedules:</h4>
        {/* Display Schedules */}
        {job.schedules && job.schedules.length > 0 ? (
          job.schedules.map((schedule, scheduleIndex) => (
            <div key={scheduleIndex} className="border p-2 mb-2 rounded">
              <p>Date: {schedule.date}</p>
              <p>Start Time: {schedule.startTime}</p>
              <p>End Time: {schedule.endTime}</p>

              <div className="flex justify-between mt-2">
                <button
                  onClick={() => onEditSchedule(index, scheduleIndex)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteSchedule(index, scheduleIndex)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No schedules added yet.</p>
        )}

      <button
        onClick={() => onAddSchedule(index)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Schedule
      </button>
      </div>
      <button onClick={onDeleteJob} className="text-red-500">Delete Job</button>
    </div>
  );
};

export default JobCard;
