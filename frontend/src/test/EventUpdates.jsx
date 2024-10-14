import React, { useEffect,useState } from 'react';
import { useWebSocket } from './useWebSocket';

const EventUpdates = () => {
    // Assuming the WebSocket server is running on ws://localhost:8000/ws/events/
    const url = 'ws://localhost:8000/ws/';
    const messages = useWebSocket(url);

    useEffect(() => {
        
        if (messages.length > 0) {
            console.log('New message received:', messages[messages.length - 1]);
        }
    }, [messages]);

    return (
        <div>
            <h2>Live Event Updates</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.event_type === 'delete' ? (
                            <>Event with ID {message.data.id} has been deleted.</>
                        ) : (
                            <>
                                <strong>{message.data.title}</strong> ({message.event_type})
                                <p>{message.data.description}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventUpdates;
