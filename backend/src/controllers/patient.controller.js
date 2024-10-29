import express from "express";
import { Patient } from "../models/patients.model.js";
import { Doctor } from "../models/doctors.model.js";


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
            console.log("Prob1");
            res.status(404).json({
                msg : "Insuffucuent Info",
                success : false
            });
            return;
        }
        const patient = await Patient.findOne({
            email : email,
        });

        const isPasswordCorrect = await patient.isPasswordCorrect(password);
        console.log("Password status is",isPasswordCorrect);
        if(!isPasswordCorrect){
            console.log("Prob3");
            res.status(404).json({
                msg:"User is Inavalid",
                success:false,
            });
            return;
        }
        if(!patient)
        {
            console.log("Prob2");
            res.status(401).json({
                msg : "No Patient Currently",
                success : false,
            });
            return;
        }
        const generatedToken = await patient.generateToken();
        
        console.log("Token is",generatedToken); 
        const patientInfo = await Patient.findOne({
            email : email,
        }).select("-password");


        res.status(200).json({
            msg : "Patient Logged In Successfully",
            success : true,
            patient: patientInfo,
            token : generatedToken
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

const fillDoctor = async(req,res)=>{
    const patientInfo = req.patient;
    const docName = req.query.name;
    const docEmail = req.query.email;
    const docInfo = await Doctor.findOne({
        email:docEmail,
    });
    if(!docInfo){
        res.status(401).json({
            msg : "No Doctor Available",
            success : false
        });
        return;
    }
    const updatedPatient = await Patient.findByIdAndUpdate({
        _id : patientInfo._id
    },
    {
        $push: { underWhichDoctors: docInfo._id }
    },
    { new: true, useFindAndModify: false });
    if (!updatedPatient) {
        console.log('Patient not found');
        res.status(401).json({
            msg : "Not able to Update, Please try again",
            success : false
        });
        return ;
    }
    console.log(updatedPatient);
    res.status(200).json({
        patient : updatedPatient,
    });
    return;
}

export {
    patientSignUp,
    patientSignIn,
    fillDoctor
}