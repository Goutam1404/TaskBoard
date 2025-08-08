// src/pages/NotesPage.jsx
import React, { useEffect, useState } from "react";
import { useNotes } from "../hooks/useNotes";

const NotesPage = ({ userId }) => {
  const { notes, loading, loadNotes, addNote, removeNote, editNote } =
    useNotes();
  const [newNote, setNewNote] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    loadNotes(userId); // Fetch notes when component mounts
  }, [userId]);

  const handleAdd = () => {
    if (!newNote.trim()) return;
    addNote({ title: newNote });
    setNewNote("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      removeNote(id);
    }
  };

  const handleEdit = (id, currentValue) => {
    setEditId(id);
    setEditValue(currentValue);
    setEditMode(true);
  };

  const handleEditSubmit = () => {
    if (!editValue.trim()) return;
    editNote(editId, { title: editValue });
    setEditId(null);
    setEditValue("");
    setEditMode(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Notes</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id} style={{ marginBottom: "0.5rem" }}>
              {editMode && editId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={handleEditSubmit}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
              ) : (
                <>
                  {note.title}
                  <button onClick={() => handleEdit(note._id, note.title)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(note._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesPage;
