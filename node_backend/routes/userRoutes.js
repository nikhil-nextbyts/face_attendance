import express from "express";
import { registerUser, markAttendance } from "../controllers/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/mark", markAttendance);

export default router;
