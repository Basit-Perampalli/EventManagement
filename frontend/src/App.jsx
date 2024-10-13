import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import EventCreationForm from './components/EventForm';
import Dashboard from './components/Dashboard'
import './App.css'; // Include styles

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateEventClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      <Sidebar onCreateEventClick={handleCreateEventClick} />
      <div className="main-content">
        <TopNavBar />
        <Dashboard />
        {isFormOpen && <EventCreationForm onClose={handleCloseForm} />}
      </div>
    </div>
  );
};

export default App;
