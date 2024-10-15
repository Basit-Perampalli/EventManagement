import { useEffect, useState } from 'react';

export const useWebSocket = (url) => {
    // const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Create WebSocket connection.
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        // Listen for messages
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // setMessages((prevMessages) => [...prevMessages, message]);
            setMessages(message);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, [url]);

    return messages;
};
