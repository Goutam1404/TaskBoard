import mongoose, { model, Schema } from "mongoose";

//Here todo will store a array of tasks or taskschema

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

const Todo = new model("todo", todoSchema);

export default Todo;
