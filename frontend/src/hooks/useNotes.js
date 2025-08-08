// src/hooks/useNotes.js
import { useEffect, useState } from "react";
import * as api from "../api/NotesApi.js";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    try {
      const res = await api.fetchAllNotes();
      setNotes(res.data);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteData) => {
    try {
      const res = await api.createNote(noteData);
      setNotes((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const removeNote = async (id) => {
    try {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (id, updatedData) => {
    try {
      const res = await api.updateNote(id, updatedData);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return { notes, loading, loadNotes, addNote, removeNote, editNote };
};
