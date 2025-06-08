import React, { useEffect } from 'react';
import {Routes,Route, useLoaderData,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore'; 
import {Loader} from "lucide-react"
const App= () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log({authUser});
  if(isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className ="size-10 animate-spin"/>
      </div>
    );

  return (
    <div>

      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to ="/login"/>} />
        <Route path="/signup" element={!authUser? <SignupPage />: <Navigate to ="/"/>} />
        <Route path="/login" element={!authUser?<LoginPage />: <Navigate to ="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?<ProfilePage />:<Navigate to ="/login"/>} />
      </Routes>
    </div>
  );
};

export default App;