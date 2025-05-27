import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Ensure this is imported
import { io } from "socket.io-client"; // Import socket.io-client

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext)
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userformessage } = useSelector((state) => state.app);
    const [onlineuser, setOnlineUser] = useState([]);
    useEffect(() => {
        if (userformessage) {
            const socket = io(`${import.meta.env.VITE_REACT_APP_SEVER_BASEURL}/`, {
                query: {
                    userId: userformessage._id,
                }
            });
            setSocket(socket);
            socket.on("getonline", (users) => {
                setOnlineUser(users)
                console.log("Socket disconnected")
            })
            return () => socket.close();
        }
        else {
            socket.close();
            setSocket(null);
        }
    }, [userformessage]);


    return (
        <socketContext.Provider value={{ socket, onlineuser }}>
            {children}
        </socketContext.Provider>
    );
}