// App.js
import React, { useState, useEffect } from 'react';
import './styles.css'; // Assuming you have some basic styles defined in styles.css

const App = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [user, setUser] = useState('User'); // Set a default user, could be changed based on authentication

    useEffect(() => {
        // Fetch messages from the API when the component mounts
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userMessage) return;

        const newMessage = {
            user: user,
            message: userMessage,
        };

        // Send the new message to the API
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });

            if (response.ok) {
                const savedMessage = await response.json();
                setMessages((prevMessages) => [...prevMessages, savedMessage]);
                setUserMessage(''); // Clear input after sending
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <h1>Chatbot Interface</h1>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg._id} className={`message ${msg.user === user ? 'sent' : 'received'}`}>
                        <strong>{msg.user}: </strong>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default App;
