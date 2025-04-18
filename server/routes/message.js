import express from "express"
import restrictToUseSocit from "../middlewares/auth.js";
import { getMessage, getuserforchat, sendMessage } from "../controllers/message.js";

const router = express.Router();

router.get("/users", restrictToUseSocit, getuserforchat)
router.get("/:id", restrictToUseSocit, getMessage)
router.post("/send/:id", restrictToUseSocit, sendMessage)

export default router