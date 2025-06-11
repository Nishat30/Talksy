import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast"; 

// import { Toaster } from 'react-hot-toast';

//useAuthStore() is a react hook
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checkauth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout:async()=>{
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser:null});
      toast.success("logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login:async(data)=>{
    set({isLoggingIn: true});
    try {
      const res=await axiosInstance.post("/auth/login",data);
      set({authUser:res.data});
      toast.success("logged in successfully");
      setTimeout(() => {
        set({ authUser: res.data });
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally{
      set({isLoggingIn:false});
    }
  },

  updateProfile:async(data)=>{
    set({isUpdatingProfile:true});
    try {
      const res=await axiosInstance.put("/auth/update-profile",data);
      set({authUser: res.data});
      toast.success("profile updated successfully");
    } catch (error) {
      console.log("error in update profile:",error);
      toast.error(error?.response?.data?.message || error.message || "Failed to update profile");
    } finally {
      set({isUpdatingProfile:false});
    }
  },
}));