// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import mongoose from "mongoose";
import connectDB from "./db/db_connection.js";
import cors from 'cors'
import cookieParser from 'cookie-parser';

import express from 'express';
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
// import router from './routes/user.route.js';
const app = express();
dotenv.config({})
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
app.use(cookieParser())
// app.use(router)

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

//http://localhost:8000/api/v1/user/register

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port :${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("mongodb connection failed", err)
    })


























/*
import express from 'express'
const app=express()
(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("Error",error)
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`app is listen on port ${process.env.PORT}`)
       })
    }
    catch(error){
        console.log("error",error)
        throw error;
    }
})()
*/