import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import notesRouter from "./routes/Note.route.js";
import ratelimiter from "./middleware/rateLimiter.middleware.js";
import { connectDb } from "./db.js";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded());
app.use(cookieParser());
app.use(ratelimiter);
const PORT = process.env.PORT || 8000;

//If the db is connected then only the port will start working
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log("Listening to port: ", PORT);
  });
});

app.get("/", (req, res) => {
  res.send("At the home page");
});

app.use("/api/note", notesRouter);
