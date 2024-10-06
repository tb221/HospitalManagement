import express, { Router } from "express";
import { patientSignIn, patientSignUp } from "../controllers/patient.controller.js";
import { patientAuthenticaton } from "../middlewares/patientAuthentication.middleware.js";
const router = Router();

router.route("/signUp").post(patientSignUp);
router.route("/signin").post(patientSignIn);
export default router;