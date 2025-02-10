import express from "express";
import route from "./routes/userRoute.js";
import dbConnect from "./config/dbConnection.js";
import dotenv from "dotenv";
import notesRoute from "./routes/notesRoute.js";
import cors from "cors"


const app = express();
app.use(express.json());

//File saving as static
app.use("/uploads" , express.static("uploads"))

//Solving cors error 
app.use(cors());

dotenv.config({ path: '.env' });

const port = process.env.PORT;

app.use("/userData", route);
app.use("/noteData", notesRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

dbConnect();