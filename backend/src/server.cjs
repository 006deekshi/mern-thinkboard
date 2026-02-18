const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors")
const path = require("path")

const connectDB = require("./config/db")
const notesRoutes = require("./routes/notesRoutes");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000


if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin: "http://localhost:5173"
}))
}

app.use(express.json());
app.use(rateLimiter)



app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../../frontend","dist","index.html"));
});

}

connectDB().then(()=>{
   app.listen(PORT, ()=>{
    console.log("Server started on PORT:",PORT);
})
})


//mongodb+srv://limgaladeekshitha_db_user:weULMSzFRqf7F35Y@cluster0.hkbajio.mongodb.net/?appName=Cluster0