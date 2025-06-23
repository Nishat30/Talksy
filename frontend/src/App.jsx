import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore'; 
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast"; 
import { useThemeStore } from './store/useThemeStore';


const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
  const {theme}=useThemeStore();
  console.log("Current theme from store:", theme);
  console.log(onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
     <div data-theme={theme}>
      {/* ✅ Add Toaster here so it persists across route changes */}
      

      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default App;
