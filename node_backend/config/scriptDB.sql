CREATE DATABASE face_attendance;

USE face_attendance;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  face_id VARCHAR(255),
  image_path VARCHAR(255)
);

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('Present', 'Absent') DEFAULT 'Present',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

