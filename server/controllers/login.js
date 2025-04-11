import Login from "../models/login.js";
import bcrypt from "bcrypt";

async function handlePostsignip(req, res) {
    const body = req.body;

    if (!body || !body.username || !body.email || !body.password) {
        return res.status(400).json({ msg: "All fields are required..." });
    }

    try {
        const existingUser = await Login.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({ msg: "User  already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const result = await Login.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
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

    const user = await Login.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "No record exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    return res.json({ msg: "Success" });
}

export {
    handlePostsignip,
    handleLogin
};