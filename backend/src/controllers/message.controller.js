import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsersForSidebar= async(req,res)=>{
    try{
        const loggedInUserId= req.user._id;
        const filteredUsers= await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers)

    }catch(error){
        console.error("error in getUsersForSidebar: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params
        const myId= req.user._id;

        const messages= await Message.find({
            $or:[
                {senderId: myId, reveiverId:userToChatId}, //sender is my
                {senderId: userToChatId, reveiverId:myId} // sender is the other user
            ]
        })
        res.status(200).json(messages)
    }catch (error){
        console.log("error in getMessages controller: ", error.message);
        res.status(500)/json({error:"internal server error"});
    }
};

export const sendMessages=async(req,res)=>{
    try {
        const {text,image}= req.body;
        const {id:recieverId}= req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage= new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        //todo: realtime functionality goes here=> socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage controller: ", error.message);
        res.status(500).json({error:"internal server error"});
    }
};