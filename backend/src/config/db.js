const mongoose = require("mongoose")

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("MONGODB CONNECTED SUCCESSFULLY!")
    } catch (error) {
       console.error("Error Connecting t MONGODB",error)
       process.exit(1) //exit with failure
    }
}

module.exports = connectDB;