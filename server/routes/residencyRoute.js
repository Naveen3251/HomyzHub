import express from "express";
import { createResidency, getAllResidencies, getResidency } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";

//step1: Router initialization
const router=express.Router();

//step2: mention the routes along with the method
router.post("/create",jwtCheck,createResidency);
router.get("/allresd",getAllResidencies);
router.get("/:id",getResidency);

//step3
export {router as residencyRoute};