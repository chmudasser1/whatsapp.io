import express from "express";
import cors from "cors";
import loginapi from "./routes/login.js"
import messageapi from "./routes/message.js"
const port = 8000;
const app = express();
import connectUserdb from "./connection/connection.js";
import restrictToUseSocit from "./middlewares/auth.js";

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

connectUserdb('mongodb://127.0.0.1:27017/WebSocket-Login');

app.use("/api/", loginapi);
app.use("/api/message", messageapi);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});