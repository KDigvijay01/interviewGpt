import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cookieParser());
app.use(express.json());
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.send("Auth-Services server is running");
});


app.listen(PORT, () => {
  console.log(`Auth-Services server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to the database when the server starts
});