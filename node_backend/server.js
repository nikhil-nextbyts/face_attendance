import express from "express";
import cors from "cors";
import faceRoutes from "./routes/faceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { checkDbConnection } from "./config/db.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/face", faceRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await checkDbConnection();
  console.log(`server is running... on http://localhost:${PORT}/ `);
});

 