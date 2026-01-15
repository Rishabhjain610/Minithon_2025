
## 🎥 Demo Video
https://github.com/user-attachments/assets/595375b6-c57e-4ea3-95ea-7c2c826057c5
# 🏠 Dormitory Management System

### 🚀 Project built for **Minithon 3.0 Hackathon (Problem Statement 4)**  
A full-stack **MERN-based Dormitory Management Platform** designed to provide an efficient, user-friendly, and centralized system for managing dormitory operations — from room listings and bookings to inquiries and reviews.

---

## 📋 Problem Statement

The dormitory currently lacks a digital presence, making it difficult to manage bookings, display rooms, and share information efficiently.  
This project solves that by creating a **web platform** that digitizes the entire process — improving communication, boosting visibility, and simplifying dorm management.

---

## 🎯 Objectives

- Create a modern and responsive **web interface** for residents and administrators.  
- Display **available rooms** with amenities, prices, and real-time availability.  
- Simplify **room bookings and inquiries**.  
- Showcase the dormitory's **facilities through galleries, reviews, and location maps**.  
- Enable **secure authentication and data management** for admins and users.

---

## 🧩 Features

### 🏘️ Room Listings
- View all available room types with filters (price, type, amenities)
- Real-time availability status
- Room comparison feature

### 🖼️ Photo Gallery
- High-quality photos & videos of rooms and facilities
- Zoom and slideshow support

### 🧾 Booking & Inquiry System
- Interactive contact/inquiry form  
- Automated acknowledgment and quick admin response

### 📍 Location & Map Integration
- Interactive map with dorm location, nearby landmarks & routes

### 💬 Testimonials & Reviews
- Resident feedback with ratings for credibility and transparency

### 🔐 Authentication (via Firebase)
- Secure login and signup for residents and admins  
- Firebase Authentication for user management  
- Session-based access control for protected routes  

### ❓ FAQ Section
- Categorized FAQs to assist users and reduce admin workload

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ React 19 + Vite  
- 🎨 Tailwind CSS + Radix UI + Lucide Icons  
- 🔔 React Toastify for notifications  
- 📸 html2canvas & jsPDF for downloads/exports  
- 🌐 Axios for API calls  
- 🔥 **Firebase Authentication** (for login, signup & secure access)

### **Backend**
- 🧩 Node.js + Express.js  
- 🧠 MongoDB + Mongoose  
- 🔐 JWT Authentication + bcryptjs (for server-side token validation)  
- 📱 Twilio API for communication/OTP  
- 🌍 CORS, Cookie-parser for session handling  

---

## ⚙️ Installation & Setup

### 🔹 Clone the Repository
```bash
git clone https://github.com/<your-username>/dormitory-management.git
cd dormitory-management
```

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🔹 Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 🔹 Environment Variables

Create a `.env` file in both `frontend` and `backend` folders with:

```env
# Example
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_API_KEY=your_firebase_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

---


---

## 🧠 Hackathon Context

This project was built as part of **Minithon 3.0 (Hackathon at Thadomal Shahani Engineering College,Bandra)** under the theme **"Dormitory Management"**.
The goal was to design and develop a scalable, real-world platform that improves **efficiency, accessibility, and resident experience**.

---

## 💡 Future Enhancements

- Admin dashboard for managing bookings and residents
- Payment gateway integration for online room booking
- AI-powered chatbot for FAQs and inquiries
- Email and SMS notifications
- Multi-dormitory management support

---
