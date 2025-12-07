import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import notesRouter from "./routes/Note.route.js";
import ratelimiter from "./middleware/rateLimiter.middleware.js";
import { connectDb } from "./db.js";
import todoRouter from "./routes/Todo.route.js";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded());
app.use(cookieParser());

//Some issue may appear in rate limiter as the token gets expired so we can comment out these line
// app.use(ratelimiter);

const PORT = process.env.PORT || 9000;

//If the db is connected then only the port will start working
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log("Listening to port: ", PORT);
  });
});

app.get("/", (req, res) => {
  res.send("At the home page");
});

app.use("/api/v1/note", notesRouter);
app.use("/api/v1/todo", todoRouter);
