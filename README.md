# PasteBin Lite (MERN)

PasteBin Lite is a lightweight web application that allows users to create and share temporary text pastes.  
Each paste can optionally expire after a given time (TTL) or after a fixed number of views.

The project is built as part of a full-stack assignment and focuses on clean API design, expiration logic, and production deployment.

---

## 🌐 Live URLs

- Frontend (Vercel): https://paste-bin-mern.vercel.app/  
- Backend (Render): https://pastebin-mern-backend.onrender.com/

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ✨ Features

- Create a text paste
- Optional time-based expiration (TTL)
- Optional view-count-based expiration
- Automatic paste deletion logic
- RESTful API design
- Fully deployed (Frontend + Backend)

---

## 🔌 API Endpoints

### Create Paste
**POST** `/api/pastes`

```json
{
  "content": "Hello World",
  "ttl_seconds": 60,
  "max_views": 5
}
```Response
{
  "id": "paste_id",
  "url": "https://<backend-url>/p/paste_id"
}

## 🔐 Environment Variables

### Backend (.env)

```Response
PORT=5000
MONGO_URI=your_mongodb_connection_string

### Frontend (Vercel Environment Variables)

VITE_BACKEND_BASE_URL=https://<your-backend-url>.onrender.com

## ▶️ Running Locally

### Backend

cd backend
npm install
npm run dev


### Frontend

cd frontend
npm install
npm run dev


## 📝 Notes & Assumptions
Paste expiration is enforced at read time.

Expired or unavailable pastes return a 404 response.

No authentication is implemented as it is out of scope for this assignment.

UI is intentionally kept minimal to focus on backend logic.