import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Doctor } from "./doctors.model.js";

const patientShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    underWhichDoctors:[{
        type : mongoose.Schema.ObjectId,
        ref : Doctor
    }]
});
patientShema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

patientShema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

patientShema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    );
}


export const Patient = mongoose.model("Patient",patientShema);