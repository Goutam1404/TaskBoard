import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import Footer from "../components/Footer.jsx";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import NotesCard from "../components/NotesCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import { fetchAllNotes } from "../api/NotesApi.js";
const Home = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // console.log("Inside fetchnotes");
        // const res = await api.get("/note/");
        const res = await fetchAllNotes();
        // console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes");
        console.log(error);

        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes..</div>
        )}

        {notes.length===0 && !isRateLimited && <NotesNotFound/>}
        <div className="text-3xl mb-5 font-bold text-primary font-mono tracking-tight">Notes</div>
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              //  <div>{note.title}| {note.description}</div>
              <NotesCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Home;
