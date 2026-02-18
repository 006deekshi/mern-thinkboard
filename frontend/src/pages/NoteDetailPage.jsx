import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/")
    } catch (error) {
      console.log("Failed to update note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  // ✅ Prevent crash while loading
  if (loading) {
    return <div className="detail-page">Loading...</div>;
  }

  if (!note) {
    return <div className="detail-page">Note not found</div>;
  }

  return (
    <div className="detail-page">

      <div className="detail-top">
        <Link to="/" className="back-btn">
          ← Back to Notes
        </Link>

        <button className="delete-btn" onClick={handleDelete}>
          Delete Note
        </button>
      </div>

      <div className="detail-container">
        <h2 className="detail-heading">Edit Note</h2>

        <form onSubmit={handleSave} className="detail-form">

          <input
            type="text"
            placeholder="Note title"
            value={note.title}
            onChange={(e) =>
              setNote({ ...note, title: e.target.value })
            }
            className="input-field"
          />

          <textarea
            placeholder="Write your note here..."
            value={note.content}
            onChange={(e) =>
              setNote({ ...note, content: e.target.value })
            }
            className="textarea-field"
          />

          <button
            type="submit"
            className={`submit-btn ${saving ? "loading-btn" : ""}`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
