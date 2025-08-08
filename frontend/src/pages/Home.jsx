import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import axios from "axios";
import toast from "react-hot-toast"
const Home = () => {
  const [isRateLimited, setRateLimited]=useState(false);
  const [notes,setNotes]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchNotes=async ()=>{
      try{
        const res=await axios.get("http://localhost:9000/api/note");
        console.log(res.data);
        setLoading(false);
        setNotes(res.data);
        setRateLimited(true);
      }catch(error){
        console.log("Error in fetching notes");
        if(error.response?.status===429){
          setRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes();
  },[])
  
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}
      <div className='text-center mx-auto p-4 mt-6'>
          {loading && <div classnName="text-center text-primary py-10">Loading..</div>}
          {notes.length>0 && !isRateLimited&&(
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid:cols:3 gap-6'>
              {notes.map((notes)=>(
                <NoteCard key={notes._id} note={notes} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

export default Home