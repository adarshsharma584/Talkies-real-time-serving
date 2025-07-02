import express,{Router} from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.post("/send-message/:receiverId",verifyJWT, sendMessage);
router.get("/get-messages/:receiverId", verifyJWT, getMessages);
export default router;