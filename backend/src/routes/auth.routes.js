import express from "express";
import { signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/signup");
router.get("/signup");

export default router;
