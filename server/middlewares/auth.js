import {getUser} from "../service/auth.js"

async function restrictToUseSocit(req, res, next) {
    const authorization = req.headers['authorization'];
    console.log("Middleware ty tyyy ayaa code");
    
    if (!authorization) {
        console.log("No user id is found in cookies")
        return res.status(401).json({ message: "No User" })
    }
    const token = authorization.split(' ')[1]; // Split by space and get the second part
    const user = getUser(token);
    console.log("User from map:", user);

    if (!user) {
        console.log('No user found for the given userid'); // Debugging
        return res.status(401).json({ message: "No User" });
    }

    req.user = user;
    next();
}
 
export default restrictToUseSocit