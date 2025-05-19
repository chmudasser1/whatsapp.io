import React, { useEffect } from 'react'
import { useSocketContext } from './Socket'
import { useDispatch, useSelector } from 'react-redux';
import { Sendmessages } from '../features/data';

const UseGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages } = useSelector((state) => state.app)
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            console.log('Socket connected:', socket.id);
            console.log('Socket Messages :', messages);
            console.log('New Message:', newMessage);

            // Extract the text string safely
            let text = newMessage?.text;
            if (typeof text === 'object' && text?.text) {
                text = text.text;
            }

            // Check if the new message is already in the messages array
            const isMessageExists = messages.some((message) => message._id === newMessage._id);
            if (!isMessageExists && typeof text === 'string') {
                dispatch(Sendmessages(text));
            } else {
                console.log("Message already exists in the array or text is invalid");
            }
        });
        return () => {
            socket.off("newMessage")
        };
    }, [socket, messages, Sendmessages, dispatch]);
}

export default UseGetSocketMessage
