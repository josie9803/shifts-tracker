import React, { useState } from 'react';
import { JobEntry } from './JobTracker'; 
interface JobModalProps {
  show: boolean;
  toggle: () => void;
  addJob: (newJob: JobEntry) => void; // Use the JobEntry type here
}

const JobModal: React.FC<JobModalProps> = ({ 
  show, 
  toggle, 
  addJob}) => {

  const [jobInfo, setJobInfo] = useState<JobEntry>({
    jobName: '',
    companyName: '',
    hourlyRate: 0,
    startDate: '',
    endDate: '',
    jobLocation: '',
    //hoursPerWeek: number;
    paymentCycle: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobInfo) return;

    addJob(jobInfo);

    // Clear the form
    setJobInfo({
      jobName: '',
      companyName: '',
      hourlyRate: 0.0,
      startDate: '',
      endDate: '',
      jobLocation: '',
      //hoursPerWeek: number;
      paymentCycle: '',
      notes: '',
    })
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh]">
        <button className="text-red-500 float-right" onClick={toggle}>
          &times;
        </button>

        {/* Scrollable Form */}
        <div className="overflow-y-auto max-h-[60vh] p-2">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block mb-2">Job Name:</label>
            <input
              type="text"
              name="jobName"
              value={jobInfo.jobName}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={jobInfo.companyName}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Hourly Rate:</label>
            <input
              type="number"
              name="hourlyRate"
              value={jobInfo.hourlyRate}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={jobInfo.startDate}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Date (optional):</label>
            <input
              type="date"
              name="endDate"
              value={jobInfo.endDate}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Job Location:</label>
            <input
              type="text"
              name="jobLocation"
              value={jobInfo.jobLocation}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Payment Cycle:</label>
            <select
              value={jobInfo.paymentCycle}
              name="paymentCycle"
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
      <div className="mb-4">
        <label className="block mb-2">Notes (optional):</label>
        <textarea
          value={jobInfo.notes}
          name="notes"
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add Job
      </button>
    </form>
    </div>
    </div>
    </div>
  );
};

export default JobModal;

