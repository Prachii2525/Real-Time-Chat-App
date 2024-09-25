// src/contexts/WebSocketContext.js
import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const WebSocketContext = createContext();
const socket = io('http://localhost:3000'); // Update this URL to your server endpoint

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('typing', (data) => {
      setTyping((prevTyping) => ({
        ...prevTyping,
        [data.user]: data.isTyping,
      }));
    });

    socket.on('users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('reaction', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
    });

    return () => {
      socket.off('message');
      socket.off('typing');
      socket.off('users');
      socket.off('reaction');
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  const sendTypingStatus = (user, isTyping) => {
    socket.emit('typing', { user, isTyping });
  };

  const sendReaction = (messageId, emoji, user) => {
    socket.emit('reaction', { messageId, emoji, user });
  };

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        sendMessage,
        sendTypingStatus,
        sendReaction,
        typing,
        onlineUsers,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
