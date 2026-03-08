import dotenv from "dotenv"
dotenv.config()
import app from "./app.js";
import connectDB from "./config/db.js";

const startServer = async()=>{
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT,()=>{
            console.log(`Server is running at port:${PORT} 🚀 `);
        })
    } catch (error) {
        console.error("Mongodb Connection failed !!!",error);
        process.exit(1);
    }
}

startServer();