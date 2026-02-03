import express from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router = express.Router();

// Health check route
router.get("/healthz", healthCheck);

export default router;
