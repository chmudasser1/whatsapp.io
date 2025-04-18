import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Login",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Login",
        required: true,
    },
    text: {
        type: String,
    }
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema)
export default Message;