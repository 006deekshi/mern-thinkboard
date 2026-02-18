const express = require("express")
const {getAllNotes,getNoteById,CreateNote,updateNote,deleteNote} = require("../controllers/notesController")

const router = express.Router()

router.get("/",getAllNotes)

router.get("/:id",getNoteById)

router.post("/",CreateNote)

router.put("/:id",updateNote)

router.delete("/:id",deleteNote)

module.exports = router;

//what is EndPoint?
//an endpoint is a combination of a URL + HTTP method that lets the client interact with a aspecific resource

