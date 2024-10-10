// src/components/JobCard.tsx

import React from 'react';
import { JobEntry } from './JobTracker';
import dayjs from 'dayjs';

interface JobCardProps {
  job: JobEntry;
  index: number;
  onAddSchedule: (index: number) => void;
  onEditSchedule?: (jobIndex: number) => void; // Updated to edit all schedules, not individual ones
  onDeleteJob?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  index,
  onAddSchedule,
  //onEditSchedule, // Now edits all schedules
  onDeleteJob,
}) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{job.jobName}</h3>
      <p className="text-gray-600">Company: {job.companyName}</p>
      <p className="text-gray-600">Hourly Rate: ${job.hourlyRate}</p>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Schedules:</h4>
        
        {/* Display all schedules */}
        {job.schedules && job.schedules.length > 0 ? (
          <div className="border p-2 mb-2 rounded">
            {job.schedules.map((schedule, scheduleIndex) => (
              <div key={scheduleIndex} className="mb-2">
                <span className="font-bold">
                  {dayjs(schedule.date).format('ddd, MMM DD')}
                </span>
                <span className="block font-normal">
                  {dayjs(schedule.startTime).format('HH:mm')} - {dayjs(schedule.endTime).format('HH:mm')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No schedules added yet.</p>
        )}

        {/* Single Edit Schedule Button */}
        {/* <button
          onClick={() => onEditSchedule(index)} // Only pass the job index to edit all schedules
          className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
        >
          Edit Schedules
        </button> */}

        {/* Add Schedule Button */}
        <button
          onClick={() => onAddSchedule(index)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Schedule
        </button>
      </div>

      {/* Delete Job Button */}
      <button onClick={onDeleteJob} className="text-red-500 mt-4">
        Delete Job
      </button>
    </div>
  );
};

export default JobCard;
