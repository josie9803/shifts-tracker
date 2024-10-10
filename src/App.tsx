import React from 'react';
import JobTracker from './components/JobTracker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <JobTracker />
    </LocalizationProvider>
  );
};

export default App;
