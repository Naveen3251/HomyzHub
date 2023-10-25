import express from "express";
import  {bookVisit, cancelBookings, createUser, getAllBookings, getAllFavourites, toFav}  from "../controllers/userCntrl.js";
//middelware
import jwtCheck from "../config/auth0Config.js";

//step1: Router initialization
const router=express.Router();

//step2: mention the routes along with the method
router.post("/register",jwtCheck,createUser);
router.post('/bookVisit/:id',bookVisit);
router.post('/allBookings',getAllBookings);
router.post("/removeBooking/:id",cancelBookings);
router.post("/toFav/:rid",toFav);
router.post("/allFav/",getAllFavourites);

//step3
export {router as userRoute};