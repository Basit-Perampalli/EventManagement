import React, { useState } from 'react';
import '../App.css'
const EventCreationForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [organizer, setOrganizer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, description, location, startDate, endDate, organizer };

        try {
            const response = await fetch('http://your-django-backend-url/api/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            onClose(); // Close the form on success
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required placeholder='Start Data' />
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required placeholder='End Data' />
                    <input type="text" placeholder="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
                    <div className='eventformbutton'>
                        <button type="submit" className='createbtn'>Create Event</button>
                        <button type="button" onClick={onClose} className='createbtn' style={{ marginLeft: '20px' }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventCreationForm;
