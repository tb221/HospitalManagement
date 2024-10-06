import express, { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { doctorSignUp, doctorRequest } from "../controllers/doctor.controller.js";

const router = Router();

router.route("/register").post(upload.single("coverImage"),doctorSignUp);
router.route("/getdoctors").get(doctorRequest);
export default router;