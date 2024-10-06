import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
});

const connectDB = async ()=>{
    try{    
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`);
        return;
    }catch(error){
        console.log("Connection Error while connecting to database is: ",error);
        return;
    }
};

export { connectDB };