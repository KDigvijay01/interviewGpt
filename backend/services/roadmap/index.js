import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import roadmapRouter from "./routes/roadmap.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8004;
app.use(express.json());

app.use("/",roadmapRouter)

app.get("/", (req, res) => {
  res.send("Roadmap Service is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});