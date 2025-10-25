import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodos,
  getTodoById,
  deleteTodo,
  addTask,
  updatedTask,
  deleteTask,
  getTask,
} from "../controllers/Todo.controller.js";
const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.delete("/:id", deleteTodo);

todoRouter.post("/:id/task", addTask);
todoRouter.get("/:id/task", getTask);
todoRouter.put("/:id/task/:taskId", updatedTask);
todoRouter.delete("/:id/task/:taskId", deleteTask);

export default todoRouter;
