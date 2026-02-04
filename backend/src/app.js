import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import pasteRoutes from "./routes/paste.routes.js";

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", healthRoutes);
app.use("/api", pasteRoutes);
app.use("/",pasteRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Pastebin-Lite backend running" });
});

export default app;
