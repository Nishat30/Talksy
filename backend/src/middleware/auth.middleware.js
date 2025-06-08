import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute=async (req,res,next)=>{ //this next fucntion will call the sec function from where this is called
    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({messafe:"unauthorized- no token provided"}) ;
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({messafe:"unauthorized- Invalid Token"}) ;
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        req.user= user
        next()
    }catch(error){
        console.log("error in protectRoute middleware: ",error.message);
        res.status(500).json({message:"internal server error"});
    }
}