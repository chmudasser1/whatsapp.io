import express from "express";
import cors from "cors";
import loginapi from "./routes/login.js"
import messageapi from "./routes/message.js"
import connectUserdb from "./connection/connection.js";
import restrictToUseSocit from "./middlewares/auth.js";
import { app, server } from "./lib/socket.js";


const port = 8000;
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
const mongodburl='mongodb+srv://mmudasser212:112233aa@cluster0.v2tmgef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
connectUserdb(mongodburl);

app.use("/api/", loginapi);
app.use("/api/message", messageapi);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});