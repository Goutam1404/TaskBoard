// src/api/noteApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api/v1/note", // Update if needed
  withCredentials: true, // Only needed if you're using cookies for auth
});

// CRUD Operations
export const fetchAllNotes = () => API.get("/"); // GET /notes
export const createNote = (data) => API.post("/", data); // POST /notes
export const updateNote = (id, data) => API.put(`/${id}`, data); // PUT /notes/:id
export const deleteNote = (id) => API.delete(`/${id}`); // DELETE /notes/:id
