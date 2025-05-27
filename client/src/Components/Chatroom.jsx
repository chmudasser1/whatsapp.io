import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getmessage } from '../features/data.js';
import Chatheader from './ChatHeader';
import NewChat from './NewChat';
import { formatMessageTime } from '../lib/utils.js';
import UseGetSocketMessage from '../context/UseGetSocketMessage.jsx';

const Chatroom = () => {
  const { messages, selectuser, userformessage } = useSelector((state) => state.app);
  UseGetSocketMessage();
  const dispatch = useDispatch();
  const lastMsgRef = useRef();

  useEffect(() => {
    if (selectuser?._id && messages?.length === 0) {
      dispatch(getmessage({ _id: selectuser._id }));
    } else if (messages?.length > 0) {
      lastMsgRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectuser?._id, messages]);

  return (
    <div className="flex flex-col h-full">
      <Chatheader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {userformessage && messages?.map((message, index) => {
          const itsme = String(message.senderId) === String(userformessage._id);
          const chatname = itsme ? "chat-end" : "chat-start";

          return (
            <div
              key={message._id}
              className={`text-white chat ${chatname}`}
              ref={index === messages.length - 1 ? lastMsgRef : null} // Attach ref to the last message
            >
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>

              </div>
              <div className="chat-bubble flex flex-col">
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <NewChat />
    </div>
  );
};

export default Chatroom