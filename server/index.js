import express from "express";
import { connectDB } from "./utils/mongodbConnection.util.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares -->

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

//Routes -->

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, GupShup server is running!");
});

// Error middleware should be registered after routes so it can catch errors
// produced by route handlers.
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
