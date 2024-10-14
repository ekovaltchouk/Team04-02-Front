import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to track widget visibility

  const conversationRef = useRef(null); // Create a reference for the chat area

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput(''); // Clear input box

    // Simulate a bot response (AI logic can go here)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'This is an automated response.' }
      ]);
    }, 1000);
  };

  // Scroll to the bottom whenever the messages array is updated
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <button className="chat-button" onClick={toggleChatbot}></button>

      {/* Chatbot Widget */}
      <div className={`chatbot-widget card ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="card-header text-center">
          <h5>AI Chatbot</h5>
        </div>

        {/* Chat Conversation Area */}
        <div className="card-body chatbot-conversation" ref={conversationRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className={`bubble ${message.sender}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="card-footer d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
