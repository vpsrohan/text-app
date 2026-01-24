import express from "express";
import {
  getAllContacts,
  getChatUser,
  sendMessage,
  getChats,
} from "../controllers/message.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtect } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtect, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChats);
router.get("/:id", getChatUser);

router.post("/send/:id", sendMessage);

export default router;
