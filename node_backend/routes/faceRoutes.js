import express from "express";
import {upload} from "../middlewares/upload.js";
import { recognizeFace, encodeFace } from "../controllers/faceController.js";



const router = express.Router();


router.post("/recognize", upload.single("image"), recognizeFace);
router.post("/encode", upload.single("image"), encodeFace);

export default router;
