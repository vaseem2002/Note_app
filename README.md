# 📝 MERN Notes App

A full-stack **Notes Management Application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
This app allows users to **register, log in, create, update, and delete notes** securely with JWT authentication.

---

## ⚡ Features
- 🔐 **User Authentication** (Register / Login / Logout)
- 📝 **Create, Read, Update, Delete (CRUD) Notes**
- ⚡ **JWT-based Authentication** with protected routes
- 🎨 **Responsive UI** with Tailwind CSS
- 🌐 **RESTful API** integration using Axios
- 🗂 **State Management** with Context API + Reducer
- 🛠 **Error Handling** and loading states

---
GET /api/notes → Get all notes for logged-in user
# 📝 MERN Notes App

A full-stack Notes Management Application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This app enables users to securely register, log in, and manage notes with robust JWT authentication.

---

## 🚀 Features

- **User Authentication:** Register, Login, Logout
- **Notes CRUD:** Create, Read, Update, Delete notes
- **JWT Security:** Protected API routes
- **Responsive UI:** Built with Tailwind CSS
- **RESTful API:** Axios integration
- **State Management:** Context API + Reducer
- **Robust Error Handling**

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Context API & useReducer
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt.js

---

## � Project Structure

```
notes-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-notes-app.git
cd mern-notes-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth Routes
- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login and receive JWT

### Notes Routes (Protected)
- `GET /api/notes` — Get all notes for logged-in user
- `POST /api/notes` — Create a new note
- `PUT /api/notes/:id` — Update a note
- `DELETE /api/notes/:id` — Delete a note

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

> Crafted with ❤️ by Vaseem
