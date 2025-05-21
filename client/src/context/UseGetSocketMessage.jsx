import React, { useEffect } from 'react'
import { useSocketContext } from './Socket'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../features/data';

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

            // ...existing code...
            // Remove the duplicate check
            if (typeof text === 'string') {
                dispatch(addMessage({ ...newMessage, text }));
            } else {
                console.log("Text is invalid");
            }
            // ...existing code...
        });
        return () => {
            socket.off("newMessage")
        };
    }, [socket, messages, addMessage, dispatch]);
}

export default UseGetSocketMessage
