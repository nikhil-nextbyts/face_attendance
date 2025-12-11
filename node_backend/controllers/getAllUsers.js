import db from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const sql = `SELECT id, name, email, face_id, image_path FROM users ORDER BY id ASC`;
    const [rows] = await db.query(sql);
    console.log("object")
    console.log(rows);

    return res.json({ users: rows });
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({ error: err.message });
  }
};
