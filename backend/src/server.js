const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors")

const connectDB = require("./config/db")
const notesRoutes = require("./routes/notesRoutes");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(rateLimiter)



app.use("/api/notes", notesRoutes);


connectDB().then(()=>{
   app.listen(PORT, ()=>{
    console.log("Server started on PORT:",PORT);
})
})


//mongodb+srv://limgaladeekshitha_db_user:weULMSzFRqf7F35Y@cluster0.hkbajio.mongodb.net/?appName=Cluster0