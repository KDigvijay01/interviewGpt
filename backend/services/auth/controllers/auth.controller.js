import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";



export const GoogleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);

    // Check if the user already exists in the database
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(`session: ${sessionId}`, JSON.stringify({
      userId: user._id, 
      name: user.name,
      email: user.email,
      interviewCoin: user.interviewCoin
     }), "EX", 7 * 24 * 60 * 60); // Set session to expire in 7 days




    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    return res.status(200).json({ success: true, user });
  }
  catch (error) {
    console.error("Error in GoogleAuth:", error);
    return res.status(500).json("Google auth error", error);
  }
}


export const Logout = async (req, res) => {
  try{
     const sessionId = req.cookies?.session;
     if(sessionId){
       await redis.del(`session: ${sessionId}`);
     }

     res.clearCookie("session", {
       httpOnly: true,
       secure: true, // Set to true in production
       sameSite: "none",
     });
     return res.status(200).json({success: true, message: "LOGOUT SUCCESSFULLY"})
  }
  catch(error){
    return res.status(500).json({success: false, message: error.message});
  }
}

export const userCoins = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const session=await redis.get(`session: ${sessionId}`);
    const sessionData = JSON.parse(session);
    const { coins, action } = req.body;

    if (!coins) {
      return res.status(400).json({
        success: false,
        message: "Coins are required",
      });
    }

    const user = await User.findById(sessionData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    const currentCoins = user.interviewCoin;

    if (currentCoins < coins) {
      return res.status(403).json({
        success: false,
        message: "Not enough interview coins",
        interviewCoin: currentCoins,
      });
    }

    user.interviewCoin = currentCoins - coins;
    await user.save();

       await redis.set(`session: ${sessionId}`, JSON.stringify({
      userId: user._id, 
      name: user.name,
      email: user.email,
      interviewCoin: user.interviewCoin
     }), "EX", 7 * 24 * 60 * 60); // Set session to expire in 7 days


    return res.status(200).json({
      success: true,
      message: "Interview coins updated successfully",
      action,
      interviewCoin: user.interviewCoin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};