import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';

// step1 : Loads environment variables from a configuration file, enhancing security and flexibility
dotenv.config();

//step2 : initialization
const app=express();

//step3 : Mentioning port number
const PORT=process.env.PORT || 3000;

//step4 : Middleware Configuration
app.use(express.json());//parse incoming JSON data in HTTP requests
app.use(cookieParser());//// parse and handle cookies sent in HTTP requests.
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));// handle requests from different origins (websites) and ensure they can access your API or resources securely.

//step5 : Listening
app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`);
})

//step6: The starting point for several route(here user and residency)
app.use('/api/user',userRoute);
app.use('/api/residency',residencyRoute);