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
            dispatch(Sendmessages({ newMessage }));
            console.log("Dispatch", dispatch)
            console.log("NewMessage", newMessage)
        });
        return () => {
            socket.off("newMessage")
        };
    }, [socket, messages, Sendmessages, dispatch]);
}

export default UseGetSocketMessage
