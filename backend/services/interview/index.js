import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import interviewRouter from "./routes/interview.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8003;


app.use(express.json());


app.use("/", interviewRouter);

app.get("/", (req, res) => {
  res.send("interview-services server is running");
});




app.listen(PORT, () => {
  console.log("InterviewOS server is running on http://localhost:8003");
  connectDB();
});     



