// src/components/MessageInput.jsx
import React, { useContext, useState, useEffect } from 'react';
import { WebSocketContext } from '../contexts/WebSocketContext';

const MessageInput = () => {
  const { sendMessage, sendTypingStatus } = useContext(WebSocketContext);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const user = 'User'; // Replace with actual user info

  useEffect(() => {
    // Emit typing status when user starts typing
    if (message) {
      if (!isTyping) {
        setIsTyping(true);
        sendTypingStatus(user, true);
      }
    } else {
      if (isTyping) {
        setIsTyping(false);
        sendTypingStatus(user, false);
      }
    }

    // Clear typing status after a short delay of inactivity
    const timeout = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        sendTypingStatus(user, false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage({ text: message, sender: user });
      setMessage('');
      setIsTyping(false);
      sendTypingStatus(user, false);
    }
  };

  return (
    <div className="flex p-4">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-lg p-2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="ml-2 bg-blue-600 text-white rounded-lg px-4"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
