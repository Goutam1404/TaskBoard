import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/NotesTodoApp`);
    console.log("MONGO Database connected successfully");
  } catch (error) {
    console.log("Error in connecting the MONGODB ", e);
    // console.log(e);
  }
};
