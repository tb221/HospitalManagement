import jwt from "jsonwebtoken"
import { Patient } from "../models/patients.model.js"
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
});
export const patientAuthenticaton = async(req,_,next)=>{
    try{
        if((req.cookies && req.cookies.generatedToken) || (req.headers && (req.headers.Authoziration)))
        {
            const token = req.cookies.generatedToken || req.headers.Authoziration.replace("Bearer","");
            if (!token) {
                res.status(401).json({
                    msg : "Invalid User",
                    success : false,
                })
                return;
            }
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if(!decodedToken){
                res.status(401).json({
                    msg : "Invalid User",
                    success : false,
                })
                return;
            }
            const patient = await Patient.findById(decodedToken._id).select("-password ");
            if (!patient) {
                
                res.status(401).json({
                    msg : "Invalid User",
                    success : false,
                })
                return;
            }
            req.patient = patient;
            next();
        }
    }
    catch(error){
        res.status(501).json({
            msg : "Invalid User",
            success : false,
        })
        return;
    }
}