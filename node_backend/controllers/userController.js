import db from "../config/db.js";

export const registerUser = (req, res) => {
  const { name, email, face_id, image_path } = req.body;

  const sql =
    "INSERT INTO users (name, email, face_id, image_path) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, face_id, image_path], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: "✅ User registered successfully!",
      userId: result.insertId,
    });
  });
};

export const markAttendance = (req, res) => {
  const { user_id, status } = req.body;
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });

  const sql =
    "INSERT INTO attendance (user_id, date, time, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, date, time, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Attendance marked successfully!" });
  });
};
