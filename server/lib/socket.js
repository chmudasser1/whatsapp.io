import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: `${process.env.FRONTEND_URL}`,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

//real time message code
export const getreceiversocketid = (receiverId) => {
    return users[receiverId]
}

const users = {};

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log(users);

    }
    io.emit("getonline", Object.keys(users))
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
        delete users[userId]
        io.emit("getonline", Object.keys(users))
    })
})


export { io, app, server };
