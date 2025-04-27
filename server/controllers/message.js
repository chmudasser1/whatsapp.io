import Login from "../models/login.js";
import Message from "../models/message.js";

export const getuserforchat = async (req, res) => {

    try {
        console.log("Logged in user tyy ayaa code");
        const loggedinuser = req.user._id;
        const allDbusers = await Login.find({ _id: { $ne: loggedinuser } }).select("-password");
        console.log(allDbusers, "all db")
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
        console.log("message ty aayyS")
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                {
                    senderId: myId, receiverId: userToChatId
                },
                {
                    senderId: userToChatId, receiverId: myId
                }
            ]
        })
        res.status(200).json(message)
    } catch (error) {
        console.log("Error in Getting User", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
};
export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const newMessage = ({
            senderId,
            receiverId,
            text,
        });
        await newMessage.save();

        //todo:realtime funcationallity us here=socket.io

        res.status(201), json(newMessage)
    } catch (error) {
        console.log("Error in Getting User", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}