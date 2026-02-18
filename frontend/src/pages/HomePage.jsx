import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import axios from "axios"
import toast from 'react-hot-toast';
import api from '../lib/axios';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
      const res = await api.get("/notes")
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.log("Error fetching notes");
      if(error.response.status === 429){
        setIsRateLimited(true);
      } else{
        toast.error("Failed to load notes")
      }
    } finally {
      setLoading(false);
    }
    }

    fetchNotes();
  },[]);

  return (
    <div>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div>
  {loading && <div className="detail-page">Loading Notes...</div>}

  {notes.length > 0 && !isRateLimited && (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note_id={note._id}
          title={note.title}
          content={note.content}
          updatedAt={note.updatedAt}
          setNotes={setNotes}
        />
      ))}
    </div>
  )}
</div>
    </div>
  )
}

export default HomePage