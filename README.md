# Store Rating App 🏪⭐

A full-stack web application that allows users to submit ratings for registered stores. Built as part of a coding challenge.

## 🚀 Live Demo
> Run locally using the setup instructions below.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| Auth | JWT + bcryptjs |
| HTTP Client | Axios |

---

## 👥 User Roles

### 🔴 System Administrator
- Add new stores, normal users, and admin users
- View dashboard with total users, stores, and ratings
- View and filter all users and stores
- View individual user details including store owner ratings

### 🟢 Normal User
- Register and login to the platform
- Browse all registered stores
- Search stores by name and address
- Submit and update ratings (1 to 5) for stores
- Update their password

### 🔵 Store Owner
- Login to the platform
- View dashboard with list of users who rated their store
- See average rating of their store
- Update their password

---

## 📁 Project Structure

store-rating-app/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── schema.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── userController.js
│   │   └── storeOwnerController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── userRoutes.js
│   │   └── storeOwnerRoutes.js
│   ├── .env.example
│   └── server.js
└── frontend/
└── src/
├── api/
│   └── axios.js
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
└── pages/
├── Login.jsx
├── Signup.jsx
├── AdminDashboard.jsx
├── UserDashboard.jsx
└── StoreOwnerDashboard.jsx
