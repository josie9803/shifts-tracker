// src/components/JobTracker.tsx

import React, { useState } from 'react';
import JobCard from './JobCard';
import JobModal from './JobModal';
import ScheduleModal from './ScheduleModal';
import EditScheduleModal from './EditScheduleModal'; // Import the EditScheduleModal

export interface JobEntry {
  jobName: string;
  companyName: string;
  hourlyRate: number;
  schedules?: { date: string; startTime: string; endTime: string }[];
}

const JobTracker: React.FC = () => {
  const [jobs, setJobs] = useState<JobEntry[]>([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
  const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null);
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<number | null>(null); // New state for selected schedule

  const addJob = (newJob: JobEntry) => {
    setJobs([...jobs, newJob]);
    setShowJobModal(false);
  };

  const addSchedule = (schedules: { date: string; startTime: string; endTime: string }[]) => {
    if (selectedJobIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[selectedJobIndex] = {
        ...updatedJobs[selectedJobIndex],
        schedules: [...(updatedJobs[selectedJobIndex].schedules || []), ...schedules],
      };
      setJobs(updatedJobs);
    }
    setShowScheduleModal(false);
  };

  const editSchedule = (jobIndex: number, scheduleIndex: number) => {
    setSelectedJobIndex(jobIndex);
    setSelectedScheduleIndex(scheduleIndex);
    setShowEditModal(true);
  };

  const handleEditScheduleSave = (updatedSchedule: { date: string; startTime: string; endTime: string }) => {
    if (selectedJobIndex !== null && selectedScheduleIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[selectedJobIndex].schedules![selectedScheduleIndex] = updatedSchedule; // Update the schedule
      setJobs(updatedJobs);
    }
    setShowEditModal(false); // Close edit modal
  };

  const deleteSchedule = (jobIndex: number, scheduleIndex: number) => {
    if (jobIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[jobIndex] = {
        ...updatedJobs[jobIndex],
        schedules: updatedJobs[jobIndex].schedules!.filter((_, index) => index !== scheduleIndex),
      };
      setJobs(updatedJobs);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">Job Tracker</h1>

      <button
        onClick={() => setShowJobModal(true)}
        className="bg-blue-500 text-white p-2 rounded mb-4 mt-4"
      >
        Add Job
      </button>

      {/* Modal for Job Form */}
      <JobModal show={showJobModal} toggle={() => setShowJobModal(false)} addJob={addJob} />

      {/* Display list of current jobs */}
      <h2 className="text-xl mt-6">Current Jobs:</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            index={index}
            onAddSchedule={(i) => {
              setSelectedJobIndex(i);
              setShowScheduleModal(true);
            }}
            onEditSchedule={editSchedule}
            onDeleteSchedule={deleteSchedule}
          />
        ))}
      </div>

      {/* Modal for Schedule Form */}
      <ScheduleModal show={showScheduleModal} toggle={() => setShowScheduleModal(false)} addSchedule={addSchedule} />

      {/* Modal for Edit Schedule */}
      {selectedJobIndex !== null && selectedScheduleIndex !== null && (
        <EditScheduleModal
          show={showEditModal}
          toggle={() => setShowEditModal(false)}
          schedule={jobs[selectedJobIndex].schedules![selectedScheduleIndex]}
          onSave={handleEditScheduleSave}
        />
      )}
    </div>
  );
};

export default JobTracker;
