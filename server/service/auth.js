import jwt from "jsonwebtoken";

const secret = "websocket"

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secret)
}

function getUser(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, secret);
        return decoded; // Return the decoded payload
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return null;
    }
}
export {
    setUser,
    getUser
}