// src/components/JobTracker.tsx

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobModal from './JobModal';
import ScheduleModal from './ScheduleModal';
import EditScheduleModal from './EditScheduleModal'; // Import the EditScheduleModal

export interface JobEntry {
  jobName: string;
  companyName: string;
  hourlyRate: number;
  startDate: string;
  endDate?: string; // Add endDate here
  jobLocation: string;
  hoursPerWeek: number;
  paymentCycle: string;
  notes?: string;
  schedules?: { date: string; startTime: string; endTime: string }[];
}

const JobTracker: React.FC = () => {
  const [jobs, setJobs] = useState<JobEntry[]>([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false); // Add state for Edit Modal
  const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null);
  const [editedSchedule, setEditedSchedule] = useState<{ date: string; startTime: string; endTime: string } | null>(null);

  // Load jobs once when the component mounts
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  // Function to add job and update local storage
  const addJob = (newJob: JobEntry) => {
  const updatedJobs = [...jobs, newJob];
  setJobs(updatedJobs);
  localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Save updated jobs
  };

  // Function to delete a job and update local storage
  const deleteJob = (index: number) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs)); // Save updated jobs
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
    const scheduleToEdit = jobs[jobIndex].schedules?.[scheduleIndex];
    if (scheduleToEdit) {
      setEditedSchedule(scheduleToEdit); // Set the schedule to be edited
      setSelectedJobIndex(jobIndex); // Set the job index
      setShowEditScheduleModal(true); // Show the edit modal
    }
  };

  const saveEditedSchedule = (date: string, startTime: string, endTime: string) => {
    if (selectedJobIndex !== null && editedSchedule) {
      const updatedJobs = [...jobs];
      updatedJobs[selectedJobIndex] = {
        ...updatedJobs[selectedJobIndex],
        schedules: updatedJobs[selectedJobIndex].schedules?.map((schedule) =>
          schedule === editedSchedule ? { date, startTime, endTime } : schedule
        ),
      };
      setJobs(updatedJobs);
    }
    setShowEditScheduleModal(false);
    setEditedSchedule(null); // Clear edited schedule
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
            onDeleteJob={() => deleteJob(index)} 
          />
        ))}
      </div>

      {/* Modal for Schedule Form */}
      <ScheduleModal show={showScheduleModal} toggle={() => setShowScheduleModal(false)} addSchedule={addSchedule} />

      {/* Modal for Editing Schedule */}
      <EditScheduleModal
        show={showEditScheduleModal}
        toggle={() => setShowEditScheduleModal(false)}
        editedSchedule={editedSchedule}
        saveEditedSchedule={saveEditedSchedule}
      />
    </div>
  );
};

export default JobTracker;
