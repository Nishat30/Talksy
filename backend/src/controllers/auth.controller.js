import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import { generateTokens } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js"
export const signup= async(req,res)=>{ //post request because we like to send some data
    const{fullName,email,password}=req.body;
    try{
        //hash passwords 
        if(!fullName || !email || !password) {
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 characters"});
        }
        const user=await User.findOne({email})
        if(user) return res.status(400).json({message:"email already exists"});
        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
        // now whenever user send uss a password like this 12345= > ewqoda_sdd it is converted like this which is non readable

        const newUser =new User({
            fullName,
            email,
            password: hashedPassword
        })
        if(newUser){
            //generate jwt token here
            generateTokens(newUser._id,res) //to- random id or sequential id check krna h
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).json({message: "Invalid user data"});
        }
    }catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"internal server error"});   
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email); // ADD THIS
    try {
        const user = await User.findOne({ email });
        console.log('User found:', user ? user.email : 'None'); // ADD THIS
        if (!user) {
            console.log('Login failed: User not found.'); // ADD THIS
            return res.status(400).json({ messages: "invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isPasswordCorrect); // ADD THIS
        if (!isPasswordCorrect) {
            console.log('Login failed: Incorrect password.'); // ADD THIS
            return res.status(400).json({ messages: "invalid credentials" });
        }

        console.log('Password correct. Generating tokens...'); // ADD THIS
        generateTokens(user._id, res); // This should be called here
        console.log('Tokens generated (attempted). Sending response.'); // ADD THIS

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

export const logout= (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "logged out successfully"});
    }catch(error){
        console.log("error in logout controller", error.message);
        res.status(500).json({message:"interal server error"});
    }
};

export const updateProfile=async(req,res)=>{
    try{
        const {profilePic}=req.body;
        const user_id=req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"profilepic is required"});
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic)
        const updatedUser= await User.findByIdAndUpdate(user_id, {profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser)
    }catch(error){
        console.log("error in update profile:",error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("error in checkAuth controller",error.message);
        res.status(500).json({message:"internal server error"});
    }
}