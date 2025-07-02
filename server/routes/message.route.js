import express,{Router} from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.post("/send-message/:receiverId",verifyJWT, sendMessage);

export default router;