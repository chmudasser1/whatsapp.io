import { getreceiversocketid,io } from "../lib/socket.js";
import Login from "../models/login.js";
import Message from "../models/message.js";

export const getuserforchat = async (req, res) => {

    try {
        // console.log("Logged in user tyy ayaa code");
        const loggedinuser = req.user._id;
        const allDbusers = await Login.find({ _id: { $ne: loggedinuser } }).select("-password");
        // console.log(allDbusers, "all db")
        // const usernames = allDbusers.map(user => user.username);
        // console.log("usernames", usernames)
        return res.json(allDbusers);
    } catch (error) {
        console.log("Error in Getting User", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }

};
export const getMessage = async (req, res) => {
    try {
        // console.log("message ty aayyS")
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        })
        // console.log(message, "message")
        res.status(200).json(message)
    } catch (error) {
        console.log("Error in Getting User Messages", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
};
export const sendMessage = async (req, res) => {
    console.log("Received message data:", req.body);
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // console.log(req.body, "body");
        const { text } = req.body;
        const newMessage = {
            senderId,
            receiverId,
            text,
        };

        // console.log("Message that the user send is:", newMessage)
        const textdata = await Message.create(newMessage);
        await textdata.save();

        //todo:realtime funcationallity us here=socket.io
        const receiversocketId = getreceiversocketid(receiverId);
        if (receiversocketId) {
            io.to(receiversocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in Getting User", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}