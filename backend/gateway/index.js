import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import { getCurrUser } from "./controllers/user.controller.js";
import { isAuth } from "./middleware/isAuth.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:8001";
const RESUME_SERVICE_URL = process.env.RESUME_SERVICE_URL || "http://localhost:8002";
const INTERVIEW_SERVICE_URL = process.env.INTERVIEW_SERVICE_URL || "http://localhost:8003";
const ROADMAP_SERVICE_URL = process.env.ROADMAP_SERVICE_URL || "http://localhost:8004";
const BILLING_SERVICE_URL = process.env.BILLING_SERVICE_URL || "http://localhost:8005";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: FRONTEND_URL,
   credentials: true
}));

app.use(morgan("dev"));


app.use('/api/auth', proxy(AUTH_SERVICE_URL));
app.use('/api/resume', isAuth, proxyWithHeaders(RESUME_SERVICE_URL))
app.use('/api/interview', isAuth, proxyWithHeaders(INTERVIEW_SERVICE_URL));
app.use('/api/roadmap', isAuth, proxyWithHeaders(ROADMAP_SERVICE_URL));
app.use('/api/billing', isAuth, proxyWithHeaders(BILLING_SERVICE_URL));
app.get("/api/me", isAuth, getCurrUser);



app.get("/", (req, res) => {
  res.send("Gateway server is running");
});



app.listen(PORT, () => {
  console.log(`Gateway server is running on http://localhost:${PORT}`);
}); 