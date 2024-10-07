// src/components/ScheduleModal.tsx

import React from 'react';
import ScheduleForm from './ScheduleForm';

interface ScheduleModalProps {
  show: boolean;
  toggle: () => void;
  addSchedule: (schedules: { date: string; startTime: string; endTime: string }[]) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ show, toggle, addSchedule }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button className="text-red-500 float-right" onClick={toggle}>
          &times;
        </button>
        <ScheduleForm addSchedule={addSchedule} closeModal={toggle} />
      </div>
    </div>
  );
};

export default ScheduleModal;
