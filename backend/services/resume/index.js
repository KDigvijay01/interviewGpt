import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import resumeRouter from "./routes/resume.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;




app.use(express.json());

app.use("/", resumeRouter);

app.get("/", (req, res) => {
  res.send("Resume server is running");
});


app.listen(PORT, () => {
  console.log(`Resume server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to the database when the server starts
});