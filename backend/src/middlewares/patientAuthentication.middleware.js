import jwt from "jsonwebtoken"
import { Patient } from "../models/patients.model.js"
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
});
const patientAuthenticaton = async(req,res,next)=>{
    

    try{
        console.log("Entered in Patient Authentication");
        console.log("header====>",req.headers['authorization']);
        if(req.headers && (req.headers['authorization']))
        {
           
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                res.status(401).json({
                    msg : "Invalid User",
                    success : false,
                })
                return;
            }
            const decodedToken =  jwt.verify(token, process.env.TOKEN_SECRET);
            const patientInfo = await Patient.findById(decodedToken._id).select('-password');

            if (!patientInfo) {
                return res.status(401).json({
                    msg: "Invalid User",
                    success: false,
                });
            }
    
            req.patient = patientInfo; // Save patient info to request for later use
            next();
            
        }
        else{
            return res.status(404).json({
                msg : "Not Validated",
                success : false
            })
        }
    }
    catch(error){
        console.log("Error in Patient Authentication");
        res.status(501).json({
            msg : "Invalid User",
            success : false,
        })
        return;
    }
}
export  {
    patientAuthenticaton,
}