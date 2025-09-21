import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how's it going?", sender: 'them' },
    { id: 2, text: 'Good, thanks! Just working on a React project.', sender: 'me' },
    { id: 3, text: 'Nice! Anything interesting?', sender: 'them' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesendRef = useRef(null);

  useEffect(() => {
    messagesendRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMessage = e => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
    };
    setMessages([...messages, messageToSend]);
    setNewMessage('');
  };

  return (
    <div className="w-md h-[80vh] rounded-xl p-2 flex border-2 border-white flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar p-2">
        <ul className="space-y-4  ">
          {messages.map(message => (
            <li
              key={message.id}
              className={`flex text-white ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <p className={`text-md font-semibold ${message.sender === 'me' ? 'ml-12' : ''}`}>
                {message.sender === "me"? "You": message.sender}:
              </p>
              <div
                className={`ml-2 px-2 py-0.5 rounded-md group text-md font-semibold break-words ${message.sender === 'me' ? 'bg-green-900' : 'bg-slate-400'}`}
              >
                <p className="text-white line">{message.text}</p>
              </div>
            </li>
          ))}
          <div ref={messagesendRef} />
        </ul>
      </div>
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
          className="flex justify-center items-center group text-white bg-slate-400 hover:bg-slate-200 rounded-lg h-auto w-[15%] m-0.5"
        >
          <PaperAirplaneIcon className="size-6 group-hover:text-black" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
