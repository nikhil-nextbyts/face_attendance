📌 Face Recognition Based Attendance Management System

An AI-powered attendance management system that uses face recognition to automatically identify users and mark attendance.
The system integrates FastAPI (Python) for face recognition, Node.js + Express for backend APIs, MySQL for data storage, and a React frontend for user interaction.

🚀 Project Overview

Traditional attendance systems are time-consuming, error-prone, and vulnerable to proxy attendance.
This project solves these problems by using facial recognition technology to automatically mark attendance when a registered face is recognized.

Key Highlights

➤ Automated attendance using face recognition
➤ Eliminates proxy attendance
➤Real-time attendance recording
➤Scalable and modular architecture
➤Suitable for educational institutions

🏗️ System Architecture

Frontend (React)
       |
       v
Backend API (Node.js + Express)
       |
       v
Database (MySQL)
       |
       v
ML Service (FastAPI + face_recognition)

🛠️ Technologies Used

Frontend

• React.js
• HTML, CSS, JavaScript
• Fetch API

Backend

• Node.js
• Express.js
• Multer (file uploads)
• Axios

Machine Learning / AI

• Python
• FastAPI

face_recognition

• NumPy
• Database
• MySQL
• mysql2

✨ Features

• 👤 User registration with face encoding
• 📸 Face recognition using camera or uploaded image
• 🕒 Automatic attendance marking with date & time
• 🗄️ Secure database storage
• ❌ Duplicate user prevention
• 🧹 Temporary image cleanup after processing

📂 Project Structure

face_attendance/
│
├── node_backend/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── uploads/
│   └── server.js
│
├── fastapi_backend/
│   ├── app.py
│   ├── encodings/
│   └── tmp/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── scriptDB.sql
└── README.md


⚙️ Installation & Setup

1️⃣ Clone the Repository
    git clone https://github.com/nikhil-nextbyts/face_attendance.git
    cd face_attendance

2️⃣ Setup MySQL Database

• Create database:
    CREATE DATABASE face_attendance;

• Import schema from:
    scriptDB.sql

3️⃣ Setup FastAPI (Face Recognition Service)
    cd fastapi_backend
    conda activate face   # or your virtual environment
    pip install -r requirements.txt
    uvicorn app:app --reload

    Runs on:
        http://127.0.0.1:8000
    
4️⃣ Setup Node.js Backend
    cd node_backend 
    npm install
    npm start

    Runs on:
        http://localhost:5000
        
5️⃣ Setup Frontend
    cd frontend
    npm install
    npm run dev

🔁 API Endpoints

• Face Routes
| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/face/encode`    | Encode & register a face         |
| POST   | `/api/face/recognize` | Recognize face & mark attendance |

• User Routes
| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/user/register` | Register user   |
| POST   | `/api/user/mark`     | Mark attendance |


🧪 Testing

• Manual testing using browser & Postman
• Camera-based recognition testing
• Image upload testing
• Database verification via MySQL Workbench

📊 Database Schema (Overview)

Users Table
• id
• name
• email
• face_id
• image_path

Attendance Table
• id
• user_id
• date
• time
• status

🔒 Security Considerations
• Email uniqueness enforced
• Temporary images deleted after processing
• Server-side validation
• No face images stored permanently (only encodings)

🔮 Future Enhancements
• Liveness detection
• Cloud deployment
• Mobile application
• Role-based access (Admin / Faculty)
• Attendance analytics dashboard

🎓 Academic Use
• This project is developed as a Mini Project for MCA, demonstrating:
• AI/ML integration in web applications
• Full-stack development
• Real-world problem solving

📚 References
• https://github.com/ageitgey/face_recognition
• https://fastapi.tiangolo.com/
• https://nodejs.org/
• https://react.dev/
• https://dev.mysql.com/


👤 Author       
    NIKHIL SAINI
