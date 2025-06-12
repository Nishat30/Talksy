# 💬 Talksy

A modern, real-time chat application built with **React**, **Vite**, **Tailwind CSS**, and **DaisyUI**. This project focuses on user authentication, dynamic theming, and a responsive chat interface.

---

## 📺 Video Tutorial on YouTube

*(Placeholder for future video link)*

---

## ✨ Highlights

- **Tech Stack:** MERN (MongoDB, Express, React, Node.js) + Socket.io, TailwindCSS + DaisyUI  
- **Authentication & Authorization:** Secure user management with JWT (JSON Web Tokens)  
- **Real-time Messaging:** Powered by Socket.io for instant message delivery  
- **Online User Status:** See which users are currently online  
- **Global State Management:** Efficiently handled with Zustand  
- **Dynamic Theming:** Personalize your experience with various DaisyUI themes  
  *(Note: Global theming application is currently being addressed – refer to issues for updates)*  
- **Responsive Design:** Optimized for seamless experience across devices  
- **Icons:** Stylish, lightweight icons using [Lucide React](https://lucide.dev/)  
- **Error Handling:** Robust error handling on both the server and client  
- **Deployment:** Ready for deployment *(future instructions will be added)*  

---

## ⚙️ Setup `.env` File

Create a `.env` file inside your `backend` directory and add the following:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
