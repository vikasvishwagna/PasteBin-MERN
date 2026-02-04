import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();


const PORT = process.env.PORT || 3000;

//connect db and then Start server
connectDB().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
  })
})
