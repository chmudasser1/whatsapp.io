import Login from "../models/login.js";
import { setUser } from "../service/auth.js"

async function handlePostsignip(req, res) {
    const body = req.body;
    if (!body || !body.username || !body.email || !body.password) {
        return res.status(400).json({ msg: "All fields are required..." });
    }

    try {
        //create new user
        const result = await Login.create({
            username: body.username,
            email: body.email,
            password: body.password
        });

        console.log("result", result);

        return res.status(201).json({ msg: "Success", id: result._id });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required..." });
    }

    const user = await Login.findOne({ email, password });
    if (!user) {
        console.log("User nhi hhy")
        return res.status(404).json({ msg: "No record exists" });
    } else {
        const token = setUser(user);
        res.cookie("socket", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        console.log("Token:", token)
        return res.json({ msg: "Success", token });
    }

}

export {
    handlePostsignip,
    handleLogin
};