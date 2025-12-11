import express from "express";
import { registerUser, markAttendance } from "../controllers/userController.js";
import { getAllUsers } from "../controllers/getAllUsers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/mark", markAttendance);
router.get("/all", getAllUsers);

export default router;
