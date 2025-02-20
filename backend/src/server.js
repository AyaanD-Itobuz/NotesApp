import express from "express";
import route from "./routes/userRoute.js";
import dbConnect from "./config/dbConnection.js";
import dotenv from "dotenv";
import notesRoute from "./routes/notesRoute.js";
import cors from "cors"
import { Server } from "socket.io";
import http from 'http';

import messageRoute from "./routes/chatRoute.js";
import { createServer } from "http";

dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());

//File saving as static
app.use("/uploads" , express.static("uploads"))

//Solving cors error 
app.use(cors());


const port = process.env.PORT;

app.use("/userData", route);
app.use("/noteData", notesRoute);
app.use("/messageData" , messageRoute)


//Web Socket Logic 
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

//Connecting Database
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

dbConnect();
