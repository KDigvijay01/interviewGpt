import express from "express";
import { generateRoadmap, getAllRoadmaps, getRoadmapById } from "../controllers/roadmap.controller.js";


const roadmapRouter = express.Router();
roadmapRouter.post("/generate", generateRoadmap);
roadmapRouter.get("/:id", getRoadmapById);
roadmapRouter.get("/", getAllRoadmaps);

export default roadmapRouter;