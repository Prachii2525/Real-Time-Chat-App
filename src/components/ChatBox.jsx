// src/components/ChatBox.jsx
import React, { useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketContext';

const ChatBox = () => {
  const { messages, sendReaction } = useContext(WebSocketContext);

  const handleReaction = (messageId, emoji) => {
    const user = 'User'; // Replace with actual user info
    sendReaction(messageId, emoji, user);
  };
  const sendMessage = (message) => {
    const timestampedMessage = {
      ...message,
      timestamp: new Date().toISOString(),
    };
    socket.emit('message', timestampedMessage);
  };
  return (
    <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4">
      {messages.map((msg, index) => (
        <div key={index} className="mb-4">
          <div className="mb-1 flex justify-between">
            <span className="font-semibold">{msg.sender}</span>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="mb-2">{msg.text}</div>
          <div className="flex items-center">
            <div className="flex">
              {['👍', '❤️', '😂', '😮'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(msg._id, emoji)}
                  className="text-xl px-2"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="ml-4">
              {/* Ensure reactions is an object before using Object.entries */}
              {msg.reactions && Object.entries(msg.reactions).map(([emoji, users]) => (
                <span key={emoji} className="px-2">
                  {emoji} {users.length}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
