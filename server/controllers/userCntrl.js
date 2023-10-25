import asyncHandler from 'express-async-handler';

import { prisma } from '../config/prismaConfig.js';

//for user registration
export const createUser=asyncHandler(async(req,res)=>{
    console.log("creating a user");

    let {email}=req.body;

    //checking user exists or not
    const userExists=await prisma.user.findUnique({where:{email:email}});

    if(!userExists){
        const user=await prisma.user.create({data:req.body});
        res.send({
            message:"User registered successfully",
            user:user,
        });
    }else{
        res.status(201).send({message:"User already registered"});
    }

})

//booking visit for particular residency
export const bookVisit=asyncHandler(async(req,res)=>{
    const {email,date}=req.body;
    const {id}=req.params;
    try{
        //if user already visted
        const alreadyBooked=await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}

        })

        if(alreadyBooked.bookedVisits.some((visit)=>visit.id===id)){
            res.status(400).json({message:"This residency is already booked by you"})
        }else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:{push:{id,date}}
                }
            });
            res.send("your visit is booked successfully");
        }

    }catch(err){
        throw new Error(err.message);
    }
});

//to get all the bookings
export const getAllBookings=asyncHandler(async (req,res)=>{
    const {email}=req.body;
    try{
        const bookings=await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })
        res.status(200).send(bookings);

    }catch(err){
        throw new Error(err.message);
    }
});

//to cancel the bookings
export const cancelBookings=asyncHandler(async(req,res)=>{
    const{email}=req.body;
    const {id}=req.params;
    try{
        //select the user
        const user=await prisma.user.findUnique({
            where:{email:email},
            select:{
                bookedVisits:true
            }
        })
        //to get the index of that particular residency in users booked visit
        const index=user.bookedVisits.findIndex((visit)=>visit.id===id);
        if(index==-1){
            res.status(404).json({message:"Booking Not Found"})
        }else{
            //remove that particular one in arr
            user.bookedVisits.splice(index,1)
            //update in database
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
            res.send("Booking cancelled successfully")
        }


    }catch(err){
        throw new Error(err.message);
    }
});

//add residency to favourite list of user
export const toFav=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {rid}=req.params;
    try{
        const user=await prisma.user.findUnique({
            where:{email:email}
        })
        //already liked remove it
        if(user.favResidenciesID.includes(rid)){
            const updatedUser=await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        set:user.favResidenciesID.filter((id)=>id!==rid)
                    }
                }
            });
            res.send({message:"Removed from favourites"})
        }else{
            const updatedUser=await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            })
            res.send({message:"Updated Favourites",user:updatedUser});

        }

    }catch(err){
        throw new Error(err.message);
    }
});
//to get all favourite list
export const getAllFavourites=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
        const favResd=await prisma.user.findUnique({
            where:{email:email},
            select:{favResidenciesID:true}
        })
        res.status(200).send(favResd);

    }catch(err){
        throw new Error(err.message);
    }
})