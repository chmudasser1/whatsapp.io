import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import loginapi from "./routes/login.js"
import messageapi from "./routes/message.js"
import connectUserdb from "./connection/connection.js";
import restrictToUseSocit from "./middlewares/auth.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));
const mongodburl = process.env.MONGODB_URL;
if (!mongodburl) {
    console.error("MongoDB URL is not defined in environment variables.");
    process.exit(1);
}
connectUserdb(mongodburl);
app.get("/", (req, res) => {
    res.send("WhatsApp.io backend is running!");
});
app.use(loginapi);
app.use("api/message", messageapi);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});