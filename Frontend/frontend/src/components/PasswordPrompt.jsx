import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/16/solid';

const PasswordPrompt = ({ roomData,onJoin, onClose }) => {
  const [password, setPassword] = useState('');

  const handleJoin = () => {
    onJoin(password,roomData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gray-800 text-white p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Enter Password</h2>
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-400 mb-1">Room Password</label>
          <div className="flex px-4 py-2 border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 items-center">
            <LockClosedIcon className="size-6 mr-3 text-gray-400" />
            <input
              type="password"
              placeholder="Enter the room password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 w-full bg-gray-600 hover:bg-red-500 font-semibold rounded-lg transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="px-6 py-2 w-full bg-blue-500 hover:bg-blue-400 font-semibold rounded-lg transition-colors duration-300"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
