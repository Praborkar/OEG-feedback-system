
# Course Feedback System (Full-Stack)

A full-stack course feedback system built using **React + PHP + MySQL**.  
The system collects learner feedback near video completion (95% & 99%) and provides a secure admin dashboard with analytics.

---

## Tech Stack

### Frontend
- React (Vite)
- YouTube IFrame API
- Responsive (mobile-first)

### Backend
- Core PHP (REST APIs)
- JWT Authentication
- PDO

### Database
- MySQL

---

## Features

### Learner Side
- Embedded YouTube course video
- Feedback popup at:
  - 95% video completion (first attempt)
  - 99% completion (final attempt if skipped)
- Feedback shown only once per session
- Star rating (1–5) mandatory
- Optional feedback text

### Admin Side
- Secure login/signup
- JWT-protected dashboard
- Feedback table with filters
- Analytics:
  - Total feedback count
  - Average rating
  - Median rating

---

## Default Admin Credentials

Email: admin@test.com  
Password: admin123

---

## API Endpoints

### Auth
- POST /api/auth/signup
- POST /api/auth/login

### Feedback
- POST /api/feedback (public)

### Admin (JWT required)
- GET /api/admin/feedback
- GET /api/admin/stats

---

## Database Schema

```sql
CREATE DATABASE course_feedback;
USE course_feedback;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NULL,
  video_id VARCHAR(100) NOT NULL,
  session_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Setup Instructions

### Backend
```bash
cd backend
php -S localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173  
Backend runs on http://localhost:8000

---

## Security

- bcrypt password hashing
- JWT authentication
- PDO prepared statements
- SQL injection protection
- Proper HTTP status codes
- CORS enabled

---

## Run Demo

- Start backend using PHP built-in server
- Start frontend using Vite
- Login as admin to view analytics

---

## Author

Built as a full-stack engineering showcase project.
