import express from "express";
import dotenv from "dotenv";
import doctorRouter from "./src/routers/doctor.route.js"
import { connectDB } from "./src/db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import  patientRouter from "./src/routers/patient.route.js"
const app = express();
dotenv.config({
    path:"./.env"
});
const PORT = process.env.PORT || 3000;
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening on ${PORT}`);
    })
})
.catch((error)=>{
    console.log("Internal Server Error while connecting to Database: ",error);
});

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cors({
    origin : "http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser());
app.use("/api/v1/doctor",doctorRouter);
app.use('/api/v1/patient',patientRouter);

