// src/components/EditScheduleModal.tsx

import React, { useState, useEffect } from 'react';

interface EditScheduleModalProps {
  show: boolean;
  toggle: () => void;
  saveEditedSchedule: (date: string, startTime: string, endTime: string) => void;
  editedSchedule: { date: string; startTime: string; endTime: string } | null;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
  show,
  toggle,
  saveEditedSchedule,
  editedSchedule,
}) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (editedSchedule) {
      setDate(editedSchedule.date);
      setStartTime(editedSchedule.startTime);
      setEndTime(editedSchedule.endTime);
    }
  }, [editedSchedule]);

  const handleSave = () => {
    saveEditedSchedule(date, startTime, endTime);
    toggle(); // Close the modal after saving
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Schedule</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={toggle}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditScheduleModal;

// import React, { useState, useEffect } from 'react';

// interface EditScheduleModalProps {
//   show: boolean;
//   toggle: () => void;
//   saveEditedSchedule: (selectedDate: string, startTime: string, endTime: string) => void;
//   editedSchedule: { date: string; startTime: string; endTime: string } | null;
//   existingSchedules: { date: string; startTime: string; endTime: string }[]; // Pass existing schedules
// }

// const EditScheduleModal: React.FC<EditScheduleModalProps> = ({
//   show,
//   toggle,
//   saveEditedSchedule,
//   editedSchedule,
//   existingSchedules, // Get the existing schedules
// }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');

//   useEffect(() => {
//     if (editedSchedule) {
//       setSelectedDate(editedSchedule.date);
//       setStartTime(editedSchedule.startTime);
//       setEndTime(editedSchedule.endTime);
//     }
//   }, [editedSchedule]);

//   const handleSave = () => {
//     saveEditedSchedule(selectedDate, startTime, endTime); // Pass the selected date
//     toggle(); // Close the modal after saving
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
//         <h2 className="text-xl font-semibold mb-4">Edit Schedule</h2>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2">Select Date to Edit:</label>
//           <select
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               const selectedSchedule = existingSchedules.find(
//                 (schedule) => schedule.date === e.target.value
//               );
//               if (selectedSchedule) {
//                 setStartTime(selectedSchedule.startTime);
//                 setEndTime(selectedSchedule.endTime);
//               }
//             }}
//             className="w-full border border-gray-300 rounded p-2"
//           >
//             {existingSchedules.map((schedule, index) => (
//               <option key={index} value={schedule.date}>
//                 {schedule.date}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2">Start Time:</label>
//           <input
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2">End Time:</label>
//           <input
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full border border-gray-300 rounded p-2"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             onClick={toggle}
//             className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditScheduleModal;
