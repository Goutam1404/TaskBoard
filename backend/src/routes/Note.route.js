import express from "express"
import { createNote, deleteNote, showNotes, updateNote } from "../controllers/Note.controller.js";

const notesRouter=express.Router();

notesRouter.post("/create-note",createNote);
notesRouter.get("/show-note/:id",showNotes);
notesRouter.delete("/delete-note/:id",deleteNote);
notesRouter.put("/update-note/:id",updateNote);

export default notesRouter;