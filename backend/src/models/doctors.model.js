import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    coverImage:{
        type:String,
        required:true,
    },
    department:{
        type: String,
        enum:["General Mediceine","Pulmonology","Pediatrics","Nephrology","Cardiology","Neurology"],
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
});

doctorSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

doctorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


export const Doctor = mongoose.model("Doctor",doctorSchema);