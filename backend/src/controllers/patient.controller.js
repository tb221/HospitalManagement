import express from "express";
import { Patient } from "../models/patients.model.js";


const patientSignUp = async (req,res)=>{
    const {email,name,password} = req.body;
    
    if(!email || !name || !password)
    {
        res.status(401).json({
            mag : "Insufficient Data",
            success : false,
        });
        return;
    }
    const patient = await Patient.find({
        email:email,
    });
    
    if(patient.length > 0)
    {
        res.status(401).json({
            msg:"Patient Already exists",
            success:false,
        });
        return;
        
    }
    const createdPatient = await Patient.create({email:email,name:name,password:password});
    const fetchPtaientDetail = await Patient.findById({
        _id : createdPatient._id,
    }).select("-password ");
    console.log("Saved");
    res.status(201).json({
        msg : "Patient Profile Created Successfully",
        patient: fetchPtaientDetail,
        success : true
    });
    return;
}

const patientSignIn = async(req,res)=>{
    try{
        console.log("sign in process...");
        const {email,password} =  req.body;
        if(!email || !password)
        {
            res.status(404).json({
                msg : "Insuffucuent Info",
                success : false
            });
            return;
        }
        const patient = await Patient.findOne({
            email : email,
        });
        if(!patient)
        {
            res.status(401).json({
                msg : "No Patient Currently",
                success : false,
            });
            return;
        }
        const generatedToken = patient.generateToken();
        const options = {
            httpOnly : true,
            secure : true
        };

        res.status(201).cookie("generatedToken",generatedToken,options).json({
            msg : "Patient Logged In Successfully",
            success : true,
            patient: patient,
            generatedToken:generatedToken,
        });
        return;
    }
    catch(error){
        res.status(404).json({
            msg : "Something went Wrong",
            success : false,

        });
        return;
    }
}

export {
    patientSignUp,
    patientSignIn,
}