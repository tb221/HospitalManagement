import express from "express";
import { Doctor } from "../models/doctors.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const doctorSignUp = async(req,res) =>{
    try{
        const {name,email,password,department,title,description} = req.body;
        if(!name || !email || !password || !department || !title || !description)
        {
            res.status(401).json({
                msg:"Some fields are missing",
                success: false
            });

            return;
        }
        const existingDoctor = await Doctor.findOne({
            email: email
        });
        if(existingDoctor){
            res.status(401).json({
                msg:"Doctors already exist",
                success: false
            });
            return;
        }
       //Use req.file because we are using uplaod.single in multer not uplaod.fields.
       //For upload.fields we will use req.files
       let coverImageLocalPath;
       if(req.file && req.file.path)
       {
            coverImageLocalPath = req.file.path;
       }
       if(!coverImageLocalPath){
            res.status(404).json({
                msg:"Missing Fields!!!",
                success: false
            });
            return;
       }
       const coverImage = await uploadOnCloudinary(coverImageLocalPath);
       if(!coverImage.url){
            res.status(401).json({
                msg:"Picture is not uploaded",
                success: false
            });
            return;
       }
       const doctor = await Doctor.create({
            email,
            password,
            title,
            description,
            name,
            department,
            coverImage: coverImage.url
       });
       const createdDoctorProfile = await Doctor.findById({
            _id : doctor._id
       }).select("-passwod ");
       res.status(200).json({
            msg : "Doctor is registered successfully",
            success: true,
            doctor:createdDoctorProfile
       });
       return;

    }catch(error){
        res.status(404).json({
            msg : "Not able to register",
            success : false,
        });
        console.log("Registeration of Doctors are failing due to some error: ",error);
    }
};

const doctorRequest = async(req,res)=>{
    
    try{
        const department = req.query.department;
        console.log(department);
        if(!department){
            res.status(401).json({
                msg : "Not Requested properly for Department",
                success : false
            });
            return;
        }
        const getDoctors = await Doctor.find({
            department : department
        }).select("-password");
        console.log(getDoctors);
        if(!getDoctors || getDoctors.length === 0)
        {
            res.status(401).json({
                msg : "Not Requested properly for Department",
                success : false
            });
            return;
        }
        res.status(201).json({
            msg : "Doctors are Availaible",
            success: true,
            doctors: getDoctors
        });
        return;
    }
    catch(error){
        res.status(401).json({
            msg : "Not Requested properly for Department",
            success : false
        });
        return;
    }
}; 


export { 
    doctorSignUp,
    doctorRequest     
 };