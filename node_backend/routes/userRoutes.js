import express from "express";
import {
  registerUser,
  markAttendance,
  updateUser,
  getUserCount,
  getTodayAttendanceStats,
} from "../controllers/userController.js";
import { getAllUsers } from "../controllers/getAllUsers.js";
import { upload } from "../middlewares/upload.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/mark", markAttendance);
router.get("/all", getAllUsers);
router.put("/edit/:face_id", upload.single("image"), updateUser); // Reuse registerUser for editing
router.get("/count", getUserCount);
router.get("/attendance/stats", getTodayAttendanceStats);

export default router;
