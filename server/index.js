import express from "express";
import 'dotenv/config';
import cors from "cors";
import loginapi from "./routes/login.js"
import messageapi from "./routes/message.js"
import connectUserdb from "./connection/connection.js";
import restrictToUseSocit from "./middlewares/auth.js";
import { app, server } from "./lib/socket.js";


const port = process.env.PORT;
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
const mongodburl = process.env.MONGODB_URL;
if (!mongodburl) {
    console.error("MongoDB URL is not defined in environment variables.");
    process.exit(1);
}
connectUserdb(mongodburl);

app.use("api/", loginapi);
app.use("api/message", messageapi);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});