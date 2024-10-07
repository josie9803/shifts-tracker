// src/components/JobForm.tsx

import React, { useState } from 'react';

interface JobEntry {
  jobName: string;
  companyName: string;
  hourlyRate: number;
  startDate: string;
  endDate?: string;
  jobLocation: string;
  hoursPerWeek: number;
  paymentCycle: string;
  notes?: string;
}

interface JobFormProps {
  addJob: (job: JobEntry) => void;
}

const JobForm: React.FC<JobFormProps> = ({ addJob }) => {
  const [jobName, setJobName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [jobLocation, setJobLocation] = useState<string>('');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('');
  const [paymentCycle, setPaymentCycle] = useState<string>('weekly'); // Default to weekly
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobName || !companyName || !hourlyRate || !startDate || !jobLocation || !hoursPerWeek) return;

    addJob({
      jobName,
      companyName,
      hourlyRate: parseFloat(hourlyRate),
      startDate,
      endDate,
      jobLocation,
      hoursPerWeek: parseInt(hoursPerWeek, 10),
      paymentCycle,
      notes
    });

    // Clear the form
    setJobName('');
    setCompanyName('');
    setHourlyRate('');
    setStartDate('');
    setEndDate('');
    setJobLocation('');
    setHoursPerWeek('');
    setPaymentCycle('weekly');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label className="block mb-2">Job Name:</label>
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Hourly Rate:</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date (optional):</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Job Location:</label>
        <input
          type="text"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Hours per Week:</label>
        <input
          type="number"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Payment Cycle:</label>
        <select
          value={paymentCycle}
          onChange={(e) => setPaymentCycle(e.target.value)}
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
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
