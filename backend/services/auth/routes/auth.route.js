import express from "express";
import { GoogleAuth, Logout, userCoins } from "../controllers/auth.controller.js";



const authRouter = express.Router();

authRouter.post("/login", GoogleAuth);
authRouter.get("/logout", Logout);
authRouter.post("/use-coins", userCoins);

export default authRouter;