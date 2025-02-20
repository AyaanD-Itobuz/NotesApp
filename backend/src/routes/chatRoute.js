import express from "express"

import { sendMessage } from "../controller/chatController.js"

const messageRoute = express();

messageRoute.post('/sendMessage' , sendMessage);

export default messageRoute;