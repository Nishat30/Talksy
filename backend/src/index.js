import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";
import cors from "cors";
dotenv.config();

const app=express();

app.use(express.json());

app.use(cookieParser()); //basically allow you to parse the cookie
app.use(express.json()); //extract the json data out of body
const PORT=process.env.PORT; //process is used to read env file

app.use(cors({
    origin:"http://localhost:5173", //cors are use when our bakend and frontemd are run in different ports
    credentials:true,
}));
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)


app.listen(PORT,()=>{
    console.log("server is running on port :" + PORT);
    connectDB()
});