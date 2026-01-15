import express from 'express'
import { askToAssistant, getCurrentUser, updateAssistant } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';


const authrouter = express.Router();

authrouter.get("/current",isAuth, getCurrentUser)
authrouter.post("/update",isAuth, upload.single("assistantImage"), updateAssistant)
authrouter.post("/asktoassistant",isAuth,askToAssistant)
export default authrouter;