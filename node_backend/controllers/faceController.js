import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import db from "../config/db.js";

export const encodeFace = async (req, res) => {

  const imagePath = req.file && req.file.path;
  const name = req.body?.name?.trim()  || "maina" ;
  const email = req.body?.email?.trim() || "maina@yahoo.com";
  
  if (!imagePath) return res.status(400).json({ message: "No image uploaded" });
  if (!name || !email) {
    // remove temp file if present
    try {
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    } catch (e) {}
    return res.status(400).json({ message: "name and email are required" });
  }
  const emailNorm = email.toLowerCase();
  
  // Basic email duplication check
  try {
    const [rows] = await db.query(
      "SELECT id, email FROM users WHERE email = ?",
      [emailNorm]
    );
  
    if (rows && rows.length > 0) {
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      return res.status(400).json({ message: "Email already registered" });
    }
  } catch (err) {
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    console.error("DB lookup error:", err);
    return res
      .status(500)
      .json({ message: "DB lookup failed", error: err.message });
  }

  // Prepare form-data to call FastAPI
  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));

  try {
    const fastapiRes = await axios.post(
      "http://127.0.0.1:8000/encode/",
      formData,
      {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    const { face_id, encoding_path } = fastapiRes.data;

    if (!face_id) {
      // unexpected response
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      return res
        .status(500)
        .json({
          message: "FastAPI did not return a face_id",
          debug: fastapiRes.data,
        });
    }

    // Insert user into DB
    try {
      const imagePathDb = imagePath.replace(/\\/g, "/"); // normalize windows backslashes (if any)
      const sql =
        "INSERT INTO users (name, email, face_id, image_path) VALUES (?, ?, ?, ?)";
      const [result] = await db.query(sql, [name, email, face_id, imagePathDb]);

      // success
      return res.json({
        message: "User registered successfully",
        userId: result.insertId,
        face_id,
        encoding_path,
      });
    } catch (dbErr) {
      // If DB insert fails, optionally tell FastAPI admin to remove encoding (advanced).
      console.error("DB insert error:", dbErr);
      return res
        .status(500)
        .json({ message: "DB insert failed", error: dbErr.message });
    }
  } catch (err) {
    console.error("FastAPI encode error:", err?.message || err);
    return res
      .status(500)
      .json({ message: "Encoding failed", error: err.message || err });
  } finally {
    // Always remove the temp uploaded file
    try {
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    } catch (e) {
      console.warn("Failed to remove temp image:", e.message || e);
    }
  }
};

// If FastAPI returns a match (face_id), lookup user by face_id and insert attendance.
export const recognizeFace = async (req, res) => {
  const imagePath = req.file && req.file.path;
  if (!imagePath) return res.status(400).json({ message: "No image uploaded" });

  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));

  try {
    const fastapiRes = await axios.post("http://127.0.0.1:8000/recognize/", formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    const { match, distance } = fastapiRes.data || {};

    if (!match) {
      return res.json({ message: "No match found", distance: distance ?? null });
    }

    // find user by face_id
    try {
      const [rows] = await db.query("SELECT id, name, email FROM users WHERE face_id = ?", [match]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Face recognized but user not registered", face_id: match, distance });
      }
      const user = rows[0];

      // Insert attendance row
      try {
        // Use server-side date/time insertion
        const insertSql = "INSERT INTO attendance (user_id, date, time, status) VALUES (?, CURDATE(), CURTIME(), ?)";
        await db.query(insertSql, [user.id, "Present"]);

        return res.json({
          message: "Attendance marked",
          user: { id: user.id, name: user.name, email: user.email },
          face_id: match,
          distance, 
        });
      } catch (attErr) {
        console.error("Attendance insert error:", attErr);
        return res.status(500).json({ message: "Failed to mark attendance", error: attErr.message });
      }
    } catch (dbErr) {
      console.error("DB error when finding user:", dbErr);
      return res.status(500).json({ message: "DB error", error: dbErr.message });
    }
  } catch (err) {
    console.error("FastAPI recognize error:", err?.message || err);
    return res.status(500).json({ message: "Recognition failed", error: err.message || err });
  } finally {
    // cleanup temp image
    try {
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    } catch (e) {
      console.warn("Failed to remove temp image:", e.message || e);
    }
  }
};

/* export const recognizeFace = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    // Call FastAPI endpoint (running on port 8000)
    const response = await axios.post(
      "http://127.0.0.1:8000/recognize/",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Delete temp image
    fs.unlinkSync(imagePath);

    res.json({
      message: "Recognition successful",
      result: response.data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Recognition failed", error: error.message });
  }
}; */

/* export const encodeFace = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    // Call FastAPI endpoint (running on port 8000)
    const response = await axios.post(
      "http://127.0.0.1:8000/encode/",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    // Delete temp image
    fs.unlinkSync(imagePath);

    const { face_id, encoding_path } = response.data;


    res.json({
      message: "Encoding successful",
      result: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Encoding failed", error: error.message });
  }
}; */


