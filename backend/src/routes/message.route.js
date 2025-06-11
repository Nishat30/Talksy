import express from"express"
import {protectRoute} from "../middleware/auth.middleware.js"
import {getUsersForSidebar} from "../controllers/message.controller.js"
import { getMessages } from "../controllers/message.controller.js";
import { sendMessages } from "../controllers/message.controller.js";

const router=express.Router();

router.get("/users",protectRoute,getUsersForSidebar)

router.get("/:id",protectRoute,getMessages)

router.get("/send/:id",protectRoute,sendMessages)

export default router;