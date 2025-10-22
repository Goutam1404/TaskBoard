import mongoose from "mongoose";


export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/NotesTodoApp`);
    console.log("MONGO Database connected successfully");
  } catch (error) {
    console.log("Error in connecting the MONGODB ", e);
    process.exit(1);
    // console.log(e);
  }
};
