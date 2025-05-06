import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { Sendmessages } from '../features/data';

const NewChat = () => {
  const [text, setText] = useState(""); // Initialize as an empty string
  const dispatch = useDispatch();

  const handleMessage = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!text.trim()) return; // Ensure the input is not empty or just whitespace
    dispatch(Sendmessages(text));
    setText(""); // Clear the input field after sending the message
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { // Check if the Enter key is pressed
      handleMessage(e);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='flex items-center gap-6'>
        <input
          type="text"
          placeholder='Type a message...'
          value={text}
          className='border-slate-800 border-2 w-full bg-slate-950 rounded-lg py-4 px-4 text-sm text-white'
          onChange={(e) => setText(e.target.value)} // Update state on input change
          onKeyDown={handleKeyDown} // Trigger handleMessage on Enter key press
        />
        <IoIosSend
          className='text-white size-10 cursor-pointer'
          onClick={handleMessage} // Pass the function reference, not the result of calling it
        />
      </div>
    </div>
  );
};

export default NewChat;