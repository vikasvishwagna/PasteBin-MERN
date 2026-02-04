import express from "express";
import {
  createPaste,
  getPaste,
} from "../controllers/paste.controller.js";
import Paste from "../models/Paste.js";
import getNow from "../utils/getNow.js";
import { viewPasteHTML } from "../controllers/viewPasteHTML.controller.js";

const router = express.Router();

// Create a paste
router.post("/pastes", createPaste);

// Fetch a paste (API)
router.get("/pastes/:id", getPaste);

// View a paste (HTML)
router.get("/p/:id", viewPasteHTML);


export default router;
