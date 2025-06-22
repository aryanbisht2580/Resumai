import app from "./app.js";
import { connectDB } from "./db/index.js";
import { config } from "dotenv";
import axios from "axios";

config();

connectDB().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:"+process.env.PORT);

    setInterval(async () => {
      try{
        const response=await axios.get("https://resumai-backend-bcv7.onrender.com");
        console.log("Pinged backend successfully:", response.status);
      }catch (error){
        console.error("Error pinging backend:",error.message);
      }
    }, 4 * 60 * 1000); 
  });
});