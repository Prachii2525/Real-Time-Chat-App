// src/App.jsx
import React from 'react';
import { WebSocketProvider } from './contexts/WebSocketContext';
import ChatBox from './components/ChatBox';
import UserList from './components/UserList';
import MessageInput from './components/MessageInput';

const App = () => {
  return (
    <WebSocketProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="p-4 bg-blue-600 text-white">
          <h1 className="text-lg font-bold">Real-Time Chat Application</h1>
        </header>
        <main className="flex flex-grow p-4">
          <UserList />
          <ChatBox />
        </main>
        <MessageInput />
      </div>
    </WebSocketProvider>
  );
};

export default App;
