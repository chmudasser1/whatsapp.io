import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;
console.log("secret", secret);
function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secret)
}

function getUser(token) {
    // console.log("getuser par ayaa hy code", token)
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