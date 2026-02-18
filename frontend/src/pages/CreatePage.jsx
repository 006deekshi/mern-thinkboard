import React, { useState } from 'react'
import {Link, useNavigate} from "react-router"
import api from '../lib/axios';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     e.preventDefault();

     if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
     }

     setLoading(true);
     try{
       await api.post("/notes", {
        title,
        content
       })
       toast.success("Note created successfully!")
       navigate("/");
     }catch(error){
      console.log("Error creating note",error)
       if(error.response.status === 429){
        toast.error("Slow Down! you're creating notes too fast", {
          duration: 4000
        });
       } else {
        toast.error("Failed to create note")
       }
     } finally {
      setLoading(false);
     }
  }
  return (
    <div className="create-page">

      {/* Back Button */}
      <Link to="/" className="back-btn">
        ← Back to Notes
      </Link>

      {/* Form Container */}
      <div className="create-container">
        <h2 className="create-heading">Create New Note</h2>

        <form onSubmit={handleSubmit} className="create-form">
          
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />

          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea-field"
          />

          <button
            type="submit"
            className={`submit-btn ${loading ? "loading-btn" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreatePage
