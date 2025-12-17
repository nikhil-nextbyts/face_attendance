# Face Recognition Based Attendance Management System

## 1. Introduction
The Face Recognition Based Attendance Management System is an AI-enabled web application designed to automate the process of attendance marking using facial recognition technology. Traditional attendance systems are time-consuming, error-prone, and vulnerable to proxy attendance. This project addresses these issues by providing a secure, accurate, and automated solution suitable for educational institutions.

The system integrates modern web technologies with artificial intelligence to identify registered users through facial features and mark attendance automatically in a centralized database.

---

## 2. Objective of the Project
The main objectives of this project are:
- To automate the attendance marking process using face recognition
- To eliminate proxy attendance
- To reduce manual effort and human errors
- To maintain accurate attendance records with date and time
- To provide a scalable and reliable attendance management solution

---

## 3. Scope of the Project
This project is intended for use in:
- Colleges and universities
- Schools and training institutes
- Classrooms and laboratories

The system supports user registration, face encoding, face recognition, and automatic attendance marking. It can be extended in the future with analytics, cloud deployment, and mobile applications.

---

## 4. System Architecture
The system follows a modular architecture consisting of four main components:

- **Frontend (React.js)**  
  Provides user interface for face registration and recognition.

- **Backend (Node.js + Express)**  
  Handles API requests, database operations, and communication with the ML service.

- **Machine Learning Service (FastAPI + Python)**  
  Performs face encoding and recognition using the `face_recognition` library.

- **Database (MySQL)**  
  Stores user information and attendance records.

---

## 5. Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Multer
- Axios

### Artificial Intelligence / Machine Learning
- Python
- FastAPI
- face_recognition
- NumPy

### Database
- MySQL
- mysql2

---

## 6. Features of the System
- User registration with face encoding
- Face recognition using camera or image upload
- Automatic attendance marking
- Date and time based attendance records
- Duplicate user prevention
- Secure handling of facial data
- Temporary image cleanup after processing

---

## 7. Project Structure
face_attendance/
│
├── README.md
├── .gitignore
├── scriptDB.sql
│
├── frontend/
│ ├── components/
│ ├── pages/
│ └── App.jsx
│
├── node_backend/
│ ├── controllers/
│ ├── routes/
│ ├── config/
│ ├── uploads/
│ └── server.js
│
└── fastapi_backend/
├── app.py
├── encodings/
└── tmp/


---

## 8. Database Design

### Users Table
- id
- name
- email
- face_id
- image_path

### Attendance Table
- id
- user_id
- date
- time
- status

---

## 9. Installation and Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/nikhil-nextbyts/face_attendance.git
cd face_attendance
```

### Step 2: Database Setup

- Create a MySQL database named ```face_attendance```
- Import the schema from ```scriptDB.sql```

### Step 3: Start FastAPI Server
```bash
cd fastapi_backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Step 4: Start Node.js Backend
```bash
cd node_backend
npm install
npm start
```

### Step 5: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 10. API Endpoints
### Face APIs

- POST ```bash /api/face/encode``` – Encode and register a face
- POST ```bash /api/face/recognize``` – Recognize face and mark attendance

### User APIs

- POST ```bash /api/user/register``` – Register a new user
- POST ```bash /api/user/mark``` – Mark attendance manually (if required)

---

## 11. Testing

#### The system was tested using:
- Manual testing through browser
- API testing using Postman
- Camera-based face recognition tests
- Database verification using MySQL Workbench

---

## 12. Security Considerations
- Email uniqueness enforced
- Facial images are not stored permanently
- Face encodings stored securely
- Temporary files deleted after processing
- Environment variables used for sensitive data

---

## 13. Future Enhancements
- Liveness detection
- Role-based access (Admin / Faculty)
- Attendance analytics and reports
- Cloud deployment
- Mobile application support

---

## 14. Conclusion

The Face Recognition Based Attendance Management System successfully demonstrates the integration of artificial intelligence with full-stack web development. It provides an efficient, secure, and automated solution for attendance management and serves as a practical implementation of AI in real-world applications.

---

## Author

Nikhil Saini

## 16. References

- https://github.com/ageitgey/face_recognition
- https://fastapi.tiangolo.com/
- https://nodejs.org/
- https://react.dev/
- https://dev.mysql.com/
