import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import paymentRouter from "./routes/billing.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 8005;
app.use(express.json());

app.use("/", paymentRouter)

app.get("/", (req, res) => {
  res.send("Billing Service is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});