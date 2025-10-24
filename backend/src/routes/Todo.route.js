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
} from "../controllers/Todo.controller.js";
const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/create", createTodo);
todoRouter.put("/:id", updateTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.delete("/delete-todo/:id", deleteTodo);

todoRouter.post("/task/add/:id", addTask);
todoRouter.put("/:id/task/:taskId", updatedTask);
todoRouter.delete("/:id/task/delete-task/:taskId", deleteTask);

export default todoRouter;
