import express,{Router} from "express";
import {register,login,logout,getProfile,getOtherParticipantsProfile} from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/verifyJWT.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",verifyJWT, logout);
router.get("/get-profile", verifyJWT, getProfile);
router.get("/other-participants-profile", verifyJWT, getOtherParticipantsProfile);
export default router;
