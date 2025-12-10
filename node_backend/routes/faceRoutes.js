import express from "express";
import multer from "multer";
import { recognizeFace, encodeFace } from "../controllers/faceController.js";


const router = express.Router();

// Store uploaded images temporarily
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/recognize", upload.single("image"), recognizeFace);
router.post("/encode", upload.single("image"), encodeFace);
export default router;
