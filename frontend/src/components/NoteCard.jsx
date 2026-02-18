import React from "react";
import {Link} from "react-router"
import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";


const NoteCard = ({ note_id,title, content,updatedAt,setNotes}) => {
  const handleDelete = async (e, id) => {
      e.preventDefault();

      if(!window.confirm("Are you sure you want to delete this note?")) return;

      try{
         await api.delete(`/notes/${id}`)
         setNotes((prev) => prev.filter((note) => note._id !== id));
         toast.success("Note deleted successfully")
      } catch(error){
         console.log("Error in handleDelete",error)
      }
  }
  return (
    <Link to ={`/note/${note_id}`} className="note-card">
      
      <div className="note-card-header">
        <h3 className="note-title">{title}</h3>
        <div className="note-actions">
          <Pencil className="icon edit-icon" size={18}  />
          <Trash2 className="icon delete-icon" size={18} onClick={(e) => {handleDelete(e,note_id)}} />
        </div>
      </div>

      <p className="note-content">{content}</p>
      <p className="date">{formatDate(new Date(updatedAt))}</p>

    </Link>
  );
};

export default NoteCard;
