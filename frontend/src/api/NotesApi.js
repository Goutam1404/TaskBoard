// src/api/noteApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api/v1/", // Update if needed
  withCredentials: true, // Only needed if you're using cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

// CRUD Operations
export const fetchAllNotes = () => API.get("/note/"); // GET /notes
export const fetchSingleNote = (id) => API.get(`/note/${id}`); //Fetching note for a particular id
export const createNote = (data) => API.post("/note/", data); // POST /notes
export const updateNote = (id, data) => API.put(`/note/${id}`, data); // PUT /notes/:id
export const deleteNote = (id) => API.delete(`/note/${id}`); // DELETE /notes/:id
