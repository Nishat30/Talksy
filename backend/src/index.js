import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app=express();
//Cords middleware
app.use(cors({
    origin:"http://localhost:5173", //cors are use when our bakend and frontemd are run in different ports
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow necessary HTTP methods (e.g., PUT for updateProfile)
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
//body parser
app.use(express.json({ limit: '50mb' }));//extract the json data out of body
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//cookie parser
app.use(cookieParser()); //basically allow you to parse the cookie
//api routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

const PORT=process.env.PORT; //process is used to read env file


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectDB()
});