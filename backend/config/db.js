import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const url = process.env.MONGODB_URL;

const connectDB = async () => {
    try{
    await mongoose.connect(url);
    console.log("Database Connected Successfully");
    }
    catch(error){
        console.log("Database error:",error.message);
    }
    
}

export default connectDB;