import express from "express";
import mongoose from "mongoose"; 
import cors from "cors"; 
import loginapi from "./routes/login.js"
const port = 8000;
const app = express();


app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


const connectUserdb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB is connected..");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }
};

connectUserdb('mongodb://127.0.0.1:27017/WebSocket-Login');

app.use("/api/", loginapi);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});