import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import socketService from '../api/SocketService';

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesendRef = useRef(null);
  const chatContainerRef = useRef(null);

  const addMessage = msg => {
    setMessages(prev => [...prev, msg]);
  };

  useEffect(() => {
    socketService.onReceiveMessage(addMessage);
    socketService.onUserJoined(addMessage);
    socketService.onUserLeft(addMessage);
  }, []);

  useEffect(() => {
    if (messagesendRef.current && chatContainerRef.current) {
      messagesendRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [messages]);

  const handleMessage = e => {
    e.preventDefault();
    e.stopPropagation();
    if (newMessage.trim() === '') return;

    socketService.sendMessage(newMessage, user.username);
    setNewMessage('');
  };

  return (
    <div className="w-auto  h-[85vh] rounded-xl flex border-2 border-gray-600 flex-col">
      <div className="p-3 border-b border-gray-600">
        <h3 className="text-white font-semibold">Chat</h3>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar p-4 scroll-smooth transition-all duration-300"
      >
        <ul className="space-y-4 transiton-all duration-300">
          {messages.map(message => (
            <li
              key={message.id}
              className={`flex text-white ${messages.username === username ? 'justify-end' : 'justify-start'}`}
            >
              <p
                className={`text-md font-semibold ${message.username === username ? 'ml-12' : ''}`}
              >
                {message.username === username ? 'You' : message.username}:
              </p>
              <div
                className={`ml-2 px-2 py-0.5 rounded-md group text-md font-semibold break-words ${message.sender === 'me' ? 'bg-white text-black' : 'bg-slate-400 text-white'}`}
              >
                <p className="line">{message.text}</p>
              </div>
            </li>
          ))}
          <div ref={messagesendRef} />
        </ul>
      </div>
      <div className="p-2 transition-all duration-300">
        <form onSubmit={handleMessage} className="flex w-full h-12 rounded-xl">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-gray-600 w-[85%] m-0.5 p-2 rounded-lg mx-1 hover:bg-slate-200 hover:text-black focus:bg-slate-200 text-lg font-semibold focus:text-black transition-all duration-300 text-white"
          />
          <button
            type="submit"
            className="flex justify-center items-center group text-white bg-slate-400 hover:bg-slate-200 rounded-lg h-auto w-[15%] m-0.5 transition-all duration-300"
          >
            <PaperAirplaneIcon className="size-6 group-hover:text-black" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
