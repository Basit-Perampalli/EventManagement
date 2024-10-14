import { useState } from 'react';
import Sidebar from './Sidebar'
import TopNavBar from './TopNavBar'
import Dashboard from './Dashboard'
import EventCreationForm from './EventForm';
function Home() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleCreateEventClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <>
            <div className="App">
                <Sidebar onCreateEventClick={handleCreateEventClick} />
                <div className="main-content">
                    <TopNavBar />
                    <Dashboard />
                    {isFormOpen && <EventCreationForm onClose={handleCloseForm} />}
                </div>
            </div>
        </>
    )
}

export default Home
