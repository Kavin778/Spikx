import { useState } from 'react';
import { LockClosedIcon, EnvelopeIcon,UserIcon } from '@heroicons/react/16/solid';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Registration</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <div className="flex px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-black items-center">
          <UserIcon className="size-6 mr-1" />
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-black items-center">
          <EnvelopeIcon className="size-6 mr-1" />
          <input
            type="email"
            placeholder="Enter your email@"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>

        <div className="flex px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-black items-center">
          <LockClosedIcon className="size-6 mr-1" />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-black/70 transition duration-200">
        Sign In
      </button>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-black"></div>
        <span className="px-3 text-black font-semibold text-sm">OR</span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-green-800 font-semibold hover:underline">
          Register
        </a>
      </p>
    </div>
  );
};

export default Register;
