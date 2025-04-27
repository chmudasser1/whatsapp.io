import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getmessage } from '../features/data.js';
import Chatheader from './chatheader';
import NewChat from './NewChat';

const Chatroom = () => {
  const { messages, loading, error, selectuser } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Chatroom useEffect triggered with selectuser:", selectuser);
    if (selectuser?._id && messages.length === 0) { // Only dispatch if messages are empty
        console.log("Dispatching getmessage for selectuser:", selectuser._id);
        dispatch(getmessage({ _id: selectuser._id }));
    }
}, [selectuser?._id, messages.length]); // Depend on selectuser._id and messages.length

  return (
    <div>
      <Chatheader />
      <p>...messages</p>
      <NewChat />
    </div>
  );
};

export default Chatroom;