# 🚀 Team Task Manager (Full-Stack Web Application)

A modern full-stack web application to manage team projects, assign tasks, and track progress using a **Kanban-style workflow** with **role-based access control**.

---

## 🌐 Live Application

* 🔗 **Frontend (Vercel):**  

  [**task-manager-qh4q6ggc3-benila19s-projects.vercel.app**](https://vercel.com/benila19s-projects/task-manager/781FwvfnMuZYQFyLBd2Nu9j5kGtq)
* 🔗 **Backend API (Render):** https://task-manager-8uwh.onrender.com

---

## 📌 Project Overview

This application allows teams to collaborate efficiently by organizing tasks into projects and tracking their progress visually.

It supports:

* Task creation and assignment
* Project-based task grouping
* Role-based access (Admin & Member)
* Real-time task tracking using a Kanban board

---

## ✨ Features

### 🔐 Authentication & Authorization

* Secure user signup and login using JWT
* Role-based access:

  * **Admin**

    * Create, update, delete tasks
    * Assign tasks to users
  * **Member**

    * View assigned tasks
    * Update task status

---

### 📁 Project-Based Task Management

* Each task belongs to a **project**
* Helps organize team work efficiently

---

### 📋 Kanban Board (Core Feature)

Tasks are displayed in three columns:

* 📝 Pending
* 🚧 In Progress
* ✅ Completed

This provides a clear visual workflow for task tracking.

---

### 📊 Dashboard

* Overview of tasks
* Task distribution by status
* Recent tasks display

---

### 🧾 Task Features

* Title and description
* Priority levels (Low, Medium, High)
* Due date tracking
* Assign multiple users
* Checklist (todo items)
* Attachments support
* Status updates

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Deployment

* Backend: Render
* Frontend: Vercel

---

## 🧠 System Design

* RESTful API architecture
* JWT-based authentication
* Role-based route protection
* Modular backend structure (models, controllers, routes)

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── utils/
│   └── index.html
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https:https://github.com/benila19/Task-Manager
cd your-repo
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Run frontend:

```
npm run dev
```

---

## 🚀 Deployment

### Backend (Render)

* Connect GitHub repository
* Set root directory as `backend`
* Add environment variables
* Deploy

### Frontend (Vercel)

* Import project from GitHub
* Set root directory as `frontend`
* Add environment variable:

  ```
  VITE_API_URL=https://your-app.onrender.com
  ```
* Deploy

---

## 🎥 Demo Video

👉 Add your demo video link here

---

## 🧩 Future Improvements

* Drag-and-drop Kanban board
* Notifications system
* Task comments and collaboration
* Project analytics dashboard
* Real-time updates using WebSockets

---

## ⭐ Note

This project demonstrates a complete full-stack implementation including authentication, role-based access, task management, and deployment.

---
