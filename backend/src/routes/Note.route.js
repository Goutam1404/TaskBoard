import express from "express"
import {
  createNote,
  deleteNote,
  showNotes,
  updateNote,
  showAllNotes,
} from "../controllers/Note.controller.js";

const notesRouter=express.Router();

notesRouter.get("/", showAllNotes);
notesRouter.post("/",createNote);
notesRouter.get("/:id",showNotes);
notesRouter.delete("/:id",deleteNote);
notesRouter.put("/:id",updateNote);

export default notesRouter;