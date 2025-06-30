import express from "express";
import {connectDB} from "./utils/mongodbConnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config({path: "./.env",
});


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


connectDB();
app.get("/", (req, res) => {
  res.send("Hello, GupShup server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});