// src/components/JobModal.tsx

import React from 'react';
import JobForm from './JobForm';
import { JobEntry } from './JobTracker'; // Import JobEntry interface

interface JobModalProps {
  show: boolean;
  toggle: () => void;
  addJob: (newJob: JobEntry) => void; // Use the JobEntry type here
}

const JobModal: React.FC<JobModalProps> = ({ show, toggle, addJob }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh]">
        <button className="text-red-500 float-right" onClick={toggle}>
          &times;
        </button>

        {/* Scrollable Form */}
        <div className="overflow-y-auto max-h-[60vh] p-2">
          <JobForm addJob={addJob} />
        </div>
      </div>
    </div>
  );
};

export default JobModal;
