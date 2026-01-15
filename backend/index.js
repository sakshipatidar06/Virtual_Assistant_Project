import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import router from './routes/user.route.js'
import cookieParser from 'cookie-parser';
dotenv.config()
import cors from 'cors'
import authrouter from './routes/auth.middleware.route.js';
import geminiResponse from './gemini.js';

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",router)

app.use("/api/user",authrouter)
// app.get("/",async(req,res) => {
// let prompt = req.query.prompt;
// let data = await geminiResponse(prompt);
// res.json(data) ;
// })

const PORT  = process.env.PORT

app.listen(PORT,() => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
})


