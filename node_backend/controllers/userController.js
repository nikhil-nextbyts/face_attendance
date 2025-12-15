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

export const updateUser = (req, res) => {
  const { face_id } = req.params;
  const { name, email } = req.body;

  const image_path = req.file ? req.file.path : req.body.image_path;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  if (!face_id) {
    return res.status(400).json({ error: "User Face ID is required" });
  }

  let sql = `
    UPDATE users 
    SET name = ?, email = ?
  `;
  const values = [name, email];

  if (image_path) {
    sql += `, image_path = ?`;
    values.push(image_path);
  }

  sql += ` WHERE face_id = ?`;
  values.push(face_id);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "✅ User updated successfully!" });
  });
};

export const getUserCount = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    res.status(200).json({
      success: true,
      data: {
        totalUsers: rows[0].total,
      },
    });
  } catch (error) {
    console.error("User count error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch user count",
    });
  }
};


export const getTodayAttendanceStats = async (req, res) => {
  try {
    // Present count
    const [presentRows] = await db.query(`
      SELECT COUNT(DISTINCT user_id) AS present
      FROM attendance
      WHERE date = CURDATE()
        AND status = 'Present'
    `);

    // Absent count
    const [absentRows] = await db.query(`
      SELECT COUNT(*) AS absent
      FROM users u
      WHERE NOT EXISTS (
        SELECT 1
        FROM attendance a
        WHERE a.user_id = u.id
          AND a.date = CURDATE()
          AND a.status = 'Present'
      )
    `);

    res.status(200).json({
      success: true,
      data: {
        present: presentRows[0].present,
        absent: absentRows[0].absent,
      },
    });
  } catch (error) {
    console.error("Attendance stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance stats",
    });
  }
};