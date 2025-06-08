import express from"express"

const router= express.Router();

router.get("/users",protectRoute,getUsersForSidebar)

router.get("/:id",protectRoute,getMessages)

router.get("/send/:id",protectRoute,sendMessages)

export default router;