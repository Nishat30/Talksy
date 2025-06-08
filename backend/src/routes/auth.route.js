import express from "express";
import {login,logout,signup,updateProfile,checkAuth}  from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router=express.Router();

router.post("/signup" ,signup);

router.post("/login" ,login);

router.post("/logout" ,logout);

//for alowing user to update the profile pic
router.put("/update-profile",protectRoute,updateProfile);

router.get("/check", protectRoute,checkAuth);//after every refresh to check if the user is authenticated or not to decide whether to take hin to the profile page or the login page


export default router;