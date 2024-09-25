// src/components/UserList.jsx
import React, { useContext } from 'react';
import { WebSocketContext } from '../contexts/WebSocketContext';

const UserList = () => {
  const { onlineUsers } = useContext(WebSocketContext);

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-2">Online Users:</h3>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index} className="text-green-500">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
